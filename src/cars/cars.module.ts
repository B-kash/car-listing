import { Module } from '@nestjs/common';
import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';
import { Repository } from 'src/repository';
import { MetricsModule } from 'src/metrics/metrics.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CachingModule } from 'src/caching/caching.module';

@Module({
  providers: [CarsResolver, CarsService, Repository],
  imports: [MetricsModule, KafkaModule, CachingModule],
})
export class CarsModule {}
