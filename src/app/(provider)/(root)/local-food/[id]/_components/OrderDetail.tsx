'use client';

import { DefaultImage } from '@/components/common/DefaultImage';
import Image from 'next/image';
import { CgClose } from 'react-icons/cg';
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
};

export const OrderDetail = ({
  params: { id },
  isModalOpen
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
    <div className="bg-[#F2F2F2] rounded-tr-[16px] rounded-tl-[16px] w-full fixed bottom-0 left-0 right-0">
      <div className="bg-normal px-4 py-6 rounded-tr-[16px] rounded-tl-[16px]">
        <p className="border border-label-normal text-label-normal px-4 py-3 rounded-[8px] flex-grow">
          구매할 상품
        </p>
      </div>
      <div className="flex px-4 justify-between bg-normal pb-6">
        <div className="bg-normal mr-3">
          {orderData.title_image ? (
            <Image
              src={orderData.title_image}
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
          ) : (
            <DefaultImage />
          )}
        </div>

        <div className="bg-normal flex-auto">
          <h2 className="font-semibold">{orderData.food_name}</h2>
          <strong className="text-lg">
            {`${orderData.price?.toLocaleString()}원`}
            <span className="font-normal text-label-assistive line-through pl-3 text-base">
              {`${orderData.price?.toLocaleString()}원`}
            </span>
          </strong>
          <CountButton count={count} onCountChange={setCount} />
        </div>
      </div>
      <TotalPriceList data={orderData} count={count} />
      <FixedButtons food={orderData} count={count} isModalOpen={isModalOpen} />
    </div>
  );
};
