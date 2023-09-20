import pino, { Logger, LevelWithSilent } from 'pino';
import { config } from '../config';

const logLevel: LevelWithSilent =
  (config.LOG_LEVEL as LevelWithSilent) || 'info';

export const logManager = {
  getLogger(name: string): Logger {
    const logName = name || '';
    return pino({ level: logLevel, name: logName });
  },
};

const logger = logManager.getLogger('root');
export default logger;
