import { Test, TestingModule } from '@nestjs/testing';
import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';
import { GearBoxes } from '@prisma/client';

describe('CarsResolver', () => {
  let carsResolver: CarsResolver;
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsResolver,
        {
          provide: CarsService,
          useValue: {
            findMany: jest.fn(),
            findAll: jest.fn(),
            addOrUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    carsResolver = module.get<CarsResolver>(CarsResolver);
    carsService = module.get<CarsService>(CarsService);
  });

  describe('car', () => {
    it('should return an array of cars', async () => {
      const carArgs = {
        vin: 'W1K1770841V096003',
      };
      const expectedResult = [
        {
          __typename: 'Car',
          vin: 'W1K1770841V096003',
          manufacturer: 'gravida',
          modelDetails: 'eu',
          gearBox: 'MANUAL',
          color: 'red',
          mielage: 732.75,
          firstRegistrationDate: new Date(),
        },
      ];

      // Cast carsService.findMany to jest.Mock
      (carsService.findMany as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await carsResolver.car(carArgs);

      expect(result).toEqual(expectedResult);
    });
  });
  describe('cars', () => {
    it('should return an array of cars', async () => {
      const expectedResult = [
        {
          __typename: 'Car',
          vin: 'WV2ZZZEB4PH029896',
          manufacturer: 'Volkswagen',
          modelDetails: 'ID.Buzz Bus (EB)(2022->)',
          gearBox: 'OTHER',
          color: 'Starlight Blue Metallic',
          mielage: 7854,
          firstRegistrationDate: '2022-03-01T00:00:00.000Z',
        },
        {
          __typename: 'Car',
          vin: 'WAUZZZFY2N2005515',
          manufacturer: 'Audi',
          modelDetails: 'Q5 Sportback (FYT)(11.2020->)',
          gearBox: 'AUTOMATIC',
          color: 'Navarrablau Metallic',
          mielage: 14569,
          firstRegistrationDate: '2022-12-14T00:00:00.000Z',
        },
      ];

      (carsService.findAll as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await carsResolver.cars();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateCar', () => {
    it('should return the updated car', async () => {
      const fakeDate = new Date();
      const carInput = {
        vin: 'W1K1770841V096003',
        manufacturer: 'gravida',
        modelDetails: 'eu',
        gearBox: GearBoxes.OTHER,
        color: 'red',
        mielage: 732.75,
        firstRegistrationDate: fakeDate,
      };
      const expectedResult = {
        vin: 'W1K1770841V096003',
        manufacturer: 'gravida',
        modelDetails: 'eu',
        gearBox: 'OTHER',
        color: 'red',
        mielage: 732.75,
        firstRegistrationDate: fakeDate,
      };
      (carsService.addOrUpdate as jest.Mock).mockResolvedValueOnce(
        expectedResult,
      );

      const result = await carsResolver.updateCar(carInput);

      expect(result).toEqual(expectedResult);
    });
  });
});
