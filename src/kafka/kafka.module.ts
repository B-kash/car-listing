import { Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { EventBusService } from './event-bus/event-bus.service';

@Module({
  providers: [ProducerService, ConsumerService, EventBusService],
  exports: [EventBusService],
})
export class KafkaModule {}
