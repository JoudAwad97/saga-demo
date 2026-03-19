# SAGA Pattern - Distributed Transactions in Microservices

A working implementation of the **SAGA pattern** for managing distributed transactions across microservices, built with **NestJS**, **Prisma**, and **PostgreSQL**.

This project implements both coordination strategies:

- **Choreography-based SAGA** - Services publish events and react to each other's events (no central coordinator)
- **Orchestration-based SAGA** - A central orchestrator sends commands to services and processes their replies

Based on the blog post: [Microservices Pattern: Distributed Transactions (SAGA)](https://medium.com/p/92b5e933cea1)

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                        NestJS App                         │
│                                                           │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ │
│  │  Consumer      │ │  Kitchen       │ │  Accounting    │ │
│  │  Service       │ │  Service       │ │  Service       │ │
│  │                │ │                │ │                │ │
│  │  - Verify      │ │  - Create      │ │  - Authorize   │ │
│  │    consumer    │ │    ticket      │ │    credit card │ │
│  │                │ │  - Approve/    │ │                │ │
│  │                │ │    reject      │ │                │ │
│  └────────────────┘ └────────────────┘ └────────────────┘ │
│                                                           │
│  ┌────────────────┐ ┌──────────────────────────────────┐  │
│  │  Order         │ │          SAGA Layer              │  │
│  │  Service       │ │                                  │  │
│  │                │ │  - Choreography (event-driven)   │  │
│  │  - Create      │ │  - Orchestration (command-driven)│  │
│  │  - Approve/    │ │                                  │  │
│  │    reject      │ │  Compensating transactions for   │  │
│  │                │ │  rollback on failure             │  │
│  └────────────────┘ └──────────────────────────────────┘  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │               PostgreSQL (via Prisma)               │  │
│  │  Consumer | Order | Ticket | CreditCardAuth         │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

## Create Order SAGA Flow

### Happy Path

1. **Order Service** - Create an Order in `APPROVAL_PENDING` state
2. **Consumer Service** - Verify that the consumer can place an order
3. **Kitchen Service** - Validate order details, create a Ticket in `CREATE_PENDING` state
4. **Accounting Service** - Authorize the consumer's credit card
5. **Kitchen Service** - Change Ticket state to `AWAITING_ACCEPTANCE`
6. **Order Service** - Change Order state to `APPROVED`

### Failure & Compensating Transactions

If any step fails, compensating transactions run in reverse order:

| Failure Point | Compensation |
|---|---|
| Consumer verification fails | Reject Order |
| Ticket creation fails | Reject Order |
| Credit card auth fails | Reject Ticket + Reject Order |

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

## Getting Started

### 1. Clone and install dependencies

```bash
cd saga-app
npm install
```

### 2. Start the local PostgreSQL database

This project uses Prisma's built-in local dev server which runs PostgreSQL automatically:

```bash
npx prisma dev
```

This starts a local PostgreSQL instance and outputs a `DATABASE_URL` in your `.env` file. Keep this terminal running.

### 3. Run database migrations

In a new terminal:

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Start the application

```bash
# Development
npm run start

# Watch mode (auto-restart on changes)
npm run start:dev
```

The server runs at `http://localhost:3000`.

## API Endpoints

### Create a Consumer

```bash
curl -X POST http://localhost:3000/saga/consumers \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "creditLimit": 1000}'
```

### Create Order via Choreography SAGA

```bash
curl -X POST http://localhost:3000/saga/choreography/orders \
  -H "Content-Type: application/json" \
  -d '{"consumerId": "<CONSUMER_ID>", "amount": 100, "description": "Pizza Margherita"}'
```

### Create Order via Orchestration SAGA

```bash
curl -X POST http://localhost:3000/saga/orchestration/orders \
  -H "Content-Type: application/json" \
  -d '{"consumerId": "<CONSUMER_ID>", "amount": 100, "description": "Sushi Platter"}'
```

### Check Order Status

```bash
curl http://localhost:3000/saga/orders/<ORDER_ID>
```

Returns the order, ticket, and credit card authorization states.

## Testing Failure Scenarios

**Invalid consumer** - Use a non-existent consumer ID:
```bash
curl -X POST http://localhost:3000/saga/choreography/orders \
  -H "Content-Type: application/json" \
  -d '{"consumerId": "00000000-0000-0000-0000-000000000000", "amount": 100, "description": "Pizza"}'
```

**Invalid order details** - Include "INVALID" in the description:
```bash
curl -X POST http://localhost:3000/saga/orchestration/orders \
  -H "Content-Type: application/json" \
  -d '{"consumerId": "<CONSUMER_ID>", "amount": 100, "description": "INVALID order"}'
```

**Credit card authorization failure** - Set amount higher than consumer's credit limit:
```bash
# Create consumer with $50 limit
curl -X POST http://localhost:3000/saga/consumers \
  -H "Content-Type: application/json" \
  -d '{"name": "Broke Charlie", "creditLimit": 50}'

# Try to place $500 order
curl -X POST http://localhost:3000/saga/choreography/orders \
  -H "Content-Type: application/json" \
  -d '{"consumerId": "<CONSUMER_ID>", "amount": 500, "description": "Expensive Steak"}'
```

## Running Tests

```bash
# Run all SAGA tests (choreography + orchestration, happy + failure paths)
npm run test:saga

# Run all tests
npm run test
```

## Project Structure

```
src/
├── prisma/                          # PrismaService (PostgreSQL connection)
├── common/
│   └── events.ts                    # Event types, commands, replies
├── consumer/
│   ├── consumer.module.ts
│   └── consumer.service.ts          # Verify consumers
├── kitchen/
│   ├── kitchen.module.ts
│   └── kitchen.service.ts           # Create/approve/reject tickets
├── accounting/
│   ├── accounting.module.ts
│   └── accounting.service.ts        # Authorize credit cards
├── order/
│   ├── order.module.ts
│   └── order.service.ts             # Create/approve/reject orders
├── saga/
│   ├── choreography/
│   │   ├── choreography-saga.module.ts
│   │   ├── choreography-saga.service.ts       # Event-driven SAGA
│   │   └── choreography-saga.service.spec.ts  # Tests
│   ├── orchestration/
│   │   ├── orchestration-saga.module.ts
│   │   ├── orchestration-saga.service.ts      # Command-driven SAGA
│   │   └── orchestration-saga.service.spec.ts # Tests
│   └── saga.controller.ts           # REST API endpoints
├── app.module.ts
└── main.ts
```

## Tech Stack

- **NestJS** - Application framework
- **Prisma** - ORM and database migrations
- **PostgreSQL** - Database (via Prisma local dev server)
- **@nestjs/event-emitter** - In-memory async event bus for SAGA coordination
- **Jest** - Testing framework
