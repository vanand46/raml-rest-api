
# RAML-REST-API

A sample project demonstrating REST principles with a production-grade setup using Node.js, Express.js, and TypeScript.

## Project Overview

This repository provides a scalable and maintainable structure for building RESTful APIs. The goal is to showcase a strong foundation that can be extended with more complex features.

## Features

- **Layered Architecture:** Clear separation between routing, controllers, business logic (services), and data models (entities).
- **TypeScript:** Fully typed codebase for better maintainability and fewer runtime errors.
- **Production-Ready Scripts:** Scripts for development (with auto-reload), building, and running in production.
- **Environment-Based Configuration:** Securely manages configuration using `.env` files.
- **Centralized Error Handling:** A single middleware to catch and process all errors gracefully.
- **Validation:** Built-in DTOs and validation middleware for incoming requests, including support for partial updates.
- **Security:** Basic security headers provided by `helmet`.
- **RESTful Methods:** Full support for `GET`, `POST`, `PUT`, and `DELETE`.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/RAML-REST-API.git
    cd RAML-REST-API
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following variables:

    ```env
    PORT=3000
    NODE_ENV=development
    ```

## Running the Application

- **Development Mode:**  
  Starts the server with `ts-node-dev` for live reloading on file changes.

    ```bash
    npm run dev
    ```

    The server will be available at `http://localhost:3000`.

- **Production Mode:**  
  First, build the TypeScript code into JavaScript, then run the compiled code.

    ```bash
    # 1. Build the project
    npm run build

    # 2. Start the server
    npm run start
    ```

## API Endpoints

All endpoints are prefixed with `/api`.

| Method   | Endpoint            | Description                        |
|----------|---------------------|------------------------------------|
| `GET`    | `/`                 | Checks if the API is running.      |
| `POST`   | `/customers`        | Creates a new customer.            |
| `GET`    | `/customers`        | Retrieves a list of all customers. |
| `PUT`    | `/customers/:id`    | Fully updates a customer.          |
| `DELETE` | `/customers/:id`    | Deletes a customer.                |

## REST Principles Covered

### 1. Client-Server

- **Server:** Express app handles logic, data, and APIs.
- **Client:** Any external app making HTTP requests.
- Runs independently (`server.ts`), unaware of client UI/state.

### 2. Statelessness

- Each request is self-contained.
- No sessions, cookies, or shared state.
- Example: `POST /api/customers` includes full customer data.

### 3. Uniform Interface

- **Resource URIs:** `/api/customers`, `/api/customers/:id`
- **Standard Methods:** `GET`, `POST`, `PUT`, `PATCH`, `DELETE` with JSON payloads.
- **Self-descriptive Messages:**  
  Responses use `res.json()` to return structured, readable data in `application/json` format. Each response includes:
  - Clear status codes (`200`, `201`, `400`, `404`, `500`, etc.)
  - Informative messages or data payloads
  - Proper headers like `Content-Type: application/json`

  Example:
  ```ts
  res.status(200).json({ message: 'Customer updated successfully', data: updatedCustomer });
  ```

### 4. Layered System

- Internal structure: `routes/` → `controllers/` → `services/` → `entities/`
- Clients only interact with the public endpoint (`http://localhost:3000`), allowing easy integration of proxies, gateways, or caching layers.

## Summary Table

| REST Principle           | Status              | How It's Implemented in Your Project                                  |
|--------------------------|---------------------|------------------------------------------------------------------------|
| **Client-Server**        | ✅ Implemented       | Express acts as a standalone server, separate from any client.         |
| **Stateless**            | ✅ Implemented       | No client session data is stored on the server between requests.       |
| **Layered System**       | ✅ Implemented       | Code is layered (routes, controllers, services), supports intermediaries. |
| **Uniform Interface**    | ✅ Implemented       | Standard HTTP verbs and JSON payloads used across well-defined URIs.   |
| ↳ Resource URIs          | ✅ Implemented       | Noun-based URIs like `/api/customers` identify resources.              |
| ↳ Resource Manipulation  | ✅ Implemented       | Uses `GET`, `POST`, `PUT`, `PATCH`, `DELETE` for CRUD operations.      |
| ↳ Self-Descriptive Msgs  | ✅ Implemented       | Uses `res.json()` with status codes and headers like `Content-Type`.   |
| ↳ **HATEOAS**            | ❌ Not Implemented   | Responses do not contain hypermedia links for discovering other actions/resources. |
