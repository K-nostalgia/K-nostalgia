'use client';

import { CartFixedButtons } from './CartFixedButtons';
import { DataTable } from './data-table/DataTable';
import { columns } from './data-table/Data-table-column-header';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/utils/supabase/client';
import Loading from '@/components/common/Loading';
import { DefaultImage } from '@/components/common/DefaultImage';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (cartData) {
      setSelectedItems(
        //null인 경우 빈문자열로 대체
        cartData.map((item) => item.product_id ?? '')
      );
    }
  }, [cartData]);

  //console.log('상품아이디', selectedItems);

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <div>
      {cartData?.length > 0 ? (
        <DataTable
          columns={columns}
          data={cartData}
          selectedItems={selectedItems}
        />
      ) : (
        //장바구니 비어있을 경우 디폴트 이미지 표시
        <DefaultImage text={text} />
      )}

      <CartFixedButtons data={cartData} selectedItems={selectedItems} />
    </div>
  );
};
