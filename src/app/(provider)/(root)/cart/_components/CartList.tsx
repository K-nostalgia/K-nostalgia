'use client';

import { CartFixedButtons } from './CartFixedButtons';
import { DataTable } from './data-table/DataTable';
import { columns } from './data-table/Data-table-column-header';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/utils/supabase/client';
import Loading from '@/components/common/Loading';
import { DefaultImage } from '@/components/common/DefaultImage';
import { useState } from 'react';

export const CartList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
      // setSelectedItems(cartData?.map((item) => item.product_id));

      if (!user) return [];
      if (userError) console.error(userError.message);

      const { data: productData, error } = await supabase
        .from('cart')
        .select('*, product:product_id(*)')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      return productData.sort((a, b) => {
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
        //장바구니 비어있을 경우 디폴트 이미지 표시
        <DefaultImage text={text} />
      )}

      <CartFixedButtons data={cartData} />
    </div>
  );
};
