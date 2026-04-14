# 💳 SmartBank Mobile API

A modern, scalable **.NET-based backend service** designed for mobile banking applications.
This project demonstrates best practices in **Clean Architecture**, **RESTful API design**, and **performance-optimized data handling** for mobile environments.

---

## 🚀 Project Overview

**SmartBank Mobile API** simulates a real-world mobile banking backend system where users can:

* Authenticate securely (JWT-based)
* View accounts and balances
* Perform money transfers
* Access transaction history (with pagination)
* View card summaries
* Receive notifications

This project is designed to align with **enterprise-level backend expectations**, especially in **banking and financial systems**.

---

## 🧱 Architecture

The project follows **Clean Architecture (Layered Design)**:

```
SmartBank-Mobile-API/
│
├── src/
│   ├── SmartBank.API           → Presentation Layer (Controllers, Middleware)
│   ├── SmartBank.Application   → Business Logic (Services, DTOs, Interfaces)
│   ├── SmartBank.Domain        → Core Entities & Enums
│   ├── SmartBank.Infrastructure→ External Services (JWT, Logging, etc.)
│   └── SmartBank.Persistence   → Database (EF Core, Repositories)
│
├── tests/
│   └── SmartBank.Tests         → Unit Tests
```

---

## 🛠️ Tech Stack

* **.NET / ASP.NET Core Web API**
* **C#**
* **Entity Framework Core**
* **PostgreSQL**
* **JWT Authentication**
* **FluentValidation**
* **AutoMapper**
* **Serilog**
* **xUnit & Moq**
* **Docker & Docker Compose**
* **Swagger / OpenAPI**
* **API Versioning**

---

## 🔑 Key Features

### ✅ Mobile-Optimized API Design

* Lightweight JSON responses
* Pagination support
* Selective field exposure
* Fast response times

### ✅ Clean & Scalable Architecture

* Separation of concerns
* SOLID principles
* Maintainable and testable codebase

### ✅ Security

* JWT-based authentication
* Secure API endpoints

### ✅ Performance

* Optimized queries
* Efficient data transfer
* Async operations

### ✅ API Versioning

```
/api/v1/accounts
/api/v2/accounts
```

---

## 📡 API Endpoints (Sample)

### Authentication

```
POST /api/v1/auth/login
```

### Accounts

```
GET /api/v1/accounts
GET /api/v1/accounts/{id}
```

### Transactions

```
GET /api/v1/accounts/{id}/transactions?page=1&pageSize=10
```

### Transfers

```
POST /api/v1/transfers
```

### Notifications

```
GET /api/v1/notifications
```

---

## 🗄️ Database Design (Core Tables)

* Users
* Customers
* Accounts
* Transactions
* Transfers
* Cards
* Notifications

---

## 🐳 Running with Docker

```bash
docker-compose up --build
```

---

## 🧪 Running Tests

```bash
dotnet test
```

---

## 📌 How to Run the Project

```bash
dotnet restore
dotnet build
dotnet run
```

Swagger UI:

```
http://localhost:5000/swagger
```

---

## 🎯 Why This Project?

This project is built to demonstrate:

* Real-world backend development skills
* Experience with **mobile-first API design**
* Knowledge of **distributed system concepts**
* Understanding of **performance optimization**
* Ability to build **production-ready systems**

---

## 👩‍💻 Author

**Fatma Ulu**

* Software Developer & QA Engineer
* Backend | .NET | Java | React | Automation Testing

---

## ⭐ Contribution & Feedback

Feel free to fork the project, open issues, or provide feedback!

---

## 📢 Note

This project is a **portfolio project** designed to showcase backend engineering skills aligned with **banking and enterprise software development standards**.
