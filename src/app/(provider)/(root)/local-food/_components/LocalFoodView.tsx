'use client';

import { LocalFood } from '@/types/LocalFood';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LocalFoodView = () => {
  const fetchLocalFoodData = async () => {
    try {
      const response = await fetch('/api/localfood');

      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('데이터를 가져오지 못했습니다.', error);
    }
  };

  const {
    data: localFoodData,
    error,
    isPending
  } = useQuery<LocalFood[]>({
    queryKey: ['localfood'],
    queryFn: fetchLocalFoodData
  });

  console.log(localFoodData);

  if (isPending) return <div>로딩 중</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <ul className="grid gap-4 xs:grid-cols-2 md:grid-cols-3">
      {localFoodData.map((food) => (
        <li key={food.product_id} className="rounded-[8px] mx-auto">
          <Link href={`/local-food/${food.product_id}`}>
            <div>
              <Image
                src={food.title_image}
                width={164}
                height={120}
                alt="특산물 이미지"
              />
            </div>
            <div className="bg-[#D9D9D9] pt-2 pb-1 pl-3">
              <h2>{food.food_name}</h2>
              <p>{food.price}원</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LocalFoodView;
