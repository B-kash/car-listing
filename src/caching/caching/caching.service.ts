import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheOptions, Store, StoreValue } from '../store';

@Injectable()
export class CachingService implements Store {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}
  async set(key: string, val: StoreValue, options?: CacheOptions) {
    return this.cache.set(key, val, options?.ttl);
  }
  async get(key: string) {
    return this.cache.get(key);
  }
  async del(key: string) {
    return this.cache.del(key);
  }
}
