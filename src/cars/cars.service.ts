import { Injectable } from '@nestjs/common';
import { Car } from './models/car.model';
import { Repository } from '../repository';
import { CarInput } from './dtos/cars.input';
import { CarArgs } from './dtos/cars.args';
import { EventBusService } from '../kafka/event-bus/event-bus.service';
import { EVENT_TYPES, OperationTypes } from '../kafka/models';

@Injectable()
export class CarsService {
  constructor(
    private repository: Repository,
    private eventBus: EventBusService,
  ) {}

  async findOneByVIN(vin: string): Promise<Car> {
    return this.repository.measureTime(async () => {
      const car = await this.repository.car.findUnique({
        where: {
          vin,
        },
      });
      this.eventBus.emit(EVENT_TYPES.CAR_LISTINGS_QUERY_HISTORY, {
        key: vin,
        value: {
          data: car,
          meta: {
            operationType: OperationTypes.GET_BY_VIN,
          },
        },
        timestamp: Date.now().toString(),
      });
      return car;
    });
  }

  async findMany(car: CarArgs): Promise<Car[]> {
    return this.repository.measureTime(async () => {
      const cars = await this.repository.car.findMany({
        where: { ...car },
      });
      this.eventBus.emit(EVENT_TYPES.CAR_LISTINGS_QUERY_HISTORY, {
        key: null,
        value: {
          data: cars,
          meta: {
            operationType: OperationTypes.FIND_MANY,
          },
        },
        timestamp: Date.now().toString(),
      });
      return cars;
    });
  }

  async findAll(): Promise<Car[]> {
    return this.repository.measureTime(async () => {
      const cars = await this.repository.car.findMany();
      this.eventBus.emit(EVENT_TYPES.CAR_LISTINGS_QUERY_HISTORY, {
        key: null,
        value: {
          data: cars,
          meta: {
            operationType: OperationTypes.GET_ALL,
          },
        },
        timestamp: Date.now().toString(),
      });
      return cars;
    });
  }

  async addOrUpdate(car: CarInput): Promise<Car> {
    const { vin, ...rest } = car;
    return this.repository.measureTime(async () => {
      const c = await this.repository.car.upsert({
        where: { vin },
        update: { ...rest },
        create: { ...car },
      });
      this.eventBus.emit(EVENT_TYPES.CAR_LISTINGS_QUERY_HISTORY, {
        key: null,
        value: {
          data: c,
          meta: {
            operationType: OperationTypes.UPDATE,
          },
        },
        timestamp: Date.now().toString(),
      });
      return c;
    });
  }
}
