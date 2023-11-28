import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { config } from 'src/config';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: [config.KAFKA_BROKERS],
  });
  private consumers: Consumer[] = [];

  async consume(
    groupId: string,
    topics: ConsumerSubscribeTopics,
    config: ConsumerRunConfig,
  ) {
    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe(topics);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown(signal?: string) {
    for (const c of this.consumers) {
      await c.disconnect();
    }
  }
}
