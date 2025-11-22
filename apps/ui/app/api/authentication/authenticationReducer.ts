import {
  AuthCredentials,
  AuthenticationResponse,
  UserInfo,
} from '@recepturomat/data-model';

export type AuthenticatedState = {
  type: 'authenticated';
  user: UserInfo;
};

export type AuthenticationState =
  | AuthenticatedState
  | { type: 'initialised' }
  | { type: 'waitingForResponse' }
  | {
      type: 'makeRequest';
      credentials: AuthCredentials;
    }
  | {
      type: 'forgetUser';
    }
  | {
      type: 'notAuthenticated';
    };

type AuthActions =
  | { type: 'localStateUpdate'; user: UserInfo | undefined }
  | { type: 'authRequest'; credentials: AuthCredentials }
  | { type: 'authResponse'; response: AuthenticationResponse }
  | { type: 'logout' }
  | { type: 'requestSent' };

export const authenticationReducer = (
  state: AuthenticationState,
  actions: AuthActions
): AuthenticationState => {
  switch (actions.type) {
    case 'localStateUpdate':
      if (actions?.user) {
        return {
          type: 'authenticated',
          user: actions.user,
        };
      }
      return { type: 'notAuthenticated' };
    case 'logout':
      return { type: 'forgetUser' };
    case 'authRequest':
      return { type: 'makeRequest', credentials: actions.credentials };
    case 'authResponse':
      if (actions.response.type === 'error') {
        return { type: 'notAuthenticated' };
      }
      return {
        type: 'authenticated',
        user: actions.response.user,
      };
    case 'requestSent':
      return { type: 'waitingForResponse' };
    default:
      return state;
  }
};
