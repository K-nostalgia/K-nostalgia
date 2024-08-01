'use client';

import { DefaultImage } from '@/components/common/DefaultImage';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import supabase from '@/utils/supabase/client';
import { TotalPriceList } from './TotalPriceList';
import { CountButton } from './CountButton';
import { useState } from 'react';
import FixedButtons from '../../_components/FixedButtons';

type LocalDetailPageProps = {
  params: { id: string };
  isModalOpen: boolean;
  onPurchase: () => void;
  handleCartModalOpen: () => void;
};

export const OrderDetail = ({
  params: { id },
  isModalOpen,
  onPurchase,
  handleCartModalOpen
}: LocalDetailPageProps) => {
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

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <div className="bg-[#F2F2F2] pb-[10%] rounded-tr-[16px] rounded-tl-[16px] w-full fixed bottom-0 left-0 right-0">
      <div className="bg-normal px-4 pt-4 pb-2 rounded-tr-[16px] rounded-tl-[16px]">
        <p className="w-[60px] h-[6px] rounded-[3px] bg-[#E0E0E0] mx-auto"></p>
      </div>
      <div className="flex px-4 justify-between bg-normal pb-6 pt-8">
        <div className="bg-normal mr-3">
          {orderData.title_image && (
            <Image
              src={orderData.title_image[0]}
              width={96}
              height={96}
              priority
              alt={`${orderData.food_name}이미지`}
              style={{
                width: 96,
                height: 96,
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
          )}
        </div>

        <div className="bg-normal flex-auto">
          <h2 className="font-semibold">{orderData.food_name}</h2>
          <strong className="text-lg text-primary-strong">
            {`${orderData.price?.toLocaleString()}원`}
            <span className="font-normal text-label-assistive line-through pl-3 text-base">
              {`${orderData.price?.toLocaleString()}원`}
            </span>
          </strong>
          <CountButton count={count} onCountChange={setCount} />
        </div>
      </div>
      <TotalPriceList data={orderData} count={count} />
      <FixedButtons
        food={orderData}
        count={count}
        isModalOpen={isModalOpen}
        onPurchase={onPurchase}
        handleCartModalOpen={handleCartModalOpen}
      />
    </div>
  );
};
