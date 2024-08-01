import React from 'react';
import LoginHeader from './_components/LoginHeader';
import LoginForm from './_components/LoginForm';

const LoginPage = () => {
  return (
    <div className="bg-normal flex flex-col items-center justify-center">
      <LoginHeader />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
