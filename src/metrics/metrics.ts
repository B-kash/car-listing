import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';

export const metrics = [
  makeGaugeProvider({
    name: 'query_time',
    help: 'time it takes to query stuffs from db in milliseconds',
  }),
];
