'use client';
import React from 'react';
import LoginLink from './_components/LoginLink';
import KaKaoLogin from './_components/KaKaoLogin';
import GoogleLogin from './_components/GoogleLogin';
import EmailLogin from './_components/EmailLogin';
import Logo from './_components/Logo';
import NoLogin from './_components/NoLogin';

const LoginFrontpage = () => {
  return (
    <div className="min-h-screen">
      <Logo />
      <LoginLink />
      <KaKaoLogin />
      <GoogleLogin />
      <EmailLogin />
      <NoLogin />
    </div>
  );
};

export default LoginFrontpage;
