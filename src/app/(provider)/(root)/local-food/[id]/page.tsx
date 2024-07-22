'use client';

import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

type LocalDetailPageProps = {
  params: { id: string };
};

const LocalDetailPage = ({ params: { id } }: LocalDetailPageProps) => {
  const {
    data: food,
    isPending,
    error
  } = useQuery({
    queryKey: ['localfood', id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('local_food')
        .select('*')
        .eq('product_id', id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    }
  });

  if (isPending) return <div>로딩중</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <>
      {food?.title_image ? (
        <Image
          src={food.title_image}
          width={375}
          height={340}
          alt="특산물 디테일 페이지"
        />
      ) : (
        <div>이미지가 없습니다.</div>
      )}
      <h2>{food?.food_name}</h2>
      <p>{food?.price}원</p>
      {food.food_image ? (
        <Image
          src={food.food_image}
          alt="상세페이지"
          width={375}
          height={100}
          objectFit="cover"
        />
      ) : (
        <div>이미지가 없습니다.</div>
      )}
    </>
  );
};

export default LocalDetailPage;
