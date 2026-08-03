# 🛠️ TechNest DevOps & Cloud Infrastructure Architecture Guide

This comprehensive reference document outlines the complete DevOps implementation, cloud architecture, security posture, and CI/CD pipelines engineered for the **TechNest Enterprise E-Commerce Platform** on **Microsoft Azure**.

---

## 🏗️ 1. Complete Cloud Infrastructure Blueprint

| Component / Layer | Azure Resource | Specification / Configuration |
| :--- | :--- | :--- |
| **Subscription** | `3f70ff53-de47-452c-985e-3e197d6aaa61` | Pay-As-You-Go Azure Subscription |
| **Resource Group** | `Tech_Nest` | Region: `centralindia` |
| **Kubernetes Cluster** | `aks-technest` | Kubernetes v1.35.6, Standard_D4ds_v4 (4 vCPU, 16GB RAM), Azure CNI Overlay, Ephemeral OS Disk |
| **Container Registry** | `technest.azurecr.io` | Azure Container Registry (Basic SKU, Admin Enabled) |
| **Secrets Management** | `kv-technest-shwetaank` | Azure Key Vault with Azure RBAC authorization model |
| **Secrets Driver** | `azure-keyvault-secrets-provider` | Secrets Store CSI Driver Add-on with auto-rotation enabled |
| **Log Analytics** | `law-technest` | Azure Log Analytics Workspace (PerGB2018 SKU, 30-day retention) |
| **Application Performance** | `appi-technest` | Workspace-based Application Insights instance linked to `law-technest` |
| **Container Insights** | `ama-logs` DaemonSet | Azure Monitor Linux agent streaming pod stdout/stderr and cluster metrics |
| **CI/CD Platform** | Azure DevOps & GitHub Actions | `TechNest-CI-CD` in Azure DevOps organization `spmorey87` + GitHub Actions |

---

## 🔐 2. Azure Key Vault Secrets Store CSI Driver Setup

To prevent exposing sensitive credentials (database passwords, API keys) in source code or plain environment variables, secrets are retrieved on-demand from Azure Key Vault directly into container memory via CSI driver volumes.

### Architecture & Data Flow
1. **Secrets Ingestion**:
   * `database-url`: Supabase PostgreSQL connection string.
   * `resend-api-key`: Resend email API token.
2. **Managed Identity Authorization**:
   * AKS provisions a User-Assigned Managed Identity: `azurekeyvaultsecretsprovider-aks-technest` (`clientId: 63473a46-a621-442b-bef9-5f43763899bd`).
   * RBAC Role Assigned: **`Key Vault Secrets User`** on vault `kv-technest-shwetaank`.
3. **`SecretProviderClass` Definition**:
   ```yaml
   apiVersion: secrets-store.csi.x-k8s.io/v1
   kind: SecretProviderClass
   metadata:
     name: technest-azure-keyvault
     namespace: default
   spec:
     provider: azure
     parameters:
       usePodIdentity: "false"
       useVMManagedIdentity: "true"
       userAssignedIdentityID: "63473a46-a621-442b-bef9-5f43763899bd"
       keyvaultName: "kv-technest-shwetaank"
       tenantId: "8c286706-4769-4a2a-b614-228f54eb6b3e"
       cloudName: "AzurePublicCloud"
       objects: |
         array:
           - |
             objectName: database-url
             objectType: secret
           - |
             objectName: resend-api-key
             objectType: secret
     secretObjects:
       - secretName: technest-secrets
         type: Opaque
         data:
           - objectName: database-url
             key: database-url
           - objectName: resend-api-key
             key: resend-api-key
   ```
4. **Pod Volume Mounting**:
   * The `technest-server` deployment mounts `/mnt/secrets-store` via the `secrets-store.csi.k8s.io` CSI driver, triggering synchronization into the Kubernetes Secret `technest-secrets`.

---

## 📊 3. Observability, Logging & Monitoring

### A. Azure Monitor Container Insights
Container Insights is enabled via the `monitoring` AKS add-on. The `ama-logs` (Azure Monitor Agent) daemonset streams real-time data to Log Analytics Workspace `law-technest`.

#### Key Kusto (KQL) Diagnostic Queries:
* **Container Log Stream (stdout/stderr)**:
  ```kusto
  ContainerLogV2
  | where PodNamespace == "default"
  | project TimeGenerated, PodName, ContainerName, LogMessage
  | order by TimeGenerated desc
  | limit 100
  ```
* **Pod CPU & Memory Utilization**:
  ```kusto
  InsightsMetrics
  | where Namespace == "container.azm.ms/memory" or Namespace == "container.azm.ms/cpu"
  | summarize avg(Val) by Name, bin(TimeGenerated, 5m)
  | render timechart
  ```
* **Kubernetes Pod Inventory & Restarts**:
  ```kusto
  KubePodInventory
  | where Namespace == "default"
  | project TimeGenerated, Name, PodStatus, PodRestartCount, Node
  ```

### B. Application Insights Telemetry
* Linked directly to `law-technest`.
* Telemetry Connection String is injected into `technest-server` pods:
  ```env
  APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=271c3b1e-b839-45de-b0a4-8c14f96b667a;IngestionEndpoint=https://centralindia-0.in.applicationinsights.azure.com/;...
  ```
* Provides live end-to-end transaction tracing, dependency duration tracking (Prisma/PostgreSQL, Redis queries), and unhandled exception logging.

---

## 🚀 4. Dual CI/CD Pipeline Architecture

### Pipeline 1: Azure DevOps Pipeline (`azure-pipelines.yml`)
Configured in Azure DevOps organization `https://dev.azure.com/spmorey87/TechNest`:
* **Triggers**: Automated triggers on `main` branch commits and manual runs.
* **Build Stage**:
  1. Clones source repository.
  2. Runs Node.js dependency installation and build verification.
  3. Builds Docker images for `technest-client` and `technest-server`.
  4. Authenticates to Azure Container Registry via Service Connection `Azure-Subscription-Connection`.
  5. Pushes images tagged with `$(Build.BuildId)` and `latest`.
* **Deploy Stage**:
  1. Authenticates to AKS cluster `aks-technest`.
  2. Executes `kubectl apply -f k8s/` to deploy manifests (`SecretProviderClass`, Deployments, Services).
  3. Validates rollout completion via `kubectl rollout status`.

### Pipeline 2: GitHub Actions (`.github/workflows/deploy.yml`)
Configured in GitHub repository `https://github.com/Shwetaank/TechNest`:
* **Triggers**: Pull requests and commits targeting `main`.
* **Matrix Validation**: Parallel client and server test suites, linting, and Docker container verification.
* **Continuous Delivery**: Automatically builds and pushes updated images to ACR upon PR merge.

---

## 💻 5. Local Development & Testing Instructions

### A. Full Stack with Docker Compose
```bash
# Clone the repository
git clone https://github.com/Shwetaank/TechNest.git
cd TechNest

# Launch all microservices, databases, and caches
docker-compose up --build -d

# Check running containers
docker-compose ps

# View aggregate container logs
docker-compose logs -f
```

### B. Bare Metal Development
```bash
# 1. Backend Server
cd server
npm install
npx prisma generate
npm run dev

# 2. Frontend Client (in a new terminal)
cd ../client
npm install
npm run dev
```

---

## ☸️ 6. Kubernetes Cluster Management Cheat Sheet

```bash
# Connect to AKS Cluster
az aks get-credentials --resource-group Tech_Nest --name aks-technest --overwrite-existing

# Check All Pods, Services, and Secrets
kubectl get pods,services,secretproviderclass,secrets -o wide

# Check Azure Monitor & CSI Driver DaemonSets
kubectl get daemonsets,pods -n kube-system

# Stream Backend Logs
kubectl logs -l app=technest-server --tail=50 -f

# Trigger Rolling Restart of Deployments
kubectl rollout restart deployment/technest-server
kubectl rollout restart deployment/technest-client
```

---

## 🛡️ 7. Disaster Recovery & Zero-Downtime Strategy
* **Rolling Updates**: Kubernetes Deployments use `maxSurge: 25%` and `maxUnavailable: 0` to ensure zero downtime during rollouts.
* **Multi-Replica Resiliency**: Both Client and Server deployments run multiple replicas across the cluster nodes.
* **External Managed Databases**: Stateful data is isolated in managed Supabase PostgreSQL and Key Vault, ensuring compute pods remain stateless and easily replaceable.
