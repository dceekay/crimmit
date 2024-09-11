# Crimmit Microservices Architecture

This repository contains a microservices architecture built using **NestJS**, with three services: **Owner**, **Products**, and **Order**. These services interact with MongoDB, communicate using RabbitMQ and gRPC, and the Order service implements caching with Redis for product data.

## Services Overview

### 1. Owner Service
- Manages owner profiles (create, update, retrieve).
- When an owner updates their profile, the related product information is updated via event communication.

### 2. Products Service
- Manages product details (create, update, retrieve).
- Listens for owner profile updates and updates product information accordingly.

### 3. Order Service
- Manages orders with product details.
- Implements caching for product details using Redis to improve performance.
- Listens for product updates and clears the cache when needed.

## Technologies Used
- **NestJS**: Backend framework.
- **MongoDB**: Database for storing service data.
- **RabbitMQ**: Event-driven messaging between services.
- **gRPC**: Remote Procedure Call for direct communication between services.
- **Redis**: Caching layer for Order Service.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+)
- **Docker** (for MongoDB, RabbitMQ, and Redis)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/dceekay/crimmit.git
cd crimmit
```

### 2. Install Dependencies for Each Service
```bash
cd owner-service
npm install

cd ../products-service
npm install

cd ../order-service
npm install
```

## Running the Services

### 1. Start MongoDB, RabbitMQ, and Redis with Docker
Use the following Docker Compose file to set up the services:

```yaml
version: '3'
services:
  mongo:
    image: mongo
    ports:
      - 27017:27017

  rabbitmq:
    image: rabbitmq:management
    ports:
      - 5672:5672
      - 15672:15672

  redis:
    image: redis
    ports:
      - 6379:6379
```

Start Docker services:
```bash
docker-compose up -d
```

### 2. Start Each Service
#### Owner Service:
```bash
cd owner-service
npm run start
```

#### Products Service:
```bash
cd ../products-service
npm run start
```

#### Order Service:
```bash
cd ../order-service
npm run start
```

## Accessing the Services
- **Owner Service**: http://localhost:3001
- **Products Service**: http://localhost:3002
- **Order Service**: http://localhost:3003
- **RabbitMQ UI**: http://localhost:15672 (default username: guest, password: guest)

## Communication Overview
- **RabbitMQ**: Sends events between services (e.g., owner profile updates trigger product updates).
- **gRPC**: Direct service-to-service communication (e.g., the Order service fetching product details).
- **Redis**: Caching in the Order service for faster product data retrieval.

## Project Structure
```
crimmit/
├── owner-service/
├── products-service/
├── order-service/
└── docker-compose.yml
```

## Contributing
If you'd like to contribute, please submit an issue or a pull request on GitHub.

## License
This project is licensed under the MIT License.

---
