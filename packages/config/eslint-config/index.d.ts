import type { Config } from 'eslint/config';
import type { defineConfig } from 'eslint/config';

type ConfigWithExtendsArray = Parameters<typeof defineConfig>;

export declare const defineExtraConfig: (...config: ConfigWithExtendsArray) => Config[];

declare const _default: Config[];
export default _default;
