import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './redis';
import { CachingService } from './caching/caching.service';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
