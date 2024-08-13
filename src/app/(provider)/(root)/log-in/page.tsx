import React from 'react';
import LoginHeader from './_components/LoginHeader';
import LoginForm from './_components/LoginForm';
import DesktopLoginLayout from './_components/DesktopLayout';

const LoginPage = () => {
  return (
    <>
      <div className="bg-normal flex flex-col items-center justify-center xs:hidden">
        <LoginHeader />
        <LoginForm />
      </div>
      <div className="bg-primary-20">
        <DesktopLoginLayout />
      </div>
    </>
  );
};

export default LoginPage;
