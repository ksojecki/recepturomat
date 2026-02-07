import { useForm } from 'react-hook-form';
import { TextInput } from '@ui/forms/textInput';
import { SubmitButton } from '@ui/forms/submitButton';
import { AuthCredentials } from '@recepturomat/data-model';
import { useAuthentication } from '../../api/authentication';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useTranslation } from '../../i18n';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>();

  const navigate = useNavigate();
  const t = useTranslation();

  const { login, user } = useAuthentication();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);
  if (user) {
    return <div>{t('auth.loggedInAs', { username: user.username })}</div>;
  }

  const authenticate = (credentials: AuthCredentials) => {
    login(credentials);
  };

  return (
    <form onSubmit={handleSubmit(authenticate)} className="flex flex-col gap-4">
      <TextInput
        {...register('username', { required: true })}
        className="w-[100%]"
        label={t('auth.username')}
        isInvalid={!!errors.password}
        placeholder={t('auth.username')}
        type={'text'}
      />
      <TextInput
        {...register('password', { required: true, minLength: 3 })}
        className="w-[100%]"
        label={t('auth.password')}
        placeholder={t('auth.password')}
        type={'password'}
      />
      <SubmitButton />
    </form>
  );
};
