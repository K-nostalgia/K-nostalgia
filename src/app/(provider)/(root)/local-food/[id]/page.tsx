'use client';

import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import FixedButtons from '../_components/FixedButtons';
import Loading from '@/components/common/Loading';
import { OrderDetail } from './_components/OrderDetail';
import { useEffect, useState } from 'react';
import { DetailSlide } from './_components/DetailSlide';
import { CartModal } from './_components/CartModal';
import { DetailImage } from './_components/DetailImage';
import { Review } from './_components/Review';
import { ProductDetail } from './_components/web/ProductDetail';
import { ProductSlide } from './_components/web/ProductSlide';
import { DeliveryInfo } from './_components/DeliveryInfo';

export type ReviewType = {
  review_id: string;
  user_id: string;
  product_id: string;
  rating: number;
  content: string;
};

const LocalDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  const [openModal, setOpenModal] = useState(false); //바텀시트
  const [openCartModal, setOpenCartModal] = useState(false); //카트 담기 완료 모달
  const [activeTab, setActiveTab] = useState('상세 정보');
  const [review, setReview] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`/api/review?product_id=${id}`);
      const data = await response.json();
      setReview(data);
      return data;
    };
    fetchReview();
  }, [id]);

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

  const totalAmount =
    (food.price ?? 0) - (food.price ?? 0) * ((food.discountRate ?? 0) / 100);

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* 슬라이드 */}

      <div className="md:hidden">
        <DetailSlide images={food.title_image} />
      </div>
      <div className="hidden md:block">
        <div className="flex">
          <ProductSlide images={food.title_image} />
          <ProductDetail
            id={food.product_id}
            handleCartModalOpen={() => setOpenCartModal(true)}
          />
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="m-4 md:hidden">
        <h2 className="text-xl font-semibold">
          {`[${food.location}] `}
          {food?.food_name}
        </h2>
        <p className="text-[#AFACA7] text-sm">{food.description}</p>
        <p className="text-label-normal text-sm mt-2">
          {`${food.discountRate}%`}
          <span className="inline-block ml-1 text-label-assistive line-through">{`${food.price?.toLocaleString()}원`}</span>
        </p>
        <p className="text-primary-20 font-bold text-xl">{`${totalAmount.toLocaleString()}원`}</p>
      </div>
      <div className="border-t-4 border-b-4 border-[#F2F2F2] w-full mt-4 p-4 lg:hidden">
        <DeliveryInfo />
      </div>

      <div className="border-b-[2px] border-[#F2F2F2] lg:mb-6">
        <ul className="flex text-center pt-4 font-semibold lg:justify-center">
          <li
            className="flex-1 lg:flex-none cursor-pointer"
            onClick={() => setActiveTab('상세 정보')}
          >
            <p
              className={`pb-2 w-[140px] mx-auto ${
                activeTab === '상세 정보'
                  ? 'text-primary-20 border-b-4 border-primary-20'
                  : 'text-label-assistive'
              }`}
            >
              상세 정보
            </p>
          </li>
          <li
            className="flex-1 lg:flex-none cursor-pointer"
            onClick={() => setActiveTab('리뷰')}
          >
            <p
              className={`pb-2 w-[140px] mx-auto ${
                activeTab === '리뷰'
                  ? 'text-primary-20 border-b-4 border-primary-20'
                  : 'text-label-assistive'
              }`}
            >
              {`리뷰(${review.length || 0})`}
            </p>
          </li>
        </ul>
      </div>

      {/* 상세 정보 */}
      {activeTab === '상세 정보' && <DetailImage food={food.food_image} />}

      {/* 리뷰 */}
      {activeTab === '리뷰' && <Review productId={food.product_id} />}

      {/* 장바구니 담기, 구매하기 */}
      <FixedButtons
        food={food}
        count={food.count}
        onPurchase={() => setOpenModal(true)}
        isModalOpen={openModal}
        handleCartModalOpen={() => setOpenCartModal(true)}
      />
      {openModal && (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(0,0,0,.24)]"
          onClick={() => setOpenModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭해도 이벤트 발생 X
          >
            <OrderDetail
              params={{ id }}
              isModalOpen={openModal}
              onPurchase={() => setOpenModal(true)}
              handleCartModalOpen={() => setOpenCartModal(true)}
            />
          </div>
        </div>
      )}
      {openCartModal && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,.24)] z-[9999]"
          onClick={() => setOpenCartModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭해도 이벤트 발생 X
          >
            <CartModal handleCartModalClose={() => setOpenCartModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalDetailPage;
