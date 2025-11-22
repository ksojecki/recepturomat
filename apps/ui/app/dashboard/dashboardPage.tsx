import { useSystemState } from '../api/clientApi';
import { Dashboard } from './components';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '@ui/loading';

export function DashboardPage() {
  const { systemState, error } = useSystemState();
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (systemState === undefined) return <Loading />;
  return <Dashboard systemState={systemState} />;
}

export default DashboardPage;
