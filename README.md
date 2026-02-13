# 📚 Bookstore API (V2)

[![Build Status](https://img.shields.io/github/actions/workflow/status/HossamGezo/ts-bookstore-api-v2/deploy.yml?branch=main&style=for-the-badge&logo=github&logoColor=white)](https://github.com/HossamGezo/ts-bookstore-api-v2/actions)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=down&label=Render&logo=render&logoColor=white&style=for-the-badge&up_color=46E3B7&up_message=up&url=https%3A%2F%2Fbookstore-api-0fy2.onrender.com)](https://bookstore-api-0fy2.onrender.com)
![DB Status](https://img.shields.io/badge/MongoDB_Atlas-Live-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
[![Swagger Docs](https://img.shields.io/badge/Swagger-OpenAPI%203.0-6BA539?style=for-the-badge&logo=swagger&logoColor=white)](https://bookstore-api-0fy2.onrender.com/api-docs)
[![Docker Hub](https://img.shields.io/docker/v/hossamgezo/bookstore-api?style=for-the-badge&logo=docker&logoColor=white&label=Docker%20Hub&color=2496ED)](https://hub.docker.com/r/hossamgezo/bookstore-api)
[![GitHub License](https://img.shields.io/github/license/HossamGezo/ts-bookstore-api-v2?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=007EC6)](https://github.com/HossamGezo/ts-bookstore-api-v2/blob/main/LICENSE)

---

A professional, high-performance Bookstore system featuring a hybrid **RESTful API** and **MVC architecture**, built with **Node.js**, **Express**, and **TypeScript**. This project implements **Clean Modular Architecture**, robust production security, and a fully automated **CI/CD Pipeline**.

🚀 **Live Site:** [https://bookstore-api-0fy2.onrender.com](https://bookstore-api-0fy2.onrender.com)

---

## 📸 Project Showcase

### 🏠 Landing Page (MVC with EJS & Tailwind)

_Click the image to visit the live home page._

[![Welcome UI](./assets/welcome-ui.png)](https://bookstore-api-0fy2.onrender.com)

---

### 📖 Interactive API Explorer (Swagger UI)

_Click the image to test the API endpoints live._

[![Swagger UI](./assets/swagger-ui.png)](https://bookstore-api-0fy2.onrender.com/api-docs)

---

## 🛠 Tech Stack

| Backend Core                                                                                      | Database                                                                                                      | DevOps & CI/CD                                                                                                      | Security & Performance                                                                                   |
| :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb&logoColor=white)   | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)                        | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)   | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)            | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)                      |
| ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)               | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)                        | ![Helmet](https://img.shields.io/badge/Helmet-000000?style=flat&logo=helmet&logoColor=white)             |

---

## ✨ Key Features & Architecture

### 🏗️ Architecture & Clean Code

- **Modular Design**: Fully organized by features (**Auth, Users, Books, Authors**) for maximum scalability.
- **Hybrid Pattern**: Combination of **REST API** for data exchange and **MVC** (using EJS & Tailwind) for user workflows.
- **Service Layer**: Business logic is decoupled from controllers using a standardized **Result Object Pattern**.
- **Global Data Transformation**: Automated MongoDB `_id` to `id` transformation via a custom global plugin.

### 🔐 Security & Reliability

- **Production Hardening**: Protected by `helmet`, `hpp`, and `compression`.
- **Rate Limiting**: Throttling requests per IP to prevent DDoS and Brute-force attacks.
- **Authentication**: Secure JWT-based auth with Role-Based Access Control (RBAC).
- **Validation**: Strict schema validation using **Zod** for both Body and Query parameters.

### ⚡ Performance & Automation

- **CI/CD Pipeline**: Fully automated **GitHub Actions** that build and push Docker images to **Docker Hub** on every main push.
- **Optimized Queries**: Advanced Pagination and Filtering helper using `Promise.all` for parallel database execution.
- **Multi-stage Docker**: Extremely small and secure production images using Alpine Linux.

---

## 🚀 Getting Started

### 🐳 Run with Docker (The Easiest Way)

Launch the entire environment (API + Database) with a single command:

```bash
# 1. Clone the repository
git clone https://github.com/HossamGezo/ts-bookstore-api-v2.git
cd ts-bookstore-api-v2

# 2. Setup your environment variables
cp .env.example .env

# 3. Start the application
docker-compose up -d
```

### 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server with type checking and tailwind watch
npm run dev
# OR for MVC development:
npm run mvc
```

---

## 📂 Internal Resources

- 📊 **Roadmap**: Check [TODO.md](./TODO.md) for future features.
- 📓 **Engineering Notes**: Detailed technical decisions and troubleshooting in [DEV_NOTES.md](./DEV_NOTES.md).

---

## 👨‍💻 Author

**Hossam Gezo**

- GitHub: [@HossamGezo](https://github.com/HossamGezo)
- LinkedIn: [Your LinkedIn Profile URL]

---

_Developed with focus on Clean Architecture and Modern DevOps Practices._
