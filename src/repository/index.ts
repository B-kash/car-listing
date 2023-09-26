import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge } from 'prom-client';

// We can use this as the base repository and then extend from here as well if we want repository for each models

@Injectable()
export class Repository extends PrismaClient implements OnModuleInit {
  constructor(@InjectMetric('query_time') private gauge: Gauge<string>) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async measureTime<T>(fn: () => Promise<T>): Promise<T> {
    const startTime = new Date();
    const result = await fn();
    const endTime = new Date();
    this.gauge.set(endTime.valueOf() - startTime.valueOf());
    return result;
  }
}
