import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';

@Module({
  providers: [KitchenService],
  exports: [KitchenService],
})
export class KitchenModule {}
