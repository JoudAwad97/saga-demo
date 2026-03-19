"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.5.0",
    "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum OrderState {\n  APPROVAL_PENDING\n  APPROVED\n  REJECTED\n}\n\nenum TicketState {\n  CREATE_PENDING\n  AWAITING_ACCEPTANCE\n  CREATE_REJECTED\n}\n\nenum AuthorizationState {\n  PENDING\n  AUTHORIZED\n  FAILED\n}\n\nmodel Consumer {\n  id          String   @id @default(uuid())\n  name        String\n  creditLimit Float    @default(1000)\n  createdAt   DateTime @default(now())\n}\n\nmodel Order {\n  id         String     @id @default(uuid())\n  consumerId String\n  amount     Float\n  state      OrderState @default(APPROVAL_PENDING)\n  sagaType   String     @default(\"choreography\")\n  createdAt  DateTime   @default(now())\n  updatedAt  DateTime   @updatedAt\n}\n\nmodel Ticket {\n  id          String      @id @default(uuid())\n  orderId     String\n  description String\n  state       TicketState @default(CREATE_PENDING)\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n}\n\nmodel CreditCardAuthorization {\n  id         String             @id @default(uuid())\n  orderId    String\n  consumerId String\n  amount     Float\n  state      AuthorizationState @default(PENDING)\n  createdAt  DateTime           @default(now())\n  updatedAt  DateTime           @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Consumer\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"creditLimit\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Order\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"consumerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"state\",\"kind\":\"enum\",\"type\":\"OrderState\"},{\"name\":\"sagaType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Ticket\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"orderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"state\",\"kind\":\"enum\",\"type\":\"TicketState\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CreditCardAuthorization\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"orderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"consumerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"state\",\"kind\":\"enum\",\"type\":\"AuthorizationState\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Consumer.findUnique\",\"Consumer.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Consumer.findFirst\",\"Consumer.findFirstOrThrow\",\"Consumer.findMany\",\"data\",\"Consumer.createOne\",\"Consumer.createMany\",\"Consumer.createManyAndReturn\",\"Consumer.updateOne\",\"Consumer.updateMany\",\"Consumer.updateManyAndReturn\",\"create\",\"update\",\"Consumer.upsertOne\",\"Consumer.deleteOne\",\"Consumer.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Consumer.groupBy\",\"Consumer.aggregate\",\"Order.findUnique\",\"Order.findUniqueOrThrow\",\"Order.findFirst\",\"Order.findFirstOrThrow\",\"Order.findMany\",\"Order.createOne\",\"Order.createMany\",\"Order.createManyAndReturn\",\"Order.updateOne\",\"Order.updateMany\",\"Order.updateManyAndReturn\",\"Order.upsertOne\",\"Order.deleteOne\",\"Order.deleteMany\",\"Order.groupBy\",\"Order.aggregate\",\"Ticket.findUnique\",\"Ticket.findUniqueOrThrow\",\"Ticket.findFirst\",\"Ticket.findFirstOrThrow\",\"Ticket.findMany\",\"Ticket.createOne\",\"Ticket.createMany\",\"Ticket.createManyAndReturn\",\"Ticket.updateOne\",\"Ticket.updateMany\",\"Ticket.updateManyAndReturn\",\"Ticket.upsertOne\",\"Ticket.deleteOne\",\"Ticket.deleteMany\",\"Ticket.groupBy\",\"Ticket.aggregate\",\"CreditCardAuthorization.findUnique\",\"CreditCardAuthorization.findUniqueOrThrow\",\"CreditCardAuthorization.findFirst\",\"CreditCardAuthorization.findFirstOrThrow\",\"CreditCardAuthorization.findMany\",\"CreditCardAuthorization.createOne\",\"CreditCardAuthorization.createMany\",\"CreditCardAuthorization.createManyAndReturn\",\"CreditCardAuthorization.updateOne\",\"CreditCardAuthorization.updateMany\",\"CreditCardAuthorization.updateManyAndReturn\",\"CreditCardAuthorization.upsertOne\",\"CreditCardAuthorization.deleteOne\",\"CreditCardAuthorization.deleteMany\",\"CreditCardAuthorization.groupBy\",\"CreditCardAuthorization.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"orderId\",\"consumerId\",\"amount\",\"AuthorizationState\",\"state\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"description\",\"TicketState\",\"OrderState\",\"sagaType\",\"name\",\"creditLimit\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "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-UR4_Uh5AUx5BVR5CVwJDWB9EWh5FXAJGXSBHXh5IXx5JYAJKYyFLZCc"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map