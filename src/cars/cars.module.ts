import { Module } from '@nestjs/common';
import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';
import { Repository } from 'src/repository';

@Module({
  providers: [CarsResolver, CarsService, Repository],
})
export class CarsModule {}
