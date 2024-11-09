import { vitePreprocess } from '@astrojs/svelte';

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use './src/lib/styles/mixins.scss' as m;`,
          },
        },
      },
    },
  }),
};
