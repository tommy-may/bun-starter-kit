import type { Options, Payload } from './types/success-response';

import { Status } from './status';

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
