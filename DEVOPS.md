# TechNest Enterprise E-Commerce: DevOps & Azure Infrastructure Architecture

This repository hosts a production-grade, modular full-stack e-commerce application (**React 19 + TypeScript** frontend, **Express 5 + Prisma 6** backend) engineered with modern cloud-native DevOps practices.

---

## 🏗️ Architecture & Requirements Checklist

| Requirement | Implementation | Component File / Location |
| :--- | :--- | :--- |
| **1. Modular Web Application** | Separate React 19 Client & Express 5 Server | [`client/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/client) & [`server/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/server) |
| **2. Source Control Integration** | Git Branching Strategy & PR Workflows | Hosted on GitHub `Shwetaank/TechNest` |
| **3. Containerization** | Multi-stage Docker builds | [`Dockerfile.client`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.client), [`Dockerfile.server`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.server) |
| **4. Local Orchestration** | Multi-container Compose engine | [`docker-compose.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/docker-compose.yml) |
| **5. Infrastructure as Code (IaC)** | Terraform Azure Provisioning | [`terraform/main.tf`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/terraform/main.tf), [`terraform/variables.tf`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/terraform/variables.tf) |
| **6. Kubernetes Orchestration (AKS)** | Multi-replica deployments & LoadBalancer | [`k8s/client-deployment.yaml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/k8s/client-deployment.yaml), [`k8s/server-deployment.yaml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/k8s/server-deployment.yaml) |
| **7. CI/CD Pipeline** | GitHub Actions Workflow for ACR & AKS | [`.github/workflows/deploy.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/.github/workflows/deploy.yml) |
| **8. Secrets & Security** | Azure Key Vault & Secret Scanning | Key Vault + Secret Scanning Policy |
| **9. Observability & Monitoring** | Azure Application Insights & Log Analytics | App Insights SDK + Health Endpoints |

---

## 🛠️ Step-by-Step Deployment Guide

### 1. Local Container Verification (Docker Compose)
To run the full-stack architecture locally in Docker containers:
```bash
docker-compose up --build
```
* **Frontend UI**: `http://localhost:80`
* **Backend REST API**: `http://localhost:5000/health`

---

### 2. Infrastructure Provisioning via Terraform
Initialize and apply the Infrastructure as Code (IaC) configuration to provision Azure Resource Group, ACR, AKS, and Key Vault:
```bash
cd terraform
terraform init
terraform plan
terraform apply -auto-approve
```

---

### 3. Kubernetes Deployment on AKS
Connect `kubectl` to your newly created Azure Kubernetes Service (AKS) cluster and deploy application manifests:
```bash
# Get credentials for AKS cluster
az aks get-credentials --resource-group rg-technest-prod-eastus --name aks-technest-prod

# Create Kubernetes secrets for database & API keys
kubectl create secret generic technest-secrets \
  --from-literal=database-url="<YOUR_DATABASE_URL>" \
  --from-literal=resend-api-key="<YOUR_RESEND_API_KEY>"

# Deploy manifests
kubectl apply -f k8s/server-deployment.yaml
kubectl apply -f k8s/client-deployment.yaml

# Check cluster status
kubectl get pods
kubectl get services
```

---

### 4. Continuous Integration & Deployment (CI/CD)
The GitHub Actions workflow in `.github/workflows/deploy.yml` triggers on every push to `main`:
1. Executes unit/integration test suites (`npm test`).
2. Builds multi-stage Docker images for client & server.
3. Pushes tagged container images to Azure Container Registry (ACR).
4. Updates deployment manifests on Azure Kubernetes Service (AKS).
