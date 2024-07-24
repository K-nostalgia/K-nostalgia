'use client';
import Loading from '@/components/common/Loading';
import PayButton from '@/components/common/PayButton';
import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const CartPage = () => {
  const {
    data: food,
    isPending,
    error
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data, error } = await supabase.from('local_food').select('*');
      if (error) throw new Error(error.message);
      return data;
    }
  });

  console.log(food);

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <div>
      {food.map((foo) => {
        return (
          <p>
            {/* <Image
              src={foo.title_image}
              width={100}
              height={100}
              alt="상품이미지"
            /> */}
            <p>{foo.food_name}</p>
          </p>
        );
      })}
      <div>
        <PayButton />
      </div>
    </div>
  );
};
export default CartPage;
