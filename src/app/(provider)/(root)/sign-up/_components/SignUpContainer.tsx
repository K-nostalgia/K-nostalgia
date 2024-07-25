'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/service/service';
import { GoArrowLeft } from 'react-icons/go';
import steps from './Step';
import Stepper from './Stepper';
import SignupForm from './SignUpForm';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (userInfo.password !== userInfo.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await api.auth.signUp(
        userInfo.email,
        userInfo.password,
        userInfo.nickname
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
