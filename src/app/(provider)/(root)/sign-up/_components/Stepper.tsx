import React from 'react';

interface Step {
  label: string;
  type: string;
  title: string;
  key: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center mb-6">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`flex-1 h-2 px-2 mx-1 rounded-full ${
            index < currentStep
              ? 'bg-primary-strong'
              : index === currentStep
              ? 'bg-primary-normal'
              : 'bg-[#F2F2F2]'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default Stepper;
