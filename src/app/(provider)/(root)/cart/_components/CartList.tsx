import React from 'react';
import { CartFixedButtons } from './CartFixedButtons';
import { Tables } from '@/types/supabase';
import { DefaultCart } from './DefaultCart';
import { DataTable } from './data-table/DataTable';
import { columns } from './data-table/Data-table-column-header';

interface CartProps {
  data: Tables<'cart'>;
}

export const CartList = ({ data }: CartProps) => {
  return (
    <div>
      {data.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <DefaultCart />
      )}
      <CartFixedButtons data={data} />
    </div>
  );
};
