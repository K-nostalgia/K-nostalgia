import { AlertPage } from '@/components/common/Alert';
import PayButton from '@/components/common/PayButton';
import { Tables } from '@/types/supabase';
import supabase from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  food: Tables<'local_food'>;
  count: number | null;
  onPurchase: () => void;
  isModalOpen: boolean;
  handleCartModalOpen: () => void;
}

const FixedButtons = ({
  food,
  count,
  onPurchase,
  isModalOpen,
  handleCartModalOpen
}: Props) => {
  const router = useRouter();
  //const [isAlertVisible, setAlertVisible] = useState(false);

  // {
  //   name: "청송 사과",
  //   amount: 8000,
  //   quantity: 3,
  // }

  const handlePageMove = () => {
    router.push('/cart');
    //setAlertVisible(false);
  };

  const product = [
    {
      name: food.food_name,
      amount: (food.price ?? 0) * (count ?? 0),
      quantity: count ?? 0
    }
  ];

  const onAddCart = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError || !user) {
      const isConfirmed = confirm('로그인 후 이용해주세요');
      if (isConfirmed) {
        router.replace('/log-in');
      }
      return;
    }

    try {
      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('*')
        .eq('product_id', food.product_id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (cartError) {
        alert('장바구니에 담기 중 에러가 발생했습니다.');
        return;
      }

      if (!cartData) {
        const { error: insertError } = await supabase.from('cart').insert({
          product_id: food.product_id,
          count,
          image: food.title_image ? food.title_image[0] : null,
          product_name: food.food_name,
          product_price: food.price,
          user_id: user.id,
          discountRate: food.discountRate
        });

        if (insertError) {
          alert('장바구니에 상품이 담기지 못했습니다.');
          return;
        }
      } else {
        //setAlertVisible(true);
        Swal.fire({
          title: '이미 담긴 상품입니다',
          text: `장바구니로 이동하시겠습니까?`,
          showCancelButton: true,
          cancelButtonColor: '#E0DDD9',
          confirmButtonColor: '#9C6D2E',
          cancelButtonText: '취소',
          confirmButtonText: '이동',
          customClass: {
            title: 'text-xl mt-10',
            popup: 'rounded-[16px]',
            actions: 'flex gap-3 mt-8',
            confirmButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0',
            cancelButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            handlePageMove();
          }
        });
        return;
      }
    } catch (error) {
      console.error('장바구니 담기 중 오류가 발생했습니다.', error);
    }
    handleCartModalOpen();
  };

  return (
    <>
      <div className="bg-normal shadow-custom px-4 pt-3 pb-7 fixed bottom-0 left-0 right-0">
        <div className="flex gap-3">
          <button
            onClick={onAddCart}
            className="min-w-[165px] text-primary-strong font-semibold border-2 border-primary-strong py-3 px-4 rounded-xl flex-1"
          >
            장바구니에 담기
          </button>

          <div onClick={onPurchase} className="flex-1">
            {isModalOpen ? (
              <PayButton product={product} orderNameArr={[food.food_name]} />
            ) : (
              <button className="min-w-[165px] bg-primary-strong py-3 px-4 rounded-xl text-white w-full text-center text-base leading-7">
                구매하기
              </button>
            )}
          </div>
        </div>
      </div>
      {/* {isAlertVisible && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,.24)] z-[9999]"
          onClick={() => setAlertVisible(false)}
        >
          <AlertPage
            title="이미 담긴 상품입니다"
            message="장바구니로 이동하시겠습니까?"
            buttonText="이동"
            onButtonClick={handlePageMove}
            onClose={() => setAlertVisible(false)}
          />
        </div>
      )} */}
    </>
  );
};

export default FixedButtons;
