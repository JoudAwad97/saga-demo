import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChoreographySagaService } from './choreography-saga.service';
import { OrderService } from '../../order/order.service';
import { ConsumerService } from '../../consumer/consumer.service';
import { KitchenService } from '../../kitchen/kitchen.service';
import { AccountingService } from '../../accounting/accounting.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ChoreographySagaService', () => {
  let module: TestingModule;
  let sagaService: ChoreographySagaService;
  let orderService: OrderService;
  let consumerService: ConsumerService;
  let kitchenService: KitchenService;
  let accountingService: AccountingService;
  let prisma: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [
        ChoreographySagaService,
        OrderService,
        ConsumerService,
        KitchenService,
        AccountingService,
        PrismaService,
      ],
    }).compile();

    await module.init();

    sagaService = module.get(ChoreographySagaService);
    orderService = module.get(OrderService);
    consumerService = module.get(ConsumerService);
    kitchenService = module.get(KitchenService);
    accountingService = module.get(AccountingService);
    prisma = module.get(PrismaService);
  }, 15000);

  afterAll(async () => {
    await prisma.creditCardAuthorization.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.order.deleteMany();
    await prisma.consumer.deleteMany();
    await module.close();
  }, 30000);

  // Poll until order leaves APPROVAL_PENDING state
  const waitForSaga = async (orderId: string, timeoutMs = 10000) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const order = await orderService.findById(orderId);
      if (order && order.state !== 'APPROVAL_PENDING') return;
      await new Promise((r) => setTimeout(r, 100));
    }
  };

  describe('Happy Path', () => {
    it('should complete the full SAGA successfully and APPROVE the order', async () => {
      const consumer = await consumerService.createConsumer('Choreo Happy', 1000);

      const order = await sagaService.createOrder(consumer.id, 100, 'Pizza Margherita');
      expect(order.state).toBe('APPROVAL_PENDING');
      expect(order.sagaType).toBe('choreography');

      await waitForSaga(order.id);

      const finalOrder = await orderService.findById(order.id);
      expect(finalOrder).toBeDefined();
      expect(finalOrder!.state).toBe('APPROVED');

      const ticket = await kitchenService.findByOrderId(order.id);
      expect(ticket).toBeDefined();
      expect(ticket!.state).toBe('AWAITING_ACCEPTANCE');

      const auth = await accountingService.findByOrderId(order.id);
      expect(auth).toBeDefined();
      expect(auth!.state).toBe('AUTHORIZED');
    }, 15000);
  });

  describe('Failure: Invalid Consumer', () => {
    it('should REJECT the order when consumer does not exist', async () => {
      const fakeConsumerId = '00000000-0000-0000-0000-000000000001';

      const order = await sagaService.createOrder(fakeConsumerId, 100, 'Pizza');

      await waitForSaga(order.id);

      const finalOrder = await orderService.findById(order.id);
      expect(finalOrder).toBeDefined();
      expect(finalOrder!.state).toBe('REJECTED');
    }, 15000);
  });

  describe('Failure: Invalid Order Details (Ticket Creation Failed)', () => {
    it('should REJECT the order when order details are invalid', async () => {
      const consumer = await consumerService.createConsumer('Choreo Invalid', 1000);

      const order = await sagaService.createOrder(consumer.id, 100, 'INVALID order details');

      await waitForSaga(order.id);

      const finalOrder = await orderService.findById(order.id);
      expect(finalOrder).toBeDefined();
      expect(finalOrder!.state).toBe('REJECTED');

      // No ticket should exist (creation failed)
      const ticket = await kitchenService.findByOrderId(order.id);
      expect(ticket).toBeNull();
    }, 15000);
  });

  describe('Failure: Credit Card Authorization Failed', () => {
    it('should REJECT order and ticket when credit card authorization fails', async () => {
      // Consumer with low credit limit
      const consumer = await consumerService.createConsumer('Choreo Broke', 50);

      // Amount exceeds credit limit
      const order = await sagaService.createOrder(consumer.id, 500, 'Expensive Steak');

      await waitForSaga(order.id);

      const finalOrder = await orderService.findById(order.id);
      expect(finalOrder).toBeDefined();
      expect(finalOrder!.state).toBe('REJECTED');

      // Ticket should be CREATE_REJECTED (compensating transaction)
      const ticket = await kitchenService.findByOrderId(order.id);
      expect(ticket).toBeDefined();
      expect(ticket!.state).toBe('CREATE_REJECTED');

      // Authorization should show as FAILED
      const auth = await accountingService.findByOrderId(order.id);
      expect(auth).toBeDefined();
      expect(auth!.state).toBe('FAILED');
    }, 15000);
  });
});
