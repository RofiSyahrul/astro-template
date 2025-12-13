import type { AstroIntegration } from 'astro';

export function globalInjector(): AstroIntegration {
  return {
    name: 'global-injector',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript(
          'page-ssr',
          'import "$lib/styles/index.scss"; import "$lib/styles/tailwind.css";',
        );
        injectScript('page', 'import "$lib/_script.client";');
      },
    },
  };
}
