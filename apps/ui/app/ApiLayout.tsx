import { useNavigate, useNavigation } from 'react-router';
import { AuthenticationProvider } from './api/authentication';

import { DashboardLayout } from './DashboardLayout';
import { useCallback } from 'react';

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
    <AuthenticationProvider onLogout={onUnauthenticated} onLogin={onLogin}>
      <DashboardLayout />
    </AuthenticationProvider>
  );
};

export default ApiLayout;
