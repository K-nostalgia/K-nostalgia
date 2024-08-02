'use client';
import React, { useState } from 'react';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import { validateEmail, validatePassword } from '@/utils/validate';
import Link from 'next/link';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const checkErrors: { email?: string; password?: string } = {};
    if (!email) {
      checkErrors.email = '이메일을 입력해 주세요.';
    } else if (!validateEmail(email)) {
      checkErrors.email = ' 형식에 알맞지 않은 이메일 주소에요.';
    }
    if (!password) {
      checkErrors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(password)) {
      checkErrors.password =
        ' 영문 대문자, 소문자, 숫자와 !"?&@%$와 같은 특수문자를 포함하여 6글자 이상 입력하셔야해요. ';
    }
    setErrors(checkErrors);
    setLoginError(null);

    //에러 없을때만 로그인
    if (Object.keys(checkErrors).length === 0) {
      try {
        const user = await api.auth.logIn(email, password);

        if (user) {
          router.push('/');
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error('로그인 실패', error);
        setLoginError('가입되지 않은 아이디거나 잘못된 비밀번호에요.');
        // setErrors({
        //   email: '이메일 또는 비밀번호가 올바르지 않습니다.',
        //   password: '이메일 또는 비밀번호가 올바르지 않습니다.'
        // });
      }
    }
  };

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleLogin} className="mx-auto">
      <div className="w-full h-[660px] flex flex-col gap-2 justify-between">
        <div>
          <div className="mb-3 px-4 py-3">
            <label className="block text-label-normal pl-4 mb-2">이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[320px] mx-3 pl-4 pr-3 py-3 border rounded-xl focus:outline-none focus:border-primary-strong text-primary-20 ${
                errors.email || loginError
                  ? 'border-status-negative'
                  : 'border-label-assistive'
              }`}
            />
            {errors.email && (
              <p className="text-status-negative mt-2 text-[14px]">
                {' '}
                {errors.email}{' '}
              </p>
            )}
          </div>

          <div className="px-4 py-3">
            <label className="block text-label-normal pl-4 mb-2 ">
              비밀번호
            </label>
            <div className="relative w-[320px]">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={` w-full mx-3 pl-4 pr-12 py-3 border rounded-xl focus:outline-none focus:border-primary-strong text-primary-20 ${
                  errors.password || loginError
                    ? 'border-status-negative'
                    : 'border-label-assistive'
                }`}
              />
              <span
                onClick={handleShowPassword}
                className=" right-2 p-1 top-1/2 transform -translate-y-1/2 absolute cursor-pointer "
              >
                {showPassword ? (
                  <PiEyeSlash className="text-[#545454] text-xl " />
                ) : (
                  <PiEye className="text-[#545454] text-xl" />
                )}
              </span>
            </div>

            {errors.password && (
              <p className="text-status-negative mt-2 text-[14px]">
                {' '}
                {errors.password}{' '}
              </p>
            )}

            {loginError && (
              <p className="text-status-negative mt-2 border-status-negative text-[14px]">
                {loginError}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col px-4 py-3 ">
          <button
            type="submit"
            className="w-[320px] mx-4 py-3 px-4 bg-label-disable text-white rounded-xl hover:bg-primary-strong"
          >
            입장하기
          </button>

          <p className="mt-7 mb-10 text-center text-sm text-label-alternative">
            아직 회원이 아니신가요?{' '}
            <Link href="/sign-up" className="ml-1 text-label-normal">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
