# ⚙️ TechNest Backend REST API

The backend server for **TechNest** is a high-performance REST API built on **Node.js 22 LTS**, **Express 5**, **TypeScript**, and **Prisma ORM**, connected to **Supabase PostgreSQL** and **Redis**.

---

## ⚡ Tech Stack

* **Runtime**: Node.js 22 LTS
* **Framework**: Express 5 (TypeScript)
* **ORM & Database**: Prisma Client 6 + Supabase PostgreSQL
* **Caching & Queues**: Redis 7 + BullMQ
* **Telemetry**: Application Insights SDK
* **Security**: Helmet, CORS, JWT Auth, Secrets Store CSI Driver

---

## 🚀 Getting Started

### 1. Installation & Prisma Generation
```bash
cd server
npm install
npx prisma generate
```

### 2. Database Migrations
```bash
npx prisma db push
```

### 3. Development Server
```bash
npm run dev
```
The server starts on `http://localhost:5000`.

### 4. Run Tests
```bash
npm test
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server & database health probe | No |
| `GET` | `/api/v1/products` | Retrieve catalog with pagination & filters | No |
| `GET` | `/api/v1/products/:id` | Get detailed product specifications | No |
| `POST` | `/api/v1/auth/login` | User login & JWT issuance | No |
| `POST` | `/api/v1/auth/register` | User account registration | No |
| `POST` | `/api/v1/orders` | Create an order / checkout session | Yes |
| `GET` | `/api/v1/orders/user` | Retrieve user order history | Yes |
| `POST` | `/api/v1/payments/verify` | Verify Stripe/Razorpay payment | Yes |

---

## 🐳 Docker Deployment
```bash
docker build -t technest-server -f Dockerfile .
docker run -p 5000:5000 --env-file .env technest-server
```
