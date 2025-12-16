import { Handler, Router } from 'express';
import { hashPassword } from '../dataModel/users';
import {
  UnauthorizedError,
  AuthCredentials,
  AuthenticationResponse,
  User,
  UserInfo,
} from '@recepturomat/data-model';
import { dataModel } from '../dataModel/dataModel';
import { sign, verify } from 'jsonwebtoken';
import { AppSettings } from '../settings';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: Omit<User, 'password'>;
    }
  }
}

const router = Router();

router.post('/get-token', async (req, res) => {
  const credentials = hashPassword(req.body as AuthCredentials);
  const user = await dataModel.users.findOne(credentials);

  if (!user) {
    res
      .status(401)
      .json({ error: 'unauthorized', message: 'Invalid credentials' });
    return;
  }

  const userInfo: Omit<UserInfo, 'token'> = {
    username: user.username,
    email: user.email,
    forceChangePassword: false,
  };

  console.log(userInfo);

  const response: AuthenticationResponse = {
    type: 'success',
    user: {
      ...userInfo,
      token: sign(user, AppSettings.AUTHENTICATION_SECRET, {
        expiresIn: '1h',
        audience: user.forceChangePassword
          ? 'change-password'
          : 'recepturomat-ui',
      }),
    },
  };
  res.json(response);
});

router.get('/change-password', async (req, res) => {
  res.json({ message: 'Change password' });
});

export const useAuthentication: Handler = (request, res, next) => {
  const authHeader = request.headers.authorization;
  const hasBearer = authHeader?.startsWith('Bearer ') ?? false;

  if (!hasBearer) {
    res.status(401).json({
      type: 'error',
      error: 'unauthorized',
      reason: 'missing-token',
      message: 'Missing token',
    } satisfies UnauthorizedError);
    return;
  }

  const token = authHeader?.split(' ')[1] ?? '';
  try {
    const data = verify(token, AppSettings.AUTHENTICATION_SECRET);
    request.user = data as UserInfo;
    console.log(data);
  } catch (error) {
    res.status(401).json({
      type: 'error',
      error: 'unauthorized',
      reason: 'invalid-token',
      message: 'Invalid token',
    } satisfies UnauthorizedError);
    console.error(error);
    return;
  }

  next();
};

export const authentication = router;
