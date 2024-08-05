'use client';

import { CartFixedButtons } from './CartFixedButtons';
import { TableDataColumns } from './data-table/Data-table-column-header';
import Loading from '@/components/common/Loading';
import { DefaultImage } from '@/components/common/DefaultImage';
import { useState } from 'react';
import { useUserCartData } from '@/hooks/cart/useUserCartData';
import useSelectedCartStore from '@/zustand/cart/cart.data';

export const CartList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  //const { selectedItems, setSelectedItems } = useSelectedCartStore();
  const { cartData, isPending, error } = useUserCartData();
  const text = '장바구니가 비었어요';

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  return (
    <div>
      {cartData ? (
        <TableDataColumns
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ) : (
        //장바구니 비어있을 경우 디폴트 이미지 표시
        <DefaultImage text={text} />
      )}

      <CartFixedButtons data={cartData ?? []} selectedItems={selectedItems} />
    </div>
  );
};
