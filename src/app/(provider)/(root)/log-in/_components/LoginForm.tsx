'use client';
import React, { useState } from 'react';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  // const { data: user, isLoading, error } = useUser();

  // console.log('user', user);
  // if (!user) return;
  // console.log('userid', user.id);

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

  const handleClickKaKaoLogin = async () => {
    try {
      const socialuser = await api.auth.socialLogin('kakao');

      console.log('카카오 로그인 성공', socialuser);
    } catch (error) {
      console.error('카카오 로그인 실패', error);
      alert('카카오 로그인 실패');
    }
  };

  const handleClickGoogleLogin = async () => {
    try {
      const socialuser = await api.auth.socialLogin('google');
      console.log('구글 로그인 성공', socialuser);
    } catch (error) {
      console.error('구글 로그인 실패', error);
      alert('구글 로그인 실패');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-label-normal mb-2">
          이메일
        </label>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-label-assistive rounded-xl focus:outline-none focus:border-primary-strong text-label-normal"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-label-normal mb-2">
          비밀번호
        </label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-label-assistive rounded-xl focus:outline-none focus:border-primary-strong text-label-normal"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-label-disable text-white rounded-xl hover:bg-primary-strong"
      >
        입장하기
      </button>
      <button
        type="button"
        onClick={handleClickKaKaoLogin}
        className="w-full py-2 px-4 bg-kakao text-black rounded-xl hover:bg-kakao-dark"
      >
        카카오 로그인
      </button>

      <button
        type="button"
        onClick={handleClickGoogleLogin}
        className="w-full py-2 px-4 bg-kakao text-black rounded-xl hover:bg-kakao-dark"
      >
        구글 로그인
      </button>
    </form>
  );
};
export default LoginForm;
