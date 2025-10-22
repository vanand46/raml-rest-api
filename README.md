
# REST-API

A sample project demonstrating **REST principles** and a **multi-layered API architecture** using **Node.js**, **Express.js**, **TypeScript**, and **Dependency Injection** powered by [`tsyringe`](https://github.com/microsoft/tsyringe).

## Project Overview

This repository provides a **production-grade**, **scalable**, and **maintainable** foundation for building RESTful APIs following a **layered architecture** and **SOLID principles**.  

The design follows three main layers, each mapped to a common enterprise pattern:

| Layer | Design Pattern | Description |
|-------|----------------|--------------|
| **Experience API** | API Façade | Handles client requests, routes, and controllers. |
| **Process API** | Service Layer Pattern | Contains business logic, orchestration, and process rules. |
| **System API** | Data Access Object (DAO) Pattern | Encapsulates data persistence and integrates with data sources. |

Each layer communicates **only with the layer directly beneath it**, ensuring modularity, reusability, and testability.


## Features

- **Layered Architecture:** Controllers, Services, and DAOs are clearly separated.
- **Dependency Injection:** Implemented using [`tsyringe`](https://github.com/microsoft/tsyringe) for loose coupling and testability.
- **Security:** Basic protection via `helmet` middleware.
- **Validation:** DTO-based validation middleware for request data.
- **Environment Configuration:** Managed via `.env` file.
- **TypeScript:** Fully typed code for clarity and maintainability.
- **Error Handling:** Centralized middleware for consistent error responses.
- **RESTful Standards:** Uses standard HTTP methods, status codes, and JSON payloads.
- **Production Ready:** Includes development and build scripts.

## Architecture Layers Explained

### 1. Experience API Layer (API Façade)

- Responsible for handling **HTTP requests** and **responses**.
- Implemented using **Express routes** and **Controllers**.
- Controllers are decorated with `@autoInjectable()` from `tsyringe` to enable automatic dependency injection.
- Each controller delegates logic to its corresponding **service** layer.

**Example:**
```ts
@autoInjectable()
export class CustomerController {
  constructor(private service?: CustomerService) {}

  getAll(req: Request, res: Response) {
    const customers = this.service?.findAll();
    res.json(customers);
  }
}
```

### 2. Process API Layer (Services)

* Implements **business logic**, **validation**, and **orchestration** between multiple DAOs or APIs.
* Decorated with `@injectable()` to register it with the DI container.
* Services interact only with **DAOs** and not with Express or HTTP concerns.

**Example:**

```ts
@injectable()
export class CustomerService {
  constructor(@inject(CustomerDAO) private dao: CustomerDAO) {}

  create(data: CreateCustomerDto) {
    return this.dao.create(data);
  }
}
```

### 3. System API Layer (Data Access Object)

* Encapsulates **database access** or **external system integration**.
* Implements CRUD operations or data queries.
* Provides abstraction so the business logic doesn’t depend on the persistence layer.
* Also decorated with `@injectable()` for DI registration.

**Example:**

```ts
@injectable()
export class CustomerDAO {
  private db = new Map<number, Customer>();
  private idCounter = 0;

  create(customer: Omit<Customer, "id">): Customer {
    this.idCounter++;
    const newCustomer = { id: this.idCounter, ...customer };
    this.db.set(newCustomer.id, newCustomer);
    return newCustomer;
  }
}
```

## Dependency Injection Setup

This project uses **tsyringe** for dependency management.

### Injection Chain:

```
Controller  →  Service  →  DAO
(autoInjectable)   (injectable)   (injectable)
```

### Usage Rules:

| Layer          | Decorator           | Purpose                                                        |
| -------------- | ------------------- | -------------------------------------------------------------- |
| **Controller** | `@autoInjectable()` | Automatically injects dependencies when instantiated manually. |
| **Service**    | `@injectable()`     | Defines a DI-managed class that depends on other injectables.  |
| **DAO**        | `@injectable()`     | Defines a DI-managed class for persistence access.             |

The DI container automatically resolves dependencies at runtime, removing manual wiring.


## Benefits of This Architecture

* **Loose Coupling:** Layers depend on interfaces, not concrete implementations.
* **High Testability:** You can easily mock DAOs or services in tests.
* **Reusability:** Services and DAOs can be reused across multiple controllers or apps.
* **Scalability:** Adding new business logic or endpoints doesn’t affect other layers.
* **Maintainability:** Each layer focuses on one responsibility.
* **Future Ready:** Can easily integrate new databases, queues, or microservices.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/RAML-REST-API.git
   cd RAML-REST-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode

Runs with live reload (`ts-node-dev`):

```bash
npm run dev
```

Server runs at:
**[http://localhost:3000](http://localhost:3000)**

### Production Mode

Compile and run the project:

```bash
npm run build
npm start
```

## 📡 API Endpoints

All endpoints are prefixed with `/api`.

| Method   | Endpoint         | Description                    |
| -------- | ---------------- | ------------------------------ |
| `GET`    | `/`              | Health check endpoint.         |
| `POST`   | `/customers`     | Create a new customer.         |
| `GET`    | `/customers`     | Retrieve all customers.        |
| `GET`    | `/customers/:id` | Get a specific customer by ID. |
| `PUT`    | `/customers/:id` | Update an existing customer.   |
| `DELETE` | `/customers/:id` | Delete a customer.             |


## REST Principles Summary

| REST Principle        | Status | Implementation                               |
| --------------------- | ------ | -------------------------------------------- |
| **Client–Server**     | ✅      | Express server independent from any client.  |
| **Stateless**         | ✅      | Each request contains all necessary context. |
| **Layered System**    | ✅      | DAO ↔ Service ↔ Controller separation.       |
| **Uniform Interface** | ✅      | Standard HTTP verbs and JSON payloads.       |
| **HATEOAS**           | ❌      | Not implemented yet (planned for future).    |


## Project Structure

```
src/
 ├── controllers/       # Experience API Layer (API Façade)
 │    └── customer.controller.ts
 ├── services/          # Process API Layer (Business Logic)
 │    └── customer.service.ts
 ├── dao/               # System API Layer (Data Access)
 │    └── customer.dao.ts
 ├── routes/            # Express routes
 ├── dto/               # Data Transfer Objects and validation rules
 ├── entities/          # Entities/Models
 ├── middlewares/       # Validation and error handling
 ├── config/            # DI setup and environment configuration
 ├── app.ts             # Express app initialization
 └── server.ts          # Entry point
```

## Future Improvements

* Add persistent database integration (PostgreSQL, MongoDB, etc.)
* Implement HATEOAS for discoverable APIs.
* Add request logging and tracing.
* Introduce caching and repository pattern for performance.
* Extend configuration with environment-based DI registration.


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
          └───────────────────────────┘
```
