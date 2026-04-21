import * as z from 'zod';

/**
 * Wraps a Zod schema to handle optional environment variables with a default value.
 * Empty strings (`''`) are treated as `undefined`, triggering the default value to be used instead.
 *
 * @param schema - The Zod schema to wrap.
 * @param def - The default value to use when the variable is absent or an empty string.
 * @returns A preprocessed Zod schema that normalizes empty strings to `undefined` before applying the default.
 *
 * @example
 * const schema = optional(z.string(), 'localhost');
 * schema.parse(undefined);   // → 'localhost'
 * schema.parse('');          // → 'localhost'
 * schema.parse('hostname');  // → 'hostname'
 */
const _optional = <S extends z.ZodType>(schema: S, def: z.core.util.NoUndefined<z.core.output<S>>) =>
  z.preprocess((v) => (v === '' ? undefined : v), schema.default(def));

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
});

export type Env = z.infer<typeof EnvSchema>;
