import type { Headers } from './types';

import { Status, type SuccessStatus } from './status';

type Meta = Record<string, unknown>;

type Payload<D> = {
  success: true;
  data: D;
  meta?: Meta;
};

type Options<D> = {
  data: D;
  meta?: Meta;
  status?: SuccessStatus;
  headers?: Headers;
};

export const ok = <D>(data: D): Payload<D> => ({ success: true, data });

export const SuccessResponse = {
  success<D>(options: Options<D>) {
    const { data, meta, status = Status.Ok, headers } = options;

    const body: Payload<D> = {
      success: true,
      data,
    };

    if (meta) body.meta = meta;

    return Response.json(body, {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  },

  noContent(headers?: Headers) {
    return new Response(null, {
      status: Status.NoContent,
      headers,
    });
  },

  permanentRedirect(url: string, headers?: Headers) {
    return Response.redirect(url, {
      status: Status.PermanentRedirect,
      headers,
    });
  },
};
