output "resource_group_name" {
  value       = azurerm_resource_group.rg.name
  description = "The name of the Resource Group created."
}

output "log_analytics_workspace_id" {
  value       = azurerm_log_analytics_workspace.law.id
  description = "The ID of the Log Analytics Workspace."
}

output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "The URL of the Azure Container Registry."
}

output "aks_cluster_name" {
  value       = azurerm_kubernetes_cluster.aks.name
  description = "The name of the AKS Cluster."
}

output "aks_control_plane_fqdn" {
  value       = azurerm_kubernetes_cluster.aks.fqdn
  description = "The FQDN of the AKS API server."
}

output "key_vault_uri" {
  value       = azurerm_key_vault.kv.vault_uri
  description = "The URI of the Azure Key Vault."
}

output "aks_secrets_provider_identity_client_id" {
  value       = azurerm_kubernetes_cluster.aks.key_vault_secrets_provider[0].secret_identity[0].client_id
  description = "Client ID of the User Assigned Identity created by the AKS Secrets Provider addon. Use this in your SecretProviderClass manifest."
}
