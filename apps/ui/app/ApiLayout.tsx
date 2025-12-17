import { useNavigate, useNavigation } from 'react-router';
import { AuthenticationProvider } from './api/authentication';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { DashboardLayout } from './DashboardLayout';
import { useCallback } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: false,
      refetchOnMount: true,
    },
  },
})

const ApiLayout = () => {
  /** Move to context **/
  const navigate = useNavigate();
  const navigation = useNavigation();

  const onUnauthenticated = useCallback(() => {
    if (navigation.location?.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, navigation.location?.pathname]);

  const onLogin = useCallback(() => {
    if (navigation.location?.pathname === '/login') {
      navigate('/');
    }
  }, [navigate, navigation.location?.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider onLogout={onUnauthenticated} onLogin={onLogin}>
        <DashboardLayout />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default ApiLayout;
