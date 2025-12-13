import path from 'node:path';

import { vitePreprocess } from '@astrojs/svelte';

const mixinsPath = path.resolve('./src/lib/styles/mixins.scss');

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use '${mixinsPath}' as m;`,
          },
        },
      },
    },
  }),
};
