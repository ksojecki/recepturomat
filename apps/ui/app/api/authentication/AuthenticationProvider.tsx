import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { query } from '../query';
import {
  AuthCredentials,
  AuthenticationResponse,
  UserInfo,
} from '@recepturomat/data-model';
import { authenticationReducer } from './authenticationReducer';
import { useLocalState } from './useLocalState';

type AuthenticationProviderProps = {
  children: ReactNode | ReactNode[];
  onLogout?: () => void;
  onLogin?: () => void;
};

type AuthenticationContextType = {
  isLoading: boolean;
  user: UserInfo | undefined;
  token: string | undefined;
  login: (user: AuthCredentials) => void;
  logout: () => void;
};

const AuthenticationContext = createContext<AuthenticationContextType | null>(
  null
);

export const AuthenticationProvider = ({
  children,
  onLogin,
  onLogout,
}: AuthenticationProviderProps) => {
  const savedState = useLocalState<UserInfo | undefined>('authInfo');
  const [authenticationState, dispatcher] = useReducer(authenticationReducer, {
    type: 'initialised',
  });

  const login = useCallback((credentials: AuthCredentials) => {
    dispatcher({
      type: 'authRequest',
      credentials,
    });
  }, []);

  const logout = useCallback(() => {
    dispatcher({ type: 'logout' });
  }, []);

  useEffect(() => {
    if (savedState.value) {
      dispatcher({ type: 'localStateUpdate', user: savedState.value });
    }
  }, [savedState.value]);

  useEffect(() => {
    switch (authenticationState.type) {
      case 'initialised':
        dispatcher({ type: 'localStateUpdate', user: savedState.value });
        return;
      case 'authenticated':
        savedState.set(authenticationState.user);
        onLogin?.();
        return;
      case 'notAuthenticated':
        return;
      case 'forgetUser':
        dispatcher({ type: 'localStateUpdate', user: undefined });
        savedState.remove();
        onLogout?.();
        return;
      case 'makeRequest':
        query<AuthenticationResponse, AuthCredentials | null>({
          endpoint: 'authentication/get-token',
          body: authenticationState.credentials,
        }).then((response) => {
          if (response.type === 'success') {
            dispatcher({ type: 'authResponse', response });
          } else {
            dispatcher({ type: 'logout' });
          }
        });
        dispatcher({ type: 'requestSent' });
        return;
      case 'waitingForResponse':
        return;
    }
  }, [
    authenticationState.type,
    authenticationState,
    savedState,
    onLogin,
    onLogout,
  ]);

  const user =
    authenticationState.type === 'authenticated'
      ? authenticationState.user
      : undefined;
  const token =
    authenticationState.type === 'authenticated'
      ? authenticationState.user.token
      : undefined;
  const isLoading =
    authenticationState.type !== 'authenticated' &&
    authenticationState.type !== 'notAuthenticated';

  useEffect(() => {
    if (isLoading) return;
    if (user) return;
    onLogout?.();
  }, [isLoading, onLogout, user]);

  return (
    <AuthenticationContext.Provider
      value={{ isLoading, user, token, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider'
    );
  }
  return context;
};
