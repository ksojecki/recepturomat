import { LoginForm } from './components/loginForm';
import { useTranslation } from '../i18n';

export function LoginPage() {
  const t = useTranslation();

  return (
    <div className="content-center justify-center flex">
      <div className="md:w-[50%] w-full">
        <h1 className="text-3xl">{t('auth.login')}</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
