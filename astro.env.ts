import type { AstroUserConfig } from 'astro';
import dotenv from 'dotenv';

dotenv.config();

type Env = Required<AstroUserConfig>['env'];

export const env: Env = {
  schema: {},
  validateSecrets: true,
};
