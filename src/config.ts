export const config = {
  PORT: process.env.PORT || '3000',
  ENV: process.env.ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CLIENT_ORIGIN_URL: process.env.CLIENT_ORIGIN_URL || 'http://localhost:3000',
};

console.log(config);
