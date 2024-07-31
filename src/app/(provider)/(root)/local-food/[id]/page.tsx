'use client';

import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import FixedButtons from '../_components/FixedButtons';
import Loading from '@/components/common/Loading';
import { OrderDetail } from './_components/OrderDetail';
import { useEffect, useState } from 'react';
import { DetailSlide } from './_components/DetailSlide';
import { CartModal } from './_components/CartModal';

type LocalDetailPageProps = {
  params: { id: string };
};

const LocalDetailPage = ({ params: { id } }: LocalDetailPageProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);

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

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden'; // 모달이 열리면 스크롤 X
    } else {
      document.body.style.overflow = 'auto'; // 모달이 닫히면 스크롤 O
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  const onPurchase = () => {
    setOpenModal(true);
  };

  const handleCartModalOpen = () => {
    setOpenCartModal(true);
  };

  const handleCartModalClose = () => {
    setOpenCartModal(false);
  };

  return (
    <div>
      {/* 슬라이드 */}
      <DetailSlide images={food.title_image} />

      <div className="m-4">
        <h2 className="text-xl font-semibold">
          {`[${food.location}] `}
          {food?.food_name}
        </h2>
        <p className="text-[#AFACA7] text-sm">{food.description}</p>
        <p className="text-[#1F1E1E] font-bold text-xl mt-2">{`${food?.price?.toLocaleString()}원`}</p>
      </div>
      <div className="border-t-4 border-b-4 border-[#F2F2F2] w-full mt-4 p-4">
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
              <th className="text-primary-heavy font-medium py-2">배송비</th>
              <td>2,500원</td>
            </tr>
            <tr>
              <th className="text-primary-heavy font-medium">판매자</th>
              <td>향그리움</td>
            </tr>
          </tbody>
        </table>
      </div>

      {food.food_image && (
        <Image
          src={food.food_image}
          width={375}
          height={100}
          priority
          style={{ width: 375, height: 'auto', objectFit: 'cover' }}
          className="object-cover"
          alt="상세페이지"
        />
      )}

      <FixedButtons
        food={food}
        count={food.count}
        onPurchase={onPurchase}
        isModalOpen={openModal}
        handleCartModalOpen={handleCartModalOpen}
      />
      {openModal && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,.5)]"
          onClick={() => setOpenModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭해도 이벤트 발생 X
          >
            <OrderDetail
              params={{ id }}
              isModalOpen={openModal}
              onPurchase={onPurchase}
              handleCartModalOpen={handleCartModalOpen}
            />
          </div>
        </div>
      )}
      {openCartModal && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,.5)]"
          onClick={handleCartModalClose}
        >
          <div
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭해도 이벤트 발생 X
          >
            <CartModal handleCartModalClose={handleCartModalClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalDetailPage;
