'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { CountButton } from './CountButton';
import supabase from '@/utils/supabase/client';
import { CgClose } from 'react-icons/cg';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CartItem = {
  id: number | null;
  product_id: string | null;
  image: string | null;
  product_price: number | null;
  product_name: string | null;
  count: number | null;
};

const fetchCartItems = async () => {
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
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('product_id', productId);

      if (error) {
        throw new Error('상품을 삭제하지 못했습니다.' + error.message);
      }
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['cart']
    //   });
    // }
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({
        queryKey: ['cart']
      }); // 기존 쿼리 취소

      const previousCart = queryClient.getQueryData(['cart']); // 기존 데이터 저장

      // optimistic update
      queryClient.setQueryData(['cart'], (oldData: CartItem[] = []) => {
        return oldData.filter((item) => item.product_id !== productId);
      });

      return { previousCart }; // 롤백을 위한 이전 데이터 반환
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      }); // 쿼리 무효화
    }
  });
};

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
        style={{
          borderRadius: '8px',
          width: 96,
          height: 96,
          objectFit: 'cover'
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false
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
    cell: ({ row }) => `${row.getValue('product_price')?.toLocaleString()} 원`
  },
  {
    accessorKey: 'product_id',
    header: '',
    cell: ({ row }) => (
      <div style={{ display: 'none' }}>{row.getValue('product_id')}</div>
    )
  },
  {
    id: 'delete',
    header: '',
    cell: ({ row }) => {
      const mutation = useDeleteProduct();

      return (
        <button onClick={() => mutation.mutate(row.getValue('product_id'))}>
          <CgClose className="text-[#959595]" />
        </button>
      );
    }
  }
];
