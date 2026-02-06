import type { Config } from '@react-router/dev/config';

export default {
  ssr: false,
  basename: '/',
  routeDiscovery: {
    mode: 'initial',
  },
  buildDirectory: '../../dist/apps/ui',
} satisfies Config;
