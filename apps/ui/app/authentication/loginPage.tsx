import { LoginForm } from './components/loginForm';

export function LoginPage() {
  return (
    <div className="content-center justify-center flex">
      <div className="md:w-[50%] w-full">
        <h1 className="text-3xl">Log in</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
