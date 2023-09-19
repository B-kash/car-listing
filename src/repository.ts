import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// We can use this as the base repository and then extend from here as well if we want repository for each models

@Injectable()
export class Repository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
