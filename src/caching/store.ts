export type StoreValue = Record<string, any>;

export type CacheOptions = {
  ttl: number; // ttl in seconds
};

export interface Store {
  set: (key: string, val: StoreValue, options?: CacheOptions) => Promise<void>;
  get: (key: string) => Promise<StoreValue>;
  del: (key: string) => Promise<void>;
}
