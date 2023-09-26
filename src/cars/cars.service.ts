import { Injectable } from '@nestjs/common';
import { Car } from './models/car.model';
import { Repository } from '../repository';
import { CarInput } from './dtos/cars.input';
import { CarArgs } from './dtos/cars.args';

@Injectable()
export class CarsService {
  constructor(private repository: Repository) {}

  async findOneByVIN(vin: string): Promise<Car> {
    return this.repository.measureTime(() => {
      return this.repository.car.findUnique({
        where: {
          vin,
        },
      });
    });
  }

  async findMany(car: CarArgs): Promise<Car[]> {
    return this.repository.measureTime(() => {
      return this.repository.car.findMany({
        where: { ...car },
      });
    });
  }

  async findAll(): Promise<Car[]> {
    return this.repository.measureTime(this.repository.car.findMany);
  }

  async addOrUpdate(car: CarInput): Promise<Car> {
    const { vin, ...rest } = car;
    return this.repository.measureTime(() => {
      return this.repository.car.upsert({
        where: { vin },
        update: { ...rest },
        create: { ...car },
      });
    });
  }
}
