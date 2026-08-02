variable "resource_group_name" {
  type    = string
  default = "rg-technest-prod-eastus"
}

variable "location" {
  type    = string
  default = "eastus"
}

variable "acr_name" {
  type    = string
  default = "acrtechnestprod"
}

variable "aks_cluster_name" {
  type    = string
  default = "aks-technest-prod"
}

variable "keyvault_name" {
  type    = string
  default = "kv-technest-prod-01"
}

variable "tenant_id" {
  type    = string
  default = "00000000-0000-0000-0000-000000000000"
}
