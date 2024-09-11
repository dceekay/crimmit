# Crimmit Microservices Architecture

This repository contains a microservices architecture built using NestJS. The architecture consists of three services: Owner, Products, and Order. Each service interacts with MongoDB, and the services communicate using RabbitMQ and gRPC. Additionally, the Order service implements a caching mechanism using Redis for product data.

## Table of Contents
- [Services Overview](#services-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Services](#running-the-services)
- [Communication Overview](#communication-overview)
- [Project Structure](#project-structure)
- [Diagram](#diagram)
- [Contributing](#contributing)
- [License](#license)

## Services Overview

### 1. **Owner Service**
Manages owner profiles, including creating, updating, and retrieving profiles. When an owner updates their profile, an event is emitted to update the associated product information.

### 2. **Products Service**
Manages product details, including creating, updating, and retrieving products. Listens for owner profile updates to update product details and emits events when product information is updated.

### 3. **Order Service**
Manages orders that include product information. The service implements caching for product details using Redis to enhance performance. Listens for product updates and updates cached information when necessary.

## Technologies Used
- **NestJS** for service implementation.
- **MongoDB** for data storage.
- **RabbitMQ** for event-driven communication.
- **gRPC** for Remote Procedure Calls between services.
- **Redis** for caching product details in the Order Service.

## Prerequisites
Before setting up and running the services, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v14+)
- [Docker](https://www.docker.com/) (to run MongoDB, RabbitMQ, and Redis)
- [MongoDB](https://www.mongodb.com/) (optional, if not using Docker for MongoDB)
- [RabbitMQ](https://www.rabbitmq.com/) (optional, if not using Docker for RabbitMQ)
- [Redis](https://redis.io/) (optional, if not using Docker for Redis)
- [gRPC](https://grpc.io/) (ensure it’s set up in the services)

## Installation
### 1. Clone the repository
```bash
git clone https://github.com/dceekay/crimmit.git
cd crimmit
2. Install dependencies for each service
bash
cd owner-service
npm install
cd ../products-service
npm install
cd ../order-service
npm install
Running the Services
1. Start MongoDB, RabbitMQ, and Redis using Docker
You can use Docker Compose to start MongoDB, RabbitMQ, and Redis.

Create a docker-compose.yml file (if you don’t already have one):

yaml
version: '3'
services:
  mongo:
    image: mongo
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
  rabbitmq:
    image: rabbitmq:management
    ports:
      - 5672:5672
      - 15672:15672
  redis:
    image: redis
    ports:
      - 6379:6379
Run Docker Compose:

bash
docker-compose up -d
2. Run Each Service
Owner Service
bash
cd owner-service
npm run start
Products Service
bash
cd ../products-service
npm run start
Order Service
bash
Copy code
cd ../order-service
npm run start
3. Access the Services
Owner Service: http://localhost:3001
Products Service: http://localhost:3002
Order Service: http://localhost:3003
RabbitMQ Management:
Access the RabbitMQ Management UI at http://localhost:15672 (default username: guest, password: guest).
Communication Overview
RabbitMQ: Used for event-driven communication between the services (e.g., owner profile updates triggering product updates).
gRPC: Used for direct service-to-service communication (e.g., querying product details from the Products service).
Redis: Used in the Order service to cache product details for faster retrieval.
Project Structure
bash
crimmit/
│
├── owner-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── products-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── order-service/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml
Diagram
plaintext
Owner Service --> (gRPC) --> Products Service
Products Service --> (gRPC) --> Order Service
Owner Service --> (RabbitMQ) --> Products Service
Products Service --> (RabbitMQ) --> Order Service
Order Service --> (Cache) --> Redis
Contributing
If you'd like to contribute, please open a pull request or submit an issue on GitHub. All contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for more details.