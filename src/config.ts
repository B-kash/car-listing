export const config = {
  PORT: process.env.PORT || '3000',
  ENV: process.env.ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

console.log(config);
