import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const defaultTestReporter = ['default', { summary: false }];

export default defineConfig(() => ({
  root: __dirname,
  base: '/',
  cacheDir: '../../node_modules/.vite/apps/recepturomat-ui',
  server: {
    port: 4200,
    host: 'localhost',
    https: {
      key: '/Users/kamilsojecki/.local-dev-cert/dev.pem',
      cert: '/Users/kamilsojecki/.local-dev-cert/cert.pem',
    },
    open: 'https://localhost:4200',
  },
  preview: {
    port: 4300,
    host: 'localhost',
    https: {
      key: '/Users/kamilsojecki/.local-dev-cert/dev.pem',
      cert: '/Users/kamilsojecki/.local-dev-cert/cert.pem',
    },
  },
  plugins: [
    tsconfigPaths(),
    !process.env.VITEST && reactRouter(),
    tailwindcss(),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    emptyOutDir: true,
    transformMixedEsModules: true,
    outDir: '../../dist/apps/ui',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  // Add Vitest configuration
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    reporters: process.env.GITHUB_ACTIONS ? defaultTestReporter : ['github-actions', ...defaultTestReporter],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
}));
