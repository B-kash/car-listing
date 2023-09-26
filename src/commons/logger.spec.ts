import { logManager } from './logger';
import defaultLogger from './logger';

describe('Logger', () => {
  describe('logManager', () => {
    it('should return a logger instance', () => {
      const logger = logManager.getLogger('testLogger');
      expect(logger).toBeDefined();
    });
  });

  describe('Default Logger', () => {
    it('should have the correct log level', () => {
      expect(defaultLogger).toBeDefined();
      expect(defaultLogger.level).toBe('info');
    });

    it('should log messages at the specified log level', () => {
      const mockInfo = jest.spyOn(defaultLogger, 'info');
      defaultLogger.info('Test message');
      expect(mockInfo).toHaveBeenCalledWith('Test message');
    });
  });
});
