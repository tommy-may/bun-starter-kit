import type { ErrorStatus } from '../status';
import type { Headers } from '../types';

export type Payload = {
  success: false;
  error: {
    message?: string;
    code: string;
    details?: unknown;
  };
};

export type Options = {
  message?: string;
  code: string;
  details?: unknown;
  status?: ErrorStatus;
  headers?: Headers;
};
