'use client';
import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';

interface Step {
  label: string;
  type: string;
  title: string;
}

const steps: Step[] = [
  {
    label: '이메일',
    title: '어떤 이메일을 사용하시겠어요?',
    type: 'email'
  },
  {
    label: '비밀번호',
    title: '비밀번호는 무엇으로 할까요?',
    type: 'password'
  },
  {
    label: '비밀번호 재확인 ',
    title: '비밀번호를 한번 더 확인할게요 ',
    type: 'password'
  },
  {
    label: '비밀번호 확인',
    title: '저희가 어떻게 불러드리면 될까요?',
    type: 'text'
  },
  {
    label: '이름',
    title: '이름이 무엇인가요?',
    type: 'text'
  }
];

export default function Signup() {
  const [step, setStep] = useState(0);

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

  return (
    <div className="hidden xs:flex">
      <div className="w-full min-h-screen  bg-normal p-8 rounded-md">
        <div className="mb-4">
          <GoArrowLeft className="mb-4 text-2xl" onClick={prevStep} />
          <div className="flex items-center mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 px-2 mx-1 rounded-full ${
                  index < step
                    ? 'bg-primary-strong'
                    : index === step
                    ? 'bg-primary-normal'
                    : 'bg-[#F2F2F2]'
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-label-normal text-{20px} text-border mb-6 text-left">
            {steps[step].title}
          </label>
          <label className="block text-label-normal text-sm font-bold mb-2">
            {steps[step].label}
          </label>
          <input
            type={steps[step].type}
            className="w-full px-3 py-2 border border-primary-strong rounded-xl focus:outline-none focus:border-primary-strong"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={nextStep}
            className="w-full px-3 py-2 bg-primary-strong text-white rounded-xl"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
