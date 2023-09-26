import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from './index';
import { Gauge } from 'prom-client';
import { MetricsModule } from '../metrics/metrics.module';

class MockGauge<T extends string = string> implements Gauge<T> {
  inc = jest.fn();
  dec = jest.fn();
  get = jest.fn();
  startTimer = jest.fn();
  labels = jest.fn();
  reset = jest.fn();
  remove = jest.fn();
  set = jest.fn();
  setToCurrentTime = jest.fn();
}

describe('Repository', () => {
  let repository: Repository;
  let gaugeMock: MockGauge<string>;

  beforeEach(async () => {
    gaugeMock = new MockGauge<string>();

    const module: TestingModule = await Test.createTestingModule({
      imports: [MetricsModule],
      providers: [
        Repository,
        {
          provide: Gauge,
          useValue: gaugeMock,
        },
      ],
    }).compile();

    repository = module.get<Repository>(Repository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should measure time execute passed method', async () => {
    const mockFunction = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return 'result';
    });

    const result = await repository.measureTime(mockFunction);

    expect(mockFunction).toHaveBeenCalled();
    expect(result).toBe('result');
  });
});
