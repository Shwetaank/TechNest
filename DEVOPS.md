# TechNest Enterprise E-Commerce: DevOps & Local Architecture

This repository hosts a production-grade, modular full-stack e-commerce application (**React 19 + TypeScript** frontend, **Express 5 + Prisma 6** backend) engineered with modern local development, containerized testing, and CI/CD practices.

---

## 🏗️ Architecture & Requirements Checklist

| Requirement | Implementation | Component File / Location |
| :--- | :--- | :--- |
| **1. Modular Web Application** | Separate React 19 Client & Express 5 Server | [`client/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/client) & [`server/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/server) |
| **2. Source Control Integration** | Git Branching Strategy & PR Workflows | Hosted on GitHub `Shwetaank/TechNest` |
| **3. Containerization** | Multi-stage Docker builds | [`Dockerfile.client`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.client), [`Dockerfile.server`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.server) |
| **4. Local Orchestration** | Multi-container Compose engine | [`docker-compose.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/docker-compose.yml) |
| **5. CI/CD Pipeline** | GitHub Actions CI/CD Pipeline for Builds, Tests & Docker Builds | [`.github/workflows/deploy.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/.github/workflows/deploy.yml) |

---

## 🛠️ Step-by-Step Local Guide

### 1. Local Container Verification (Docker Compose)
To run the full-stack architecture locally in Docker containers:
```bash
docker-compose up --build
```
* **Frontend UI**: `http://localhost:80`
* **Backend REST API**: `http://localhost:5000/health`

---

### 2. Standard Local Run (No Docker)
To run both backend and frontend applications locally:

#### Backend:
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   * **Backend REST API**: `http://localhost:5000/health`

#### Frontend:
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
   * **Frontend UI**: `http://localhost:5173` (or port specified in terminal)

---

### 3. Continuous Integration & Continuous Deployment (CI/CD) Pipeline
The GitHub Actions workflow in [`.github/workflows/deploy.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/.github/workflows/deploy.yml) triggers on every push to `main`, pull requests targeting `main`, and manual run (`workflow_dispatch`):

1. **Build & Test**:
   * Installs node dependencies and compiles the React 19 Frontend.
   * Installs node dependencies, runs Prisma client generation, builds the Express 5 Backend, and executes the unit/integration test suites (`npm test`).
2. **Docker Build & Verification**:
   * Multi-stage build process for Frontend Client ([`Dockerfile.client`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.client)) and Backend Server ([`Dockerfile.server`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.server)).
   * Always runs on push and PR to verify Docker compilation works successfully in a clean container environment.
3. **Docker Push (Conditional)**:
   * Logs into and pushes the Docker images to the Azure Container Registry (ACR) if the required credentials are configured in GitHub Secrets.

#### Required GitHub Secrets for ACR Push:
To enable pushing the built images to your Azure Container Registry, add the following secrets under **Settings > Secrets and variables > Actions** in your GitHub repository:
* `ACR_LOGIN_SERVER`: The ACR server name (e.g., `technest.azurecr.io`)
* `ACR_USERNAME`: The admin username of your ACR
* `ACR_PASSWORD`: The admin password of your ACR
