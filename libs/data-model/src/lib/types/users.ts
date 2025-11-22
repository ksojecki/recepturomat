import { UnauthorizedError } from './response';

export type User = {
  username: string;
  password: string;
  email: string;
  forceChangePassword: boolean;
};

export type AuthCredentials = Pick<User, 'username' | 'password'>;
export type UserInfo = Omit<User, 'password'> & {
  token: string;
};

export type SuccessAuthenticationResponse = {
  type: 'success';
  user: UserInfo;
};

export type AuthenticationResponse =
  | SuccessAuthenticationResponse
  | UnauthorizedError;
