# TechNest Enterprise E-Commerce: DevOps & Infrastructure Architecture

This repository hosts a production-grade, modular full-stack e-commerce application (**React 19 + TypeScript** frontend, **Express 5 + Prisma 6** backend) engineered with modern containerized development and CI/CD practices.

---

## 🏗️ Architecture & Requirements Checklist

| Requirement | Implementation | Component File / Location |
| :--- | :--- | :--- |
| **1. Modular Web Application** | Separate React 19 Client & Express 5 Server | [`client/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/client) & [`server/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/server) |
| **2. Source Control Integration** | Git Branching Strategy & PR Workflows | Hosted on GitHub `Shwetaank/TechNest` |
| **3. Containerization** | Multi-stage Docker builds | [`Dockerfile.client`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.client), [`Dockerfile.server`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/Dockerfile.server) |
| **4. Local Orchestration** | Multi-container Compose engine | [`docker-compose.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/docker-compose.yml) |
| **5. CI/CD Pipeline** | GitHub Actions CI Workflow for Builds & Tests | [`.github/workflows/ci.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/.github/workflows/ci.yml) |

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

### 2. Continuous Integration (CI) Pipeline
The GitHub Actions workflow in `.github/workflows/ci.yml` triggers on every push to `main` and all pull requests targeting `main`:
1. Installs dependencies and builds the React frontend.
2. Installs dependencies, compiles TypeScript, and runs the backend test suites (`npm test`).
