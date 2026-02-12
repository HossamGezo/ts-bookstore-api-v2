# 📚 Bookstore API (V2)

[![Build Status](https://img.shields.io/github/actions/workflow/status/HossamGezo/ts-bookstore-api-v2/deploy.yml?branch=release/production-ready&style=for-the-badge&logo=github)](https://github.com/HossamGezo/ts-bookstore-api-v2/actions)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=down&label=Render&logo=render&style=for-the-badge&up_color=brightgreen&up_message=up&url=https%3A%2F%2Fbookstore-api-0fy2.onrender.com)](https://bookstore-api-0fy2.onrender.com)
[![Swagger Docs](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://bookstore-api-0fy2.onrender.com/api-docs)
[![Docker Hub](https://img.shields.io/docker/v/hossamgezo/bookstore-api?style=for-the-badge&logo=docker&logoColor=white&label=Docker%20Hub)](https://hub.docker.com/r/hossamgezo/bookstore-api)
[![GitHub License](https://img.shields.io/github/license/HossamGezo/ts-bookstore-api-v2?style=for-the-badge&color=blue)](https://github.com/HossamGezo/ts-bookstore-api-v2/blob/release/prod-ready/LICENSE)

---

A professional, high-performance RESTful API for a Bookstore management system. Built with **Node.js**, **Express**, and **TypeScript**, this project implements **Clean Architecture (Modular)**, robust security, a fully automated **CI/CD Pipeline**, and an **MVC pattern** for specialized workflows.

🚀 **Live Demo:** [Interactive Swagger Documentation](https://bookstore-api-0fy2.onrender.com/api-docs)

---

## 🛠 Tech Stack

| Backend Core                                                                                      | Database                                                                                                    | DevOps & CI/CD                                                                                                      | Security & Performance                                                                                   |
| :------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb&logoColor=white) | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)                        | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)   | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)          | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)                      |
| ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)               |                                                                                                             | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)                        | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)             |

---

## ✨ Key Features & Architecture

### 🏗️ Architecture & Clean Code

- **Modular Design**: Organized by features (**Auth, Users, Books, Authors**) for maximum maintainability.
- **Hybrid Pattern**: A powerful combination of **REST API** for data and **MVC** (using EJS) for password recovery flows.
- **Standardized Responses**: Consistent JSON structure across all API endpoints using custom response helpers.

### 🔐 Security & Reliability

- **Rate Limiting & Protection**: Protects against DDoS/Brute-force via `express-rate-limit`, `hpp`, and `helmet`.
- **Authentication**: Secure JWT-based auth with specialized middlewares for Admin and Account Owners.
- **Data Integrity**: Strict request validation using **Zod** schemas.

### ⚡ Performance Optimization

- **Payload Compression**: Uses Gzip compression to speed up data transfer.
- **Smart Querying**: Built-in support for Pagination, Filtering, and MongoDB Population.

---

## 📸 API Documentation Preview

![Swagger UI Preview](./assets/swagger-ui.png)

---

## 🚀 Installation & Running

### 🐳 Using Docker (Recommended)

```bash
# 1. Clone & Setup .env
git clone https://github.com/HossamGezo/ts-bookstore-api-v2.git
cd ts-bookstore-api-v2

# 2. Run with one command
docker-compose up
```

### 💻 Local Development Setup

1. **Install dependencies**: `npm install`
2. **Choose your mode**:
   - **`npm run dev`**: Start the **API** development server.
   - **`npm run mvc`**: Start the **Full Stack** development (API + Tailwind CSS Watcher + Views).

---

## 📂 Internal Resources

- 📊 **Roadmap**: Check [TODO.md](./TODO.md) for future features.
- 📓 **Engineering Notes**: Detailed troubleshooting and technical decisions in [DEV_NOTES.md](./DEV_NOTES.md).

---

## 👨‍💻 Author

**Hossam Gezo**

- GitHub: [@HossamGezo](https://github.com/HossamGezo)
- LinkedIn: [Your LinkedIn Profile URL]
