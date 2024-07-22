'use client';

import FilterButton from '@/components/ui/FilterButton';
import { LocalFood } from '@/types/LocalFood';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

const LocalFoodView = () => {
  const fetchLocalFoodData = async () => {
    try {
      const response = await fetch(`/api/localfood`);
      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }
      const data = await response.json();
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

  if (isPending) return <div>로딩 중</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div className="xs:mx-4">
      <div className="flex gap-2 items-center mt-3 mb-6">
        <FilterButton>전체</FilterButton>
        <FilterButton>과일</FilterButton>
        <FilterButton>야채</FilterButton>
        <FilterButton>고기</FilterButton>
      </div>
      <ul className="grid gap-4 xs:grid-cols-2 2xs:grid-cols-3">
        {localFoodData.map((food) => (
          <li key={food.product_id} className="rounded-[8px] mx-auto w-full">
            <Link href={`/local-food/${food.product_id}`}>
              <div className="flex justify-center items-center h-[120px] overflow-hidden rounded-tl-[12px] rounded-tr-[12px] ">
                <Image
                  src={food.title_image}
                  width={164}
                  height={120}
                  alt="특산물 이미지"
                  className="w-full"
                />
              </div>
              <div className="bg-[#D9D9D9] pt-2 pb-1 pl-3 text-[#403D3A] rounded-bl-[12px] rounded-br-[12px]">
                <h2 className="text-base font-semibold">{food.food_name}</h2>
                <p className="text-sm">{food.price}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalFoodView;
