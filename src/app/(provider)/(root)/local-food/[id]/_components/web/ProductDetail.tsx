'use client';

import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import supabase from '@/utils/supabase/client';

import { useState } from 'react';
import { CountButton } from '../CountButton';
import { DeliveryInfo } from '../DeliveryInfo';
import { AddCartButton } from '../../../_components/AddCartButton';

export const ProductDetail = ({
  id,
  handleCartModalOpen
}: {
  id: string;
  handleCartModalOpen: () => void;
}) => {
  const [count, setCount] = useState(1);
  const {
    data: orderData,
    isPending,
    error
  } = useQuery({
    queryKey: ['localfood', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('local_food')
        .select('*')
        .eq('product_id', id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    }
  });

  const discountRate = (orderData?.discountRate ?? 0) / 100;
  const discountAmount =
    (orderData?.price ?? 0) - (orderData?.price ?? 0) * discountRate;

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <div className="rounded-tr-[16px] rounded-tl-[16px] w-full">
      <div className="flex px-8 justify-between bg-normal py-10">
        <div className="bg-normal flex-auto">
          <h2 className="font-semibold text-label-strong text-xl">
            {`[${orderData.location}]`} {orderData.food_name}
          </h2>
          <p className="font-normal text-label-assistive text-sm mb-3">
            {orderData.description}
          </p>

          {/* 할인 전 금액 */}
          <div className="pb-4 mb-4 border-b-4 border-[#F2F2F2]">
            <div className="flex items-center">
              <p className="text-sm text-label-normal font-normal">{`${orderData.discountRate}%`}</p>
              <span className="font-normal text-label-assistive line-through pl-1 text-base">
                {`${orderData.price?.toLocaleString()}원`}
              </span>
            </div>
            {/* 할인 후 금액 */}
            <strong className="text-lg text-primary-20 font-semibold">
              {`${(
                (orderData.price ?? 0) -
                (orderData.price ?? 0) * ((orderData.discountRate ?? 0) / 100)
              ).toLocaleString()}원`}
            </strong>
          </div>
          <DeliveryInfo />
          <div className="mt-4 py-4 flex items-center justify-between border-t-2 border-b-2 border-[#f2f2f2]">
            <p>수량</p>
            <CountButton count={count} onCountChange={setCount} />
          </div>
          <div className="py-4 flex items-center justify-between">
            <p>총 상품 금액</p>
            <h1 className="text-primary-20 text-xl">
              <strong className="text-2xl font-bold ">{`${(
                discountAmount * count
              ).toLocaleString()}`}</strong>
              원
            </h1>
          </div>
          <div className="flex gap-2">
            <AddCartButton
              food={orderData}
              count={count}
              handleCartModalOpen={handleCartModalOpen}
            />
            <button className="min-w-[165px] bg-primary-strong py-3 px-4 rounded-xl text-white w-full text-center text-base">
              바로 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
