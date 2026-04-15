import { defineExtraConfig } from '#eslint-config';

export default defineExtraConfig([
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
