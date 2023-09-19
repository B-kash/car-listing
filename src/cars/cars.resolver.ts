import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Car } from './models/car.model';
import { CarsService } from './cars.service';
import { CarArgs } from './dtos/cars.args';
import { CarInput } from './dtos/cars.input';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query(() => [Car])
  async car(@Args() car: CarArgs): Promise<Car[]> {
    return this.carsService.findMany(car);
  }

  @Query(() => [Car])
  async cars(): Promise<Car[]> {
    return await this.carsService.findAll();
  }

  @Mutation(() => Car)
  async updateCar(@Args('input') args: CarInput): Promise<Car> {
    return this.carsService.addOrUpdate(args);
  }
}
