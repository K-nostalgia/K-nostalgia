'use client';

import { useUser } from '@/hooks/useUser';
import supabase from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { StarRating } from './StarRating';
import Loading from '@/components/common/Loading';
import Swal from 'sweetalert2';

export const Review = ({ productId }: { productId: string }) => {
  const { data: userData } = useUser();
  const queryClient = useQueryClient();

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
          .select('*,users(avatar, name)')
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

  const mutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('review_id', reviewId);
      if (error) {
        throw new Error('리뷰를 삭제하지 못했습니다.' + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', productId]
      });
    }
  });

  if (isPending) return <Loading />;
  if (error) return <div>오류</div>;

  const totalRate = reviewData?.reduce(
    (acc, item) => acc + (item.rating ?? 0),
    0
  );
  const averageRate = (totalRate ?? 0) / (reviewData?.length || 1);

  const handleReviewDelete = (reviewId: string) => {
    Swal.fire({
      text: '해당 리뷰를 삭제하시겠습니까?',
      showCancelButton: true,
      cancelButtonColor: '#E0DDD9',
      confirmButtonColor: '#9C6D2E',
      cancelButtonText: '취소',
      confirmButtonText: '삭제',
      customClass: {
        popup: 'rounded-[16px] pt-10',
        actions: 'flex gap-3 mt-8',
        confirmButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0',
        cancelButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(reviewId);
      }
    });
  };

  return (
    <div className="pb-[30%] flex flex-col justify-center items-center">
      {/* 별점 */}
      <div className="border-b-2 border-[#F2F2F2] w-full">
        <div className="w-[235px] my-8 mx-auto flex items-center justify-center border border-[##E0E0E0] rounded-[8px] p-4">
          <p className="mr-4 font-semibold">
            {averageRate} <span className="text-label-alternative"> / 5</span>
          </p>
          <StarRating rating={averageRate} size={24} />
        </div>
      </div>

      {/* 리뷰목록 */}
      <ul className="mt-8">
        {reviewData && reviewData.length > 0 ? (
          reviewData?.map((review) => (
            <li
              key={review.review_id}
              className="border-b-2 border-[#F2F2F2] py-3"
            >
              <div className="px-4">
                <div className="flex justify-between items-start mb-2">
                  {review.users && (
                    <Image
                      src={review.users?.avatar || ''}
                      width={48}
                      height={48}
                      alt={`프로필 이미지`}
                      className="rounded-full mr-2"
                    />
                  )}

                  <div className="flex-1">
                    <p className="text-label-strong font-semibold">
                      {review.users?.name}
                      <span className="inline-block pl-2 text-label-assistive font-normal text-sm">
                        {dayjs(review.created_at)
                          .locale('ko')
                          .format('YYYY. MM. DD')}
                      </span>
                    </p>
                    <StarRating rating={review.rating} size={20} />
                  </div>

                  {userData?.id === review.user_id && (
                    <button
                      onClick={() => handleReviewDelete(review.review_id)}
                      className="text-label-normal font-normal text-sm"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <div className="py-1 text-label-strong text-[15px] font-normal">
                  {review.content}
                </div>
              </div>
            </li>
          ))
        ) : (
          <>
            <Image
              src={'/image/StateSad.png'}
              width={100}
              height={92}
              alt="default"
              className="mx-auto"
            />
            <p className="text-label-assistive text-lg mt-4 font-medium">
              작성된 리뷰가 없어요
            </p>
          </>
        )}
      </ul>
    </div>
  );
};
