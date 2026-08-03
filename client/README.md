# 🛍️ TechNest Frontend Web Application

The frontend client for **TechNest** is a modern, responsive single-page e-commerce application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## ⚡ Tech Stack

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite with React Compiler & HMR
* **Styling**: Tailwind CSS & CSS3 Micro-animations
* **Icons**: Lucide React
* **HTTP Client**: Axios
* **Routing**: React Router DOM v7
* **State Management**: Context API + Local Storage Persistence

---

## 🚀 Getting Started

### 1. Installation
```bash
cd client
npm install
```

### 2. Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🐳 Docker Deployment
The client utilizes a multi-stage Docker build with Nginx Alpine serving the static bundle:
```bash
docker build -t technest-client -f Dockerfile .
docker run -p 80:80 technest-client
```

---

## 📁 Directory Structure

```text
client/
├── src/
│   ├── assets/       # Static assets, logos, banners
│   ├── components/   # Reusable UI components (Navbar, Footer, ProductCard, CartModal)
│   ├── context/      # AuthContext, CartContext, ThemeContext
│   ├── pages/        # Storefront, ProductDetails, Checkout, Deals, Admin
│   ├── services/     # API Axios client & service endpoints
│   ├── types/        # TypeScript interfaces and data models
│   ├── App.tsx       # Root application & routing
│   └── main.tsx      # Entry point
├── Dockerfile        # Production multi-stage Nginx container
├── package.json
└── vite.config.ts
```
