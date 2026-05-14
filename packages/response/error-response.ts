import type { Headers } from './types';

import { type ErrorStatus, Status } from './status';

type Payload = {
  success: false;
  error: {
    message?: string;
    code: string;
    details?: unknown;
  };
};

type Options = {
  message?: string;
  code: string;
  details?: unknown;
  status?: ErrorStatus;
  headers?: Headers;
};

export class ErrorResponse extends Error {
  override name = 'ErrorResponse';

  code: string;
  details?: unknown;
  status: ErrorStatus;
  headers?: Headers;

  constructor(options: Options) {
    const { message, code, details, status = Status.InternalServerError, headers } = options;

    super(message);

    this.code = code;
    this.details = details;
    this.status = status;
    this.headers = headers;
  }

  toResponse() {
    return ErrorResponse.toResponse({
      message: this.message,
      code: this.code,
      details: this.details,
      status: this.status,
      headers: this.headers,
    });
  }

  static toResponse(options: Options) {
    const { message, code, details, status = Status.InternalServerError, headers } = options;

    const body: Payload = {
      success: false,
      error: {
        message,
        code,
      },
    };

    if (details) body.error.details = details;

    return Response.json(body, {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  static badRequest(message: string, issues: unknown, headers?: Headers) {
    return new ErrorResponse({
      message,
      code: 'VALIDATION',
      details: {
        issues,
      },
      status: Status.BadRequest,
      headers,
    });
  }

  static notFound(message: string, url: string, headers?: Headers) {
    return new ErrorResponse({
      message,
      code: 'NOT_FOUND',
      details: {
        url,
      },
      status: Status.NotFound,
      headers,
    });
  }
}
