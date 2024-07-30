'use client';
import React, { useState } from 'react';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import { PiEye } from 'react-icons/pi';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const [showPassword, setshowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await api.auth.logIn(email, password);
      console.log('로그인 성공', user);
      router.push('/');
    } catch (error) {
      console.error('로그인 실패', error);
      alert('로그인 실패 ');
    }
  };

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm text-label-normal mb-2">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-label-assistive rounded-xl focus:outline-none focus:border-primary-strong text-primary-20"
        />
      </div>

      <div className="relative">
        <label className="block text-sm text-label-normal mb-2">비밀번호</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-label-assistive rounded-xl focus:outline-none focus:border-primary-strong text-primary-20"
        />
        <PiEye
          onClick={handleShowPassword}
          className="absolute right-3 top-[52%] flex items-center cursor-pointer text-gray-500 text-[24px]"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-label-disable text-white rounded-xl hover:bg-primary-strong"
      >
        입장하기
      </button>
    </form>
  );
};
export default LoginForm;
