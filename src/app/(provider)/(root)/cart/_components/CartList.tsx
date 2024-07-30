'use client';

import { CartFixedButtons } from './CartFixedButtons';
import { DataTable } from './data-table/DataTable';
import { columns } from './data-table/Data-table-column-header';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/utils/supabase/client';
import Loading from '@/components/common/Loading';
import { DefaultImage } from '@/components/common/DefaultImage';

export const CartList = () => {
  const text = '장바구니가 비었어요';
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

      return data.sort((a, b) => {
        const idA = a.product_id ?? '';
        const idB = b.product_id ?? '';
        return idA.localeCompare(idB);
      });
    }
  });

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <div>
      {cartData?.length > 0 ? (
        <DataTable columns={columns} data={cartData} />
      ) : (
        <DefaultImage text={text} />
      )}

      <CartFixedButtons data={cartData} />
    </div>
  );
};
