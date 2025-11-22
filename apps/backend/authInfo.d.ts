import { User } from '@recepturomat/data-model';
declare global {
  declare namespace Express {
    export interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}
