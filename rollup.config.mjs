// rollup.config.mjs
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';

export default [
   {
      input: 'src/EventBus.js',
      output: [
         {
            file: 'dist/event-bus.js',
            format: 'es',
         },
         {
            file: 'dist/index.js',
            format: 'cjs',
         },
      ],
   },
   {
      input: 'src/main.js',
      output: [
         {
            file: 'dist/event-bus.min.js',
            format: 'iife',
            name: 'eventBus',
         },
      ],
      plugins: [
         babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
               [
                  '@babel/env',
                  {
                     targets: '> 0.25%, not dead',
                     modules: false,
                     loose: true,
                     forceAllTransforms: true,
                  },
               ],
            ],
         }),
         terser(),
      ],
   },
];
