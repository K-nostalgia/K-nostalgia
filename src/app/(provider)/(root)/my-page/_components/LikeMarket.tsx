import React from 'react';
import { GoHeart } from 'react-icons/go';
import { BsChevronRight } from 'react-icons/bs';
import Image from 'next/image';

const LikeMarket = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <GoHeart className="mr-[8px] text-label-normal text-[20px]" />
        <span className="text-[16px]">관심 전통시장</span>
        <BsChevronRight className="ml-auto text-[#545454]" />
      </div>

      <div className=" border border-secondary-50 rounded-xl mt-1 p-3 flex">
        <div>
          <h3 className="text-[16px] text-label-strong font-semibold">
            서울 광장시장
          </h3>
          <p className="text-label-normal text-[14px]">
            서울특별시 종로구 창경궁로 88
          </p>

          <div className="mt-2 mb-3">
            {/* <img
              src="이미지"
              alt="시장 이미지"
              className="w-16 h-16 rounded-lg mr-4"
            /> */}
            이미지
          </div>
        </div>

        <GoHeart className="text-[#191616] text-[24px] ml-auto" />
      </div>
    </div>
  );
};

export default LikeMarket;
