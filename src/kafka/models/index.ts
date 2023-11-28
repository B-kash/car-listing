import { Car } from '@prisma/client';

export enum EVENT_TYPES {
  CAR_LISTINGS_QUERY_HISTORY = 'car_listings_query_history',
}

export enum OperationTypes {
  GET_BY_VIN = 'getByVin',
  GET_ALL = 'getAll',
  FIND_MANY = 'findMany',
  UPDATE = 'update',
}

export interface BasePayload {
  key: string;
  timestamp?: string;
}

export type QueryHistoryPayload = BasePayload & {
  value: {
    data: Car | Car[];
    meta: {
      operationType: OperationTypes;
    };
  };
};

export type EVENT_PAYLOAD_MAP = {
  [EVENT_TYPES.CAR_LISTINGS_QUERY_HISTORY]: QueryHistoryPayload;
};
