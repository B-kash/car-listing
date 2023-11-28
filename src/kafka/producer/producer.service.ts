import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, ProducerRecord } from 'kafkajs';
import { config } from 'src/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: [config.KAFKA_BROKERS],
  });

  private readonly producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }
  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async produce(record: ProducerRecord) {
    this.producer.send(record);
  }
}
