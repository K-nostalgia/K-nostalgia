import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { BsListUl } from 'react-icons/bs';

const OrderList_mypage = () => {
  return (
    <div className="p-4">
      <div className="flex items-center py-[3px]">
        <BsListUl className="mr-[8px] text-label-normal text-[20px]" />
        <span className="text-[16px]"> 주문 내역</span>
        <BsChevronRight className="ml-auto text-[#545454]" />
      </div>
    </div>
  );
};

export default OrderList_mypage;
