import { Injectable } from '@nestjs/common';
import { Car } from './models/car.model';
import { Repository } from 'src/repository';

@Injectable()
export class CarsService {
  constructor(private repository: Repository) {}
  async findOneByVIN(vin: string): Promise<Car> {
    return {} as unknown as Car;
  }

  async findAll(): Promise<Car[]> {
    console.log('Finding all cars');
    return await this.repository.car.findMany();
  }
}
