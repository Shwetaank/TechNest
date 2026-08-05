resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

# -----------------------------------------------------------------------------
# Observability: Log Analytics Workspace
# -----------------------------------------------------------------------------
resource "azurerm_log_analytics_workspace" "law" {
  name                = var.log_analytics_workspace_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# -----------------------------------------------------------------------------
# Container Registry (ACR)
# -----------------------------------------------------------------------------
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true # Admin user enabled as backup/fallback authentication
}

# -----------------------------------------------------------------------------
# Kubernetes Service (AKS)
# -----------------------------------------------------------------------------
resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = "1.30" # Uses a stable AKS API version

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_D4ds_v4" # Specifications aligned with DEVOPS.md
    os_disk_size_gb = 30
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    network_policy    = "azure" # Azure CNI overlay and security policies
    load_balancer_sku = "standard"
  }

  # Observability Integration: Container Insights Log Forwarding
  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id
  }

  # Security Integration: Azure Key Vault Secrets Provider Addon
  key_vault_secrets_provider {
    secret_rotation_enabled = true
    secret_rotation_interval_ms = "120000" # Auto-rotate checked every 2 minutes
  }

  lifecycle {
    ignore_changes = [
      default_node_pool[0].node_count # Allow autoscaling rules to scale node pool sizes dynamically
    ]
  }
}

# Role Assignment: AKS pulls images from ACR
resource "azurerm_role_assignment" "aks_to_acr" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}

# -----------------------------------------------------------------------------
# Security: Key Vault & Key Vault CSI Secrets Provider Access Role
# -----------------------------------------------------------------------------
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "kv" {
  name                        = var.keyvault_name
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  sku_name                    = "standard"
  
  # RBAC authorization model is superior and recommended by Microsoft
  enable_rbac_authorization   = true
}

# Assign Key Vault Secrets User permissions to the AKS Secrets Store CSI driver identity
resource "azurerm_role_assignment" "aks_kv_secrets_user" {
  principal_id                     = azurerm_kubernetes_cluster.aks.key_vault_secrets_provider[0].secret_identity[0].object_id
  role_definition_name             = "Key Vault Secrets User"
  scope                            = azurerm_key_vault.kv.id
  skip_service_principal_aad_check = true
}

# Assign Key Vault Administrator to the provisioning Client (Terraform itself) so secrets can be added
resource "azurerm_role_assignment" "tf_kv_admin" {
  principal_id                     = data.azurerm_client_config.current.object_id
  role_definition_name             = "Key Vault Administrator"
  scope                            = azurerm_key_vault.kv.id
  skip_service_principal_aad_check = true
}

# -----------------------------------------------------------------------------
# Cost Management: Consumption Budget
# -----------------------------------------------------------------------------
resource "azurerm_consumption_budget_resource_group" "budget" {
  name              = "rg-budget-technest"
  resource_group_id = azurerm_resource_group.rg.id

  amount     = var.monthly_budget_amount
  time_grain = "Monthly"

  time_period {
    start_date = "2026-08-01T00:00:00Z"
    end_date   = "2030-08-01T00:00:00Z"
  }

  notification {
    enabled   = true
    threshold = 80.0
    operator  = "GreaterThan"
    contact_emails = var.budget_contact_emails
  }

  notification {
    enabled   = true
    threshold = 100.0
    operator  = "GreaterThan"
    contact_emails = var.budget_contact_emails
  }
}
