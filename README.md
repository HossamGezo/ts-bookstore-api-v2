# 📚 Bookstore API (V2)

[![Build Status](https://img.shields.io/github/actions/workflow/status/HossamGezo/ts-bookstore-api-v2/deploy.yml?branch=main&style=for-the-badge&logo=github&logoColor=white)](https://github.com/HossamGezo/ts-bookstore-api-v2/actions)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=down&label=Render&logo=render&logoColor=white&style=for-the-badge&up_color=46E3B7&up_message=up&url=https%3A%2F%2Fbookstore-api-0fy2.onrender.com)](https://bookstore-api-0fy2.onrender.com)
[![DB Status](https://img.shields.io/badge/MongoDB_Atlas-Live-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Swagger Docs](https://img.shields.io/badge/Swagger-OpenAPI%203.0-6BA539?style=for-the-badge&logo=swagger&logoColor=white)](https://bookstore-api-0fy2.onrender.com/api-docs)
[![Docker Hub](https://img.shields.io/badge/Docker_Hub-v2-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/hossamgezo/bookstore-api)
[![GitHub License](https://img.shields.io/badge/License-MIT-007EC6?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/HossamGezo/ts-bookstore-api-v2/blob/main/LICENSE)

---

A professional, high-performance Bookstore system featuring a hybrid **RESTful API** and **MVC architecture**, built with **Node.js**, **Express**, and **TypeScript**. This project implements **Clean Modular Architecture**, robust production security, and a fully automated **CI/CD Pipeline**.

🚀 **Live Site:** [https://bookstore-api-0fy2.onrender.com](https://bookstore-api-0fy2.onrender.com)

---

## 📸 Project Showcase

### 🏠 Landing Page (MVC with EJS & Tailwind)

_Click the image to visit the live home page._

[![Welcome UI](https://github.com/HossamGezo/ts-bookstore-api-v2/blob/main/assets/welcome-ui.png?raw=true)](https://bookstore-api-0fy2.onrender.com)

---

### 📖 Interactive API Explorer (Swagger UI)

_Click the image to test the API endpoints live._

[![Swagger UI](https://github.com/HossamGezo/ts-bookstore-api-v2/blob/main/assets/swagger-ui.png?raw=true)](https://bookstore-api-0fy2.onrender.com/api-docs)

---

## 🛠 Tech Stack

| Backend & UI                                                                                             | Database & Validation                                                                                      | DevOps & CI/CD                                                                                                      | Security & Performance                                                                                  |
| :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)        | ![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb&logoColor=white)      | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)                        | ![Helmet](https://img.shields.io/badge/Helmet-000000?style=flat&logo=helmet&logoColor=white)            |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)          | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)         | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) | ![RateLimit](https://img.shields.io/badge/Rate_Limit-FF4500?style=flat&logo=data-minor&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)                        | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)                        | ![Compression](https://img.shields.io/badge/Compression-Gzip-orange?style=flat)                         |
| ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)                      | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![Husky](https://img.shields.io/badge/Husky-🐶-blue?style=flat)                                                     | ![HPP](https://img.shields.io/badge/HPP-Security-red?style=flat)                                        |

---

## ✨ Key Features & Architecture

### 🏗️ Architecture & Clean Code

- **Modular Design**: Fully organized by features (**Auth, Users, Books, Authors**) for maximum scalability.
- **Hybrid Pattern**: Combination of **REST API** for data exchange and **MVC** (using EJS & Tailwind) for user workflows.
- **Service Layer**: Business logic is decoupled from controllers using a standardized **Result Object Pattern**.
- **Global Data Transformation**: Automated MongoDB `_id` to `id` transformation via a custom global plugin.

### 🔐 Security & Reliability

- **Production Hardening**: Protected by **Helmet**, **HPP**, and **Compression**.
- **Rate Limiting**: Throttling requests per IP via `express-rate-limit` to prevent DDoS attacks.
- **Authentication**: Secure JWT-based auth with Role-Based Access Control (RBAC).
- **Live Reload**: Seamless development experience integrated into the ESM workflow.

### ⚡ Performance & Automation

- **CI/CD Pipeline**: Fully automated **GitHub Actions** that build and push Docker images on every push to main.
- **Optimized Queries**: Advanced Pagination and Filtering helper using `Promise.all` for high performance.
- **Multi-stage Docker**: Extremely small and secure production images using Alpine Linux.

---

## 🔌 API Endpoints Overview

For a detailed interactive guide and to test the endpoints live, please visit our [Swagger Documentation](https://bookstore-api-0fy2.onrender.com/api-docs).

### 🔑 Auth (Authentication)

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Authenticate user and receive a JWT.

### 👤 User (Administration)

- `GET /api/users` - List all users (Admin only).
- `GET /api/users/{id}` - Get user details (Owner or Admin).
- `PUT /api/users/{id}` - Update user profile.
- `DELETE /api/users/{id}` - Delete user account.

### 🔐 Password (Recovery - MVC)

- `GET /password/forgot-password` - Render forgot password view.
- `POST /password/forgot-password` - Send reset password link via email.
- `GET /password/reset-password/{id}/{token}` - Render reset password form.
- `POST /password/reset-password/{id}/{token}` - Set a new password in the database.

### ✍️ Author (Profiles)

- `GET /api/authors` - Get all authors with pagination.
- `POST /api/authors` - Create a new author (Admin only).
- `GET /api/authors/{id}` - Get author by ID.
- `PUT /api/authors/{id}` - Update author details (Admin only).
- `DELETE /api/authors/{id}` - Delete author by ID (Admin only).

### 📚 Book (Catalog Management)

- `GET /api/books` - Get all books (with Pagination & Price Filtering).
- `POST /api/books` - Create a new book (Admin only).
- `GET /api/books/{id}` - Get book details (Populated with Author).
- `PUT /api/books/{id}` - Update book details (Admin only).
- `DELETE /api/books/{id}` - Delete book by ID (Admin only).

### 📂 Upload (Storage Services)

- `POST /api/upload` - Upload a single image using Multer.

---

## 🚀 Getting Started

### 🐳 Run with Docker

Launch the entire environment (API + Database) with a single command:

```bash
docker-compose up -d
```

### 💻 Local Development

```bash
npm run dev  # Start API only
npm run mvc  # Start API + Tailwind + Views
```

---

## 👨‍💻 Author

**Hossam Gezo**

- GitHub: [@HossamGezo](https://github.com/HossamGezo)
- LinkedIn: [Your LinkedIn Profile URL]
