# Node.js Clean Architecture with TypeScript, Mongoose, and Decorators

This project demonstrates a clean, **modular architecture** for building scalable **REST APIs** using:

- **Express.js**
- **Mongoose (MongoDB) for persistence**
- **[`tsyringe`](https://github.com/microsoft/tsyringe)** for dependency injection (DI)
- **Decorators + Reflect Metadata** for declarative routing
- **DAO-Service-Controller pattern** (similar to JPA Repository + Service layer in Java)

## Overview

This repository provides a **production-grade**, **scalable**, and **maintainable** foundation for building RESTful APIs following **Clean Architecture** and **SOLID principles**. The design mirrors enterprise Java architectures that use persistence abstractions like **JPA**, adapted for Node.js with **Mongoose**.

The architecture separates concerns into multiple logical layers, each responsible for one core aspect of the application lifecycle — from routing to persistence.

---

## Architecture Layers

| Layer | Pattern | Responsibility | Technologies |
|-------|----------|----------------|---------------|
| **Experience API** | API Façade | Handles HTTP requests, routing, and middleware | Express + Decorators |
| **Process API** | Service Layer | Business logic and orchestration | TypeScript + tsyringe |
| **System API** | DAO Layer | Abstract data access (repositories) | Mongoose + TypeScript |
| **Persistence API** | Persistence Abstraction | Database integration (MongoDB, similar to JPA) | MongoDB + Mongoose |

Each layer interacts only with the layer directly beneath it — enabling **loose coupling**, **testability**, and **clean separation of concerns**.

---

## Key Features

- **Layered, modular architecture**
- **Dependency Injection** using tsyringe
- **Custom Decorators** for route and middleware registration
- **MongoDB integration** with Mongoose (Persistence API concept)
- **Validation Middleware** for data integrity
- **Centralized Error Handling**
- **Environment-based configuration**
- **RESTful standards compliance**
- **Lightweight but enterprise-ready foundation**

---

## REST Architectural Principles Covered

This project adheres to and demonstrates the key REST design principles:

| REST Principle | Covered | Description |
|----------------|----------|-------------|
| **Client–Server** | ✅ | Clear separation between frontend (client) and backend (server). |
| **Statelessness** | ✅ | Each request carries all necessary context; no session state stored on server. |
| **Cacheability** | ✅ | Responses can be marked cacheable (HTTP headers supported). |
| **Uniform Interface** | ✅ | Consistent use of HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) and status codes. |
| **Layered System** | ✅ | DAO ↔ Service ↔ Controller separation ensures modular layers. |
| **Code on Demand (optional)** | ❌ | Not applicable for REST API services. |
| **HATEOAS (Hypermedia)** | ⚙️ Planned | Will include self-descriptive links for discoverability in future versions. |

### REST Design Coverage Summary

- **Resources as nouns:** Each endpoint represents a resource (`/customers`, `/orders`, etc.).  
- **HTTP methods map to CRUD:**  
  - `GET` → Read  
  - `POST` → Create  
  - `PUT` → Update  
  - `DELETE` → Delete  
- **Stateless interactions:** No session memory — every request is independent.  
- **Self-descriptive messages:** Uses standard HTTP headers and JSON bodies.  
- **Layered system:** Controllers call services, which delegate to DAOs that abstract database access.  
- **Separation of concerns:** Aligns with JPA-like architecture — persistence layer abstracted from business logic.

---

## Dependency Injection Chain

The system uses **tsyringe** to manage object dependencies through decorators and metadata reflection.

```
Controller (autoInjectable)
      ↓
Service (injectable)
      ↓
DAO (injectable)
      ↓
Persistence Layer (Mongoose)
```

This flow ensures that each class depends only on abstractions, not concrete implementations.

---

## Project Structure

```
src/
├── app.ts
├── server.ts
├── config/
│   └── db.ts
├── decorators/
│   └── route.decorator.ts
├── controllers/
│   └── customer.controller.ts
├── services/
│   └── customer.service.ts
├── dao/
│   └── customer.dao.ts
├── models/
│   └── customer.model.ts
├── dto/
│   └── create-customer.dto.ts
└── utils/
    └── validation-handler.ts
```

---

## Architecture Diagram

```text
            ┌────────────────────┐
            │   Client (UI/App)  │
            └────────┬───────────┘
                     │ HTTP
                     ▼
          ┌───────────────────────────┐
          │ Experience API (Controller)│
          │ - Handles routes           │
          │ - Uses @autoInjectable()   │
          └────────┬──────────────────┘
                   │
                   ▼
          ┌───────────────────────────┐
          │ Process API (Service)      │
          │ - Business logic           │
          │ - Uses @injectable()       │
          └────────┬──────────────────┘
                   │
                   ▼
          ┌───────────────────────────┐
          │ System API (DAO)           │
          │ - Data persistence layer   │
          │ - Uses @injectable()       │
          └────────┬──────────────────┘
                   │
                   ▼
          ┌───────────────────────────┐
          │ Persistence API (MongoDB) │
          │ - Abstracts DB access      │
          │ - Acts like JPA repository │
          └───────────────────────────┘
```

---

## Installation & Run

1. Clone the repository
2. Install dependencies using `npm install`
3. Configure `.env` file
4. Run development server:  
   ```bash
   npm run dev
   ```
5. Build and start production server:  
   ```bash
   npm run build
   npm start
   ```

---

## Future Enhancements

- Add `@Param()`, `@Body()`, `@Query()` decorators for parameter mapping  
- Implement HATEOAS-style responses  
- Introduce request logging and tracing  
- Add caching and repository-level optimization  
- Role-based access control decorators (`@Auth('admin')`)  
- Extend persistence to support multiple databases  
