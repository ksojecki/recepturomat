import { extractAppSettingsFromEnv } from '@recepturomat/app-toolkit';
import dotenv from 'dotenv';

dotenv.config();

export const AppSettings = extractAppSettingsFromEnv([
  'MONGO_URL',
  'MONGO_USER',
  'MONGO_PASSWORD',
  'MONGO_DATABASE',
  'AUTHENTICATION_SECRET',
  'HTTPS_CERT',
  'HTTPS_KEY',
]);

export type AppSettingsType = typeof AppSettings;
