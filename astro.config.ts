import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

import { env } from './astro.env';
import {
  assetsHashing,
  envInjector,
  globalInjector,
  serviceWorker,
} from './integrations';

const isVercel = process.env.DEPLOYMENT_PLATFORM === 'vercel';
const isSWEnabled = process.env.SW_ENABLED === 'true' || isVercel;
const PORT = Number(process.env.PORT) || 4321;

// https://astro.build/config
export default defineConfig({
  adapter: isVercel ? vercel({}) : node({ mode: 'standalone' }),
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: process.env.DEV_TOOLBAR === 'true',
  },
  env,
  integrations: [
    svelte(),
    tailwind(),
    assetsHashing(),
    envInjector(),
    globalInjector(),
    serviceWorker({ enabled: isSWEnabled }),
  ],
  output: 'server',
  prefetch: {
    defaultStrategy: 'viewport',
  },
  scopedStyleStrategy: 'class',
  server: {
    headers: {
      ...(!isVercel && {
        'Referrer-Policy': 'no-referrer-when-downgrade',
      }),
    },
    port: PORT,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '$lib/styles/mixins.scss' as m;`,
        },
      },
    },
    resolve: {
      conditions: ['browser', 'import', 'module', 'default'],
    },
  },
});
