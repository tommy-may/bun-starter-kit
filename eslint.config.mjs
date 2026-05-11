import { defineExtraConfig } from '#packages/js/config/eslint-config';

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
