import { Injectable } from '@nestjs/common';
import { Car } from './models/car.model';
import { Repository } from 'src/repository';
import { CarInput } from './dtos/cars.input';
import { CarArgs } from './dtos/cars.args';
import { Gauge, Histogram } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class CarsService {
  constructor(
    private repository: Repository,
    @InjectMetric('query_time') private gauge: Gauge<string>,
  ) {}

  async findOneByVIN(vin: string): Promise<Car> {
    return this.repository.car.findUnique({
      where: {
        vin,
      },
    });
  }

  async findMany(car: CarArgs): Promise<Car[]> {
    return this.repository.car.findMany({
      where: { ...car },
    });
  }

  async findAll(): Promise<Car[]> {
    const startTime = new Date();
    const cars = await this.repository.car.findMany();
    const endTime = new Date();
    this.gauge.set(endTime.valueOf() - startTime.valueOf());
    return cars;
  }

  async addOrUpdate(car: CarInput): Promise<Car> {
    const { vin, ...rest } = car;
    return this.repository.car.upsert({
      where: { vin },
      update: { ...rest },
      create: { ...car },
    });
  }
}
