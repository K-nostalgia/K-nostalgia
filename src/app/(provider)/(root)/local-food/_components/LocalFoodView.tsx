'use client';

import { DefaultImage } from '@/components/common/DefaultImage';
import Loading from '@/components/common/Loading';
import FilterButton from '@/components/ui/FilterButton';
import SITE_URL from '@/constant';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type LocalFood = Tables<'local_food'>;

const COUPON = 2000;

const LocalFoodView = () => {
  const text = '특산물을 준비하고 있어요';
  const categoryList = ['전체', '과일', '야채', '고기', '곡물', '공예품'];
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const fetchLocalFoodData = async (category: string) => {
    try {
      const response = await fetch(`/api/localfood?category=${category}`);
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
    queryKey: ['localfood', selectedCategory],
    queryFn: () => fetchLocalFoodData(selectedCategory)
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  const filteredFoodData = localFoodData.filter((food) =>
    selectedCategory === '전체' ? true : food.category === selectedCategory
  );

  return (
    <div className="mx-4">
      <div className="flex gap-2 items-center mt-3 overflow-x-auto whitespace-nowrap filter-button-container">
        {categoryList.map((category) => (
          <FilterButton
            key={category}
            onClick={() => handleCategoryChange(category)}
            isActive={selectedCategory === category}
          >
            {category}
          </FilterButton>
        ))}
      </div>

      <div className="my-4">
        <Image
          src={
            'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/banner.png'
          }
          width={343}
          height={80}
          priority
          alt="배너이미지"
          style={{ width: 343, height: 80, objectFit: 'cover' }}
        />
      </div>

      {filteredFoodData.length === 0 ? (
        <DefaultImage text={text} />
      ) : (
        <ul className="grid gap-4 grid-cols-2">
          {filteredFoodData.map((food) => (
            <li
              key={food.product_id}
              className="rounded-[12px] mx-auto w-full shadow-custom2"
            >
              <Link href={`/local-food/${food.product_id}`}>
                <div className="flex justify-center items-center h-[120px] overflow-hidden rounded-tl-[12px] rounded-tr-[12px] ">
                  {food.title_image && (
                    <Image
                      src={food.title_image[0]}
                      width={164}
                      height={120}
                      alt="특산물 이미지"
                      priority
                      style={{ width: 164, height: 120, objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="bg-normal pt-2 pb-2 pl-3 text-[#403D3A] rounded-bl-[12px] rounded-br-[12px]">
                  <h2 className="text-base font-semibold">{food.food_name}</h2>
                  <p className="text-xs text-label-assistive">
                    {food.description}
                  </p>
                  <p className="text-sm mt-2">
                    {food.price?.toLocaleString()}원{' '}
                    <span className="text-sm text-label-assistive line-through">
                      {((food.price ?? 0) + COUPON).toLocaleString()}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocalFoodView;
