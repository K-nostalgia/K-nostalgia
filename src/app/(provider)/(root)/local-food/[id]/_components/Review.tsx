'use client';

import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

export const Review = ({ productId }: { productId: string }) => {
  const [review, setReview] = useState('');

  const {
    data: reviewData,
    error,
    isPending
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', productId)
          .order('created_at', { ascending: false });

        if (error) {
          console.error(error.message);
        }

        return data;
      } catch (error) {
        console.error('해당 상품의 리뷰를 가져오지 못했습니다.', error);
      }
    }
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setReview('');
  };

  return (
    <div className="pb-[30%] flex flex-col justify-center items-center">
      <div className="px-4 w-full">
        <div>
          <p>
            4.8 <span> / 5</span>
          </p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
