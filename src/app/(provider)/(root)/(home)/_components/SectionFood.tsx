'use client';

import Link from 'next/link';
import { FoodBox } from './FoodBox';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/types/supabase';

export const SectionFood = () => {
  const { data: localFood } = useQuery({
    queryKey: ['localfood'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/localfood');
        const data: Tables<'local_food'>[] = await response.json();
        return data;
      } catch (error) {
        console.error('메인에 특산물 데이터를 가져오지 못했습니다.', error);
      }
    }
  });

  return (
    <div className="bg-secondary-30">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-label-light mt-10 mb-3 font-custom">
          지역 특산물
        </h2>
        <ul className="grid grid-cols-2 gap-x-[23px] mx-[10px] relative">
          {localFood?.slice(0, 4).map((item, index) => {
            return (
              <FoodBox
                key={item.product_id}
                item={item}
                index={index}
              ></FoodBox>
            );
          })}
        </ul>
        <Link
          href="/local-food"
          className="border-label-disable border rounded-[12px] w-[95%] my-10"
        >
          <button className="w-full  transition-all duration-300 ease-in-out px-4 py-3 text-label-light active:border-primary-50 active:text-primary-50">
            더 보기
          </button>
        </Link>
      </div>
    </div>
  );
};
