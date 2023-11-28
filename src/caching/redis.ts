import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { config } from 'src/config';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
      },
      password: config.REDIS_PASSWORD,
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
