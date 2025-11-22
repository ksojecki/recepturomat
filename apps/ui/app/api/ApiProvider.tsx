import { createContext, useContext, useMemo } from 'react';
import { AuthenticationProvider } from './authentication';

type ApiContextType = {
  onTokenExpired: () => void;
  onUnauthenticated: () => void;
};
const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = () => {
  const api = useMemo<ApiContextType>(() => {
    return {
      onTokenExpired: () => null,
      onUnauthenticated: () => null,
    };
  }, []);
  return (
    <AuthenticationProvider>
      <ApiContext.Provider value={api}></ApiContext.Provider>
    </AuthenticationProvider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an AuthenticationProvider');
  }
  return context;
};
