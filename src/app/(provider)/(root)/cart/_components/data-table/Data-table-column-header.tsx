'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { CountButton } from './CountButton';
import supabase from '@/utils/supabase/client';

export type CartItem = {
  id: string | null;
  product_id: string | null;
  image: string | null;
  product_price: number | null;
  product_name: string | null;
  count: number | null;
};

export async function fetchCartItems() {
  const { data: cartItems, error } = await supabase.from('cart').select('*');

  if (error) {
    console.error('장바구니 데이터를 가져오지 못했습니다.', error);
    return [];
  }

  const mappedCartItems = cartItems.map((item) => ({
    product_id: item.product_id,
    image: item.image,
    product_price: item.product_price,
    product_name: item.product_name,
    count: item.count
  }));

  return mappedCartItems;
}

export const columns: ColumnDef<CartItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center whitespace-nowrap">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <div className="text-base text-label-strong ml-2 absolute left-10">
          {`전체 선택 (${table.getFilteredSelectedRowModel().rows.length}/${
            table.getFilteredRowModel().rows.length
          })`}
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => (
      <Image
        src={row.getValue('image')}
        width={96}
        height={96}
        priority
        alt={row.getValue('product_name')}
        style={{ borderRadius: '8px' }}
      />
    )
  },
  { accessorKey: 'product_name', header: '' },
  {
    accessorKey: 'count',
    header: '',
    cell: ({ row }) => {
      return (
        <CountButton
          product_id={row.getValue('product_id')}
          counts={row.getValue('count')}
        />
      );
    }
  },
  {
    accessorKey: 'product_price',
    header: '',
    cell: ({ row }) => `${row.getValue('product_price')} 원`
  },
  {
    accessorKey: 'product_id',
    header: '',
    cell: ({ row }) => (
      <div style={{ display: 'none' }}>{row.getValue('product_id')}</div>
    )
  }
];
