import { Injectable } from '@nestjs/common';
import { ConsumerService } from '../consumer/consumer.service';
import { ProducerService } from '../producer/producer.service';
import { EachMessagePayload, KafkaMessage } from 'kafkajs';
import { EVENT_PAYLOAD_MAP, EVENT_TYPES } from '../models';

@Injectable()
export class EventBusService {
  private events: Record<string, (payload: KafkaMessage) => Promise<void>>;
  constructor(
    private readonly consumer: ConsumerService,
    private readonly producer: ProducerService,
  ) {}

  close() {
    this.consumer.onApplicationShutdown();
    this.producer.onApplicationShutdown();
  }

  private async callback(payload: EachMessagePayload) {
    return this.events[payload.topic](payload.message);
  }

  addEventListener(
    eventName: string,
    handler: (payload: KafkaMessage) => Promise<void>,
  ) {
    this.events[eventName] = handler;
    return this.consumer.consume(
      'kafka-nestjs',
      { topics: [eventName], fromBeginning: true },
      {
        eachMessage: this.callback,
      },
    );
  }

  async emit<K extends EVENT_TYPES>(
    topicName: K,
    payload: EVENT_PAYLOAD_MAP[K],
  ) {
    return this.producer.produce({
      topic: topicName,
      messages: [{ ...payload, value: JSON.stringify(payload.value) }],
    });
  }
}
