variable "resource_group_name" {
  type        = string
  description = "The name of the Resource Group in which to create resources."
  default     = "Tech_Nest"
}

variable "location" {
  type        = string
  description = "The Azure Region where resources will be provisioned."
  default     = "centralindia"
}

variable "log_analytics_workspace_name" {
  type        = string
  description = "Name of the Log Analytics Workspace for Container Insights."
  default     = "law-technest"
}

variable "acr_name" {
  type        = string
  description = "Name of the Azure Container Registry (must be globally unique, alphanumeric only)."
  default     = "technestregistryshwetaank" # ACR requires a globally unique alphanumeric name
}

variable "aks_cluster_name" {
  type        = string
  description = "Name of the Azure Kubernetes Service cluster."
  default     = "aks-technest"
}

variable "dns_prefix" {
  type        = string
  description = "DNS prefix for the AKS cluster load balancer/API server."
  default     = "technest-dns"
}

variable "keyvault_name" {
  type        = string
  description = "Name of the Azure Key Vault (must be globally unique)."
  default     = "kv-technest-shwetaank"
}

variable "monthly_budget_amount" {
  type        = number
  description = "The monthly budget limit for the Resource Group in Azure billing currency (e.g., USD, INR)."
  default     = 100
}

variable "budget_contact_emails" {
  type        = list(string)
  description = "A list of email addresses to send budget threshold alerts to."
  default     = ["spmorey87@gmail.com"] # Default alert contact based on subscription references
}
