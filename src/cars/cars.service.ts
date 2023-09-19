import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './models/car.model';
import { Repository } from 'src/repository';

@Injectable()
export class CarsService {
  constructor(private repository: Repository) {}
  async findOneByVIN(vin: string): Promise<Car> {
    const car = await this.repository.car.findUnique({
      where: {
        vin,
      },
    });
    if (!car) {
      throw new NotFoundException(`Could not find the car with vin: ${vin}`);
    }
    return car;
  }

  async findAll(): Promise<Car[]> {
    console.log('Finding all cars');
    return await this.repository.car.findMany();
  }
}
