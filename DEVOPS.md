# TechNest Enterprise E-Commerce: DevOps & Local Architecture

This repository hosts a production-grade, modular full-stack e-commerce application (**React 19 + TypeScript** frontend, **Express 5 + Prisma 6** backend) engineered with modern local development and CI/CD practices.

---

## 🏗️ Architecture & Requirements Checklist

| Requirement | Implementation | Component File / Location |
| :--- | :--- | :--- |
| **1. Modular Web Application** | Separate React 19 Client & Express 5 Server | [`client/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/client) & [`server/`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/server) |
| **2. Source Control Integration** | Git Branching Strategy & PR Workflows | Hosted on GitHub `Shwetaank/TechNest` |
| **3. CI/CD Pipeline** | GitHub Actions CI Workflow for Builds & Tests | [`.github/workflows/ci.yml`](file:///d:/Projects/AlmaBetter/Specialisation%20Track/Module%202%20Dev-Ops/TechNest/.github/workflows/ci.yml) |

---

## 🛠️ Step-by-Step Local Guide

### 1. Local Run (Development Mode)
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

### 2. Continuous Integration (CI) Pipeline
The GitHub Actions workflow in `.github/workflows/ci.yml` triggers on every push to `main` and all pull requests targeting `main`:
1. Installs dependencies and builds the React frontend.
2. Installs dependencies, compiles TypeScript, and runs the backend test suites (`npm test`).
