import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { Repository } from '../repository';
import { Car } from './models/car.model';
import { CarArgs } from './dtos/cars.args';
import { CarInput } from './dtos/cars.input';

describe('CarsService', () => {
  let carsService: CarsService;
  let repositoryMock: Repository;

  beforeEach(async () => {
    repositoryMock = {
      measureTime: jest.fn(),
      car: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        upsert: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: Repository, useValue: repositoryMock },
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(carsService).toBeDefined();
  });

  it('should find one car by VIN and measure time', async () => {
    const vin = 'ABC123';
    const expectedResult: Car = {
      vin: 'ABC123',
      manufacturer: 'gravida',
      modelDetails: 'eu',
      gearBox: 'MANUAL',
      color: 'red',
      mielage: 732.75,
      firstRegistrationDate: new Date(),
    };

    (repositoryMock.car.findUnique as jest.Mock).mockResolvedValue(
      expectedResult,
    );

    (repositoryMock.measureTime as jest.Mock).mockImplementation((fn) => fn());

    const result = await carsService.findOneByVIN(vin);

    expect(repositoryMock.measureTime).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(result).toEqual(expectedResult);
  });

  it('should find many cars and measure time', async () => {
    const carArgs: CarArgs = {
      gearBox: 'OTHER',
    };
    const expectedResults: Car[] = [
      {
        vin: 'WV2ZZZEB4PH029896',
        manufacturer: 'Volkswagen',
        modelDetails: 'ID.Buzz Bus (EB)(2022->)',
        gearBox: 'OTHER',
        color: 'Starlight Blue Metallic',
        mielage: 7854,
        firstRegistrationDate: new Date(),
      },
      {
        vin: 'WAUZZZFY2N2005515',
        manufacturer: 'Audi',
        modelDetails: 'Q5 Sportback (FYT)(11.2020->)',
        gearBox: 'OTHER',
        color: 'Navarrablau Metallic',
        mielage: 14569,
        firstRegistrationDate: new Date(),
      },
      {
        vin: 'VSSZZZKLXPR030121',
        manufacturer: 'Cupra',
        modelDetails: 'Leon (KL1)(09.2020->)',
        gearBox: 'OTHER',
        color: 'Graphengrau',
        mielage: 10,
        firstRegistrationDate: new Date(),
      },
    ];

    (repositoryMock.car.findMany as jest.Mock).mockResolvedValue(
      expectedResults,
    );
    (repositoryMock.measureTime as jest.Mock).mockImplementation((fn) => fn());

    const results = await carsService.findMany(carArgs);

    expect(repositoryMock.measureTime).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(results).toEqual(expectedResults);
  });

  it('should find all cars and measure time', async () => {
    const expectedResults: Car[] = [
      {
        vin: 'WV2ZZZEB4PH029896',
        manufacturer: 'Volkswagen',
        modelDetails: 'ID.Buzz Bus (EB)(2022->)',
        gearBox: 'OTHER',
        color: 'Starlight Blue Metallic',
        mielage: 7854,
        firstRegistrationDate: new Date(),
      },
      {
        vin: 'WAUZZZFY2N2005515',
        manufacturer: 'Audi',
        modelDetails: 'Q5 Sportback (FYT)(11.2020->)',
        gearBox: 'OTHER',
        color: 'Navarrablau Metallic',
        mielage: 14569,
        firstRegistrationDate: new Date(),
      },
      {
        vin: 'VSSZZZKLXPR030121',
        manufacturer: 'Cupra',
        modelDetails: 'Leon (KL1)(09.2020->)',
        gearBox: 'OTHER',
        color: 'Graphengrau',
        mielage: 10,
        firstRegistrationDate: new Date(),
      },
    ];

    (repositoryMock.car.findMany as jest.Mock).mockResolvedValue(
      expectedResults,
    );

    (repositoryMock.measureTime as jest.Mock).mockImplementation((fn) => fn());

    const results = await carsService.findAll();

    expect(repositoryMock.measureTime).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(results).toEqual(expectedResults);
  });

  it('should add or update a car and measure time', async () => {
    const fakeDate = new Date();
    const carInput: CarInput = {
      vin: 'W1K1770841V096003',
      manufacturer: 'gravida',
      modelDetails: 'eu',
      gearBox: 'MANUAL',
      color: 'red',
      mielage: 732.75,
      firstRegistrationDate: fakeDate,
    };
    const expectedCar: Car = {
      vin: 'W1K1770841V096003',
      manufacturer: 'gravida',
      modelDetails: 'eu',
      gearBox: 'MANUAL',
      color: 'red',
      mielage: 732.75,
      firstRegistrationDate: fakeDate,
    };

    (repositoryMock.car.upsert as jest.Mock).mockResolvedValue(expectedCar);

    (repositoryMock.measureTime as jest.Mock).mockImplementation((fn) => fn());

    const result = await carsService.addOrUpdate(carInput);

    expect(repositoryMock.measureTime).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(result).toEqual(expectedCar);
  });
});
