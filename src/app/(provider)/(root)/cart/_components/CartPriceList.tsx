'use client';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

interface CartProps {
  data: Tables<'cart'>[];
}
const DELIVERY_FEE = 2500;
const COUPON = 2000;

export const CartPriceList = ({ data }: CartProps) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (data) {
      const amount = data.reduce((acc, item) => {
        const price = item.product_price ?? 0;
        const quantity = item.count ?? 0;
        return acc + price * quantity;
      }, 0);
      setTotalAmount(amount);
    }
  }, [data]);

  if (!data || data.length === 0) {
    return null;
  }

  const totalPrice = totalAmount + DELIVERY_FEE - COUPON;

  return (
    <div className="bg-white mt-2 pt-6 pb-20 ">
      <ul className="flex flex-col mx-4 gap-2">
        <li className="flex justify-between">
          <p>총 상품 금액</p>
          <p>{`${totalAmount.toLocaleString()} 원`}</p>
        </li>
        <li className="flex justify-between">
          <p>배송비</p>
          <p>{`${DELIVERY_FEE.toLocaleString()} 원`}</p>
        </li>
        <li className="flex justify-between mb-4">
          <p>상품 할인 금액</p>
          <p>{`-${COUPON.toLocaleString()} 원`}</p>
        </li>
        <li className="flex justify-between text-lg text-label-strong font-semibold border-t-2 border-[#F2F2F2] pt-4">
          <p>결제 예정 금액</p>
          <p>{`${totalPrice.toLocaleString()} 원`}</p>
        </li>
      </ul>
    </div>
  );
};
