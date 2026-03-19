-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('APPROVAL_PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TicketState" AS ENUM ('CREATE_PENDING', 'AWAITING_ACCEPTANCE', 'CREATE_REJECTED');

-- CreateEnum
CREATE TYPE "AuthorizationState" AS ENUM ('PENDING', 'AUTHORIZED', 'FAILED');

-- CreateTable
CREATE TABLE "Consumer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL DEFAULT 1000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "state" "OrderState" NOT NULL DEFAULT 'APPROVAL_PENDING',
    "sagaType" TEXT NOT NULL DEFAULT 'choreography',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "TicketState" NOT NULL DEFAULT 'CREATE_PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardAuthorization" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "state" "AuthorizationState" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCardAuthorization_pkey" PRIMARY KEY ("id")
);
