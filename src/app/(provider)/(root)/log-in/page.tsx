import React from 'react';
import Link from 'next/link';
import LoginHeader from './_components/LoginHeader';
import LoginForm from './_components/LoginForm';

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-normal p-8 rounded-md hidden xs:flex">
      <div className="w-full max-w-md">
        <LoginHeader />
        <LoginForm />
        <p className="mt-6 text-center text-sm text-label-alternative">
          아직 회원이 아니신가요?{' '}
          <Link href="/sign-up" className="font-medium text-label-normal">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
