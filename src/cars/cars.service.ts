import { Injectable } from '@nestjs/common';
import { Car } from './models/car.model';

@Injectable()
export class CarsService {
  async findOneByVIN(vin: string): Promise<Car> {
    return {} as unknown as Car;
  }

  async findAll(): Promise<Car[]> {
    return [
      {
        id: 'asdasd',
        vin: '123xw',
        manufacturer: 'Merceries',
        modelDetails: 'abc',
        gearBox: 'Automatic',
        color: 'black',
        mielage: 123,
        firstRegistrationDate: new Date(),
      },
    ];
  }
}
