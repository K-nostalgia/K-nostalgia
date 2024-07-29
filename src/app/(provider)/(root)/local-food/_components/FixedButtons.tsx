import PayButton from '@/components/common/PayButton';
import { Tables } from '@/types/supabase';
import supabase from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  food: Tables<'local_food'>;
  count: number | null;
  onPurchase: () => void;
  isModalOpen: boolean;
}

const FixedButtons = ({ food, count, onPurchase, isModalOpen }: Props) => {
  const router = useRouter();

  const onAddCart = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('로그인을 해주세요.');
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
          image: food.title_image,
          product_name: food.food_name,
          product_price: food.price,
          user_id: user.id
        });
        if (insertError) {
          alert('장바구니에 상품이 담기지 않았습니다.');
          return;
        }
      } else {
        const isConfirmed = confirm(
          '이미 장바구니에 담긴 상품입니다. 장바구니로 이동하시겠습니까?'
        );
        if (isConfirmed) {
          router.push('/cart');
        }
        return;
      }
    } catch (error) {
      alert('장바구니 담기 중 오류가 발생했습니다.');
      console.error(error);
    }

    const isConfirmed = confirm(
      '장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?'
    );
    if (isConfirmed) {
      router.push('/cart');
    }
  };

  console.log(food);

  return (
    <div className="bg-normal shadow-custom px-4 pt-3 pb-1 fixed bottom-0 left-0 right-0">
      <div className="flex gap-3">
        <button
          onClick={onAddCart}
          className="text-primary-strong font-semibold border-2 border-primary-strong py-3 px-4 rounded-xl flex-1"
        >
          장바구니에 담기
        </button>

        <div
          onClick={onPurchase}
          className=" bg-primary-strong py-3 px-4 rounded-xl text-white flex-1 text-center text-base leading-7"
        >
          {isModalOpen ? <PayButton orderNameArr={} /> : '구매하기'}
        </div>
      </div>
    </div>
  );
};

export default FixedButtons;
