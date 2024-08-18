import React from 'react';
import { CgClose } from 'react-icons/cg';

const ReportAlert = () => {
  return (
    <div className="w-[300px] h-[200px] bg-normal">
      <CgClose className="h-7 w-7 p-1 text-[#959595]" />
      <div className="text-label-strong text-center text-xl leading-7 font-semibold">
        사용자를 신고하시겠어요?
      </div>
      <div className="text-label-assistive text-center text-base font-medium leading-[25.6px]">
        신고 후에는 사용자의 채팅을 확인할 수 없어요
      </div>
      <div className="flex">
        <button className="bg-[#F2F2F2] rounded-xl text-status-negative text-base text-center font-semibold leading-[22.4px]">
          신고하기
        </button>
        <button className="bg-primary-20 rounded-xl text-label-light text-base text-center font-semibold leading-[22.4px]">
          취소하기
        </button>
      </div>
    </div>
  );
};

export default ReportAlert;
