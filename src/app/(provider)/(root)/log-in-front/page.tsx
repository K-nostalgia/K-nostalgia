'use client';
import React from 'react';
import LoginLink from './_components/LoginLink';
import KaKaoLogin from '../log-in/_components/KaKaoLogin';
import GoogleLogin from '../log-in/_components/GoogleLogin';
import EmailLogin from './_components/EmailLogin';
import Logo from './_components/Logo';
import NoLogin from '../log-in/_components/NoLogin';

const LoginFrontpage = () => {
  return (
    <div className="min-h-screen">
      <Logo />
      <LoginLink />
      <EmailLogin />
    </div>
  );
};

export default LoginFrontpage;
