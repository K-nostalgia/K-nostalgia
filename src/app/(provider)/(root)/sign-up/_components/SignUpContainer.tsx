'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/service/service';
import { GoArrowLeft } from 'react-icons/go';
import steps from './Step';
import Stepper from './Stepper';
import SignupForm from './SignUpForm';
import {
  validateEmail,
  validateName,
  validatePassword
} from '@/utils/validate';

type ErrorState = {
  [key: string]: string;
};

const SignUpContainer = () => {
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    name: ''
  });
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorState>({});

  //입력 필드의 변경 사항을 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const currentStep = steps[step];
    const value = userInfo[currentStep.key as keyof typeof userInfo];
    let error = '';

    if (!value) {
      error = '이 필드는 필수입니다.';
    } else if (currentStep.key === 'email' && !validateEmail(value)) {
      error = '형식에 맞지 않는 이메일 주소에요.';
    } else if (currentStep.key === 'password' && !validatePassword(value)) {
      error =
        '영문 대문자, 소문자, 숫자와 !"?&@%$와 같은 특수문자를 포함하여 6글자 이상 입력하셔야해요.';
    } else if (
      currentStep.key === 'confirmPassword' &&
      value !== userInfo.password
    ) {
      error = '비밀번호를 다시 확인해 주세요.';
    } else if (currentStep.key === 'name' && !validateName(value)) {
      error = '정확한 이름을 입력해주세요';
    }

    setErrors((prev) => ({ ...prev, [currentStep.key]: error }));
    return !error;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }
    // if (userInfo.password !== userInfo.confirmPassword) {
    //   alert('비밀번호가 일치하지 않습니다.');
    //   return;
    // }

    console.log('userinfo 확인', userInfo);

    try {
      const response = await api.auth.signUp(
        userInfo.email,
        userInfo.password,
        userInfo.nickname,
        userInfo.name
      );

      console.log('Response:', response);

      setUserInfo({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        name: ''
      });

      setStep(0);
      router.push('/log-in');
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`회원가입 요청 중 오류가 발생했습니다: ${error}`);
    }
  };

  return (
    <div className="flex xs:hidden">
      <div className="w-full min-h-screen bg-normal p-8 rounded-md">
        <div className="mb-4">
          <GoArrowLeft
            className="mb-4 text-2xl cursor-pointer"
            onClick={prevStep}
          />
          <Stepper steps={steps} currentStep={step} />
        </div>
        <div className="mb-6">
          <SignupForm
            title={steps[step].title}
            label={steps[step].label}
            type={steps[step].type}
            name={steps[step].key}
            value={userInfo[steps[step].key as keyof typeof userInfo]}
            onChange={handleChange}
            error={errors[steps[step].key]}
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={step === steps.length - 1 ? handleSubmit : nextStep}
            className="w-full px-3 py-2 bg-primary-strong text-white rounded-xl"
          >
            {step === steps.length - 1 ? '제출' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;
