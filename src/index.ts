import './config/env';

import { env } from '@/config/env';

// eslint-disable-next-line no-console
console.log(`Started ${env.NODE_ENV} project: hello via bun!`.replace(/production\s/, ''));
