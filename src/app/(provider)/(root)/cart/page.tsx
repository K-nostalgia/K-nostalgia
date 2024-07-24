'use client';
import Loading from '@/components/common/Loading';
import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { CartList } from './_components/CartList';

const CartPage = () => {
  const {
    data: cartData,
    isPending,
    error
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (!user) return [];
      if (userError) console.error(userError.message);

      const { data, error } = await supabase
        .from('cart')
        .select('*, product:product_id(*)')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      return data;
    }
  });
  // const {
  //   data: { user },
  //   error: userError
  // } = await supabase.auth.getUser();

  // if (!user) return <div>로그인 후 사용하세요</div>;
  // if (userError) console.error(userError.message);

  // const { data: cartData, error } = await supabase
  //   .from('cart')
  //   .select('*, product:product_id(*)')
  //   .eq('user_id', user.id);

  // if (error) throw new Error(error.message);

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <>
      <CartList data={cartData} />
    </>
  );
};
export default CartPage;
