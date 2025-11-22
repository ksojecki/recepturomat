import crypto from 'crypto';
import { AuthCredentials } from '@recepturomat/data-model';

export function hashPassword(data: AuthCredentials): AuthCredentials {
  return {
    username: data.username,
    password: crypto.createHash('md5').update(data.password).digest('hex'),
  };
}
