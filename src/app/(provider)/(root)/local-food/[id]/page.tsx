'use client';

import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import FixedButtons from '../_components/FixedButtons';
import { DefaultImage } from '@/components/common/DefaultImage';
import Loading from '@/components/common/Loading';

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
    <>
      {food?.title_image ? (
        <Image
          src={food.title_image}
          width={375}
          height={340}
          alt="특산물 디테일 페이지"
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      ) : (
        <DefaultImage />
      )}
      <div className="m-4">
        <h2 className="text-xl font-semibold">
          {`[${food.location}] `}
          {food?.food_name}
        </h2>
        <p className="text-[#AFACA7] text-sm">{food.description}</p>
        <p className="text-[#1F1E1E] font-bold text-xl mt-2">{`${food?.price}원`}</p>
      </div>
      <div className="border-t-4 border-b-4 border-[#F2F2F2] w-full m-4 py-4 ">
        <table className="text-left text-sm">
          <tbody>
            <tr>
              <th className="align-top text-primary-heavy font-medium w-16">
                배송
              </th>
              <td>
                향신배송
                <p className="text-[#76746d]">
                  23시 전 주문 시 내일 아침 8시 전 도착
                  <span className="block">(제주 지역 향신배송 불가)</span>
                </p>
              </td>
            </tr>
            <tr>
              <th className="text-primary-heavy font-medium">배송비</th>
              <td>2,500원</td>
            </tr>
            <tr>
              <th className="text-primary-heavy font-medium">판매자</th>
              <td>향그리움</td>
            </tr>
          </tbody>
        </table>
      </div>

      {food.food_image ? (
        <Image
          src={food.food_image}
          width={375}
          height={100}
          alt="상세페이지"
        />
      ) : (
        <DefaultImage />
      )}
      <FixedButtons food={food} />
    </>
  );
};

export default LocalDetailPage;
