import { Args, Query, Resolver } from '@nestjs/graphql';
import { Car } from './models/car.model';
import { CarsService } from './cars.service';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query((returns) => Car)
  async car(@Args('vin') vin: string): Promise<Car> {
    const car = await this.carsService.findOneByVIN(vin);
    if (!car) {
      throw new NotFoundException(vin);
    }
    return car;
  }
  @Query((returns) => [Car])
  async cars(): Promise<Car[]> {
    const cars = await this.carsService.findAll();
    return cars;
  }
}
