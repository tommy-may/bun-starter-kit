import type { SuccessStatus } from '../status';
import type { Headers } from '../types';

export type Meta = Record<string, unknown>;

export type Payload<D> = {
  success: true;
  data: D;
  meta?: Meta;
};

export type Options<D> = {
  data: D;
  meta?: Meta;
  status?: SuccessStatus;
  headers?: Headers;
};
