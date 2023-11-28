export const config = {
  PORT: process.env.PORT || '3000',
  ENV: process.env.ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CLIENT_ORIGIN_URL: process.env.CLIENT_ORIGIN_URL || 'http://localhost:3000',
  KAFKA_BROKERS: process.env.KAFKA_BROKERS || 'localhost:29092',
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};

console.log(config);
