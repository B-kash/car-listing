import { Args, Query, Resolver } from '@nestjs/graphql';
import { Car } from './models/car.model';
import { CarsService } from './cars.service';
import { CarArgs } from './dtos/cars.args';

@Resolver((of) => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query((returns) => [Car])
  async car(@Args() car: CarArgs): Promise<Car[]> {
    return this.carsService.findMany(car);
  }
  @Query((returns) => [Car])
  async cars(): Promise<Car[]> {
    const cars = await this.carsService.findAll();
    return cars;
  }
}
