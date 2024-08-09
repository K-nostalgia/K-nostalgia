'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { CountButton } from './CountButton';
import supabase from '@/utils/supabase/client';
import Link from 'next/link';
import { DataTable } from './DataTable';
import Loading from '@/components/common/Loading';
import { useUserCartData } from '@/hooks/cart/useUserCartData';
import { useEffect, useState } from 'react';
import { useDeleteProduct } from '@/hooks/localFood/useDeleteProduct';
import { CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { DeleteButton } from './DeleteButton';

export type CartItem = {
  id: string | null;
  product_id: string | null;
  image: string[] | null;
  product_price: number | 0;
  product_name: string | null;
  count: number | 0;
  discountRate: number | 0;
};

export interface TableProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const fetchCartItems = async () => {
  const { data: cartItems, error } = await supabase.from('cart').select('*');

  if (error) {
    console.error('장바구니 데이터를 가져오지 못했습니다.', error);
    return [];
  }

  const mappedCartItems = cartItems.map((item) => ({
    product_id: item.product_id,
    image: item.image ? item.image[0] : null,
    product_price: item.product_price,
    product_name: item.product_name,
    count: item.count,
    discountRate: item.discountRate
  }));

  return mappedCartItems;
};

export const TableDataColumns = ({
  selectedItems,
  setSelectedItems
}: TableProps) => {
  const { cartData, isPending, error } = useUserCartData();
  const mutation = useDeleteProduct();

  const handleDelete = (productId: string) => {
    mutation.mutate(productId);
  };

  const openAlert = (productId: string) => {
    Swal.fire({
      text: '상품을 삭제하시겠습니까?',
      showCancelButton: true,
      cancelButtonColor: '#E0DDD9',
      confirmButtonColor: '#9C6D2E',
      cancelButtonText: '취소',
      confirmButtonText: '삭제',
      customClass: {
        popup: 'rounded-[16px] pt-10',
        actions: 'flex gap-3 mt-8',
        confirmButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0',
        cancelButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(productId);
      }
    });
  };

  //장바구니 페이지 들어왔을 때 체크 활성화 상태
  useEffect(() => {
    if (cartData) {
      const allProductIds = cartData
        .map((item) => item.product_id)
        .filter((id): id is string => id !== null);

      setSelectedItems(allProductIds);
    }
  }, [cartData, setSelectedItems]);

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  const columns: ColumnDef<CartItem>[] = [
    {
      //전체선택
      id: 'select',
      header: ({ table }) => (
        <div className="flex items-center whitespace-nowrap">
          <Checkbox
            checked={
              selectedItems.length === cartData?.length && cartData?.length > 0
            }
            onCheckedChange={(value) => {
              //console.log(value);
              const allSelectedItems = value
                ? cartData?.map((item) => item.product_id)
                : [];
              setSelectedItems(allSelectedItems as string[]);
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
          <div className="text-base text-label-strong ml-2 absolute left-10">
            {`전체 선택 (${selectedItems.length}/${cartData?.length || 0})`}
          </div>
        </div>
      ),
      //부분선택
      cell: ({ row }) => (
        <Checkbox
          checked={
            selectedItems.length > 0
              ? selectedItems.includes(row.getValue('product_id'))
              : false
          }
          onCheckedChange={(value) => {
            setSelectedItems((prev) => {
              if (value) {
                return [...prev, row.getValue('product_id')];
              } else {
                return prev.filter((id) => id != row.getValue('product_id'));
              }
            });
          }}
          aria-label="Select row"
          style={{ transform: 'translate(0, -180%)' }}
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      //상품 이미지
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => (
        <Link href={`/local-food/${row.getValue('product_id')}`}>
          <Image
            src={row.getValue('image')}
            width={115}
            height={115}
            priority
            alt={row.getValue('product_name')}
            style={{
              borderRadius: '8px',
              width: 115,
              height: 115,
              objectFit: 'cover',
              translate: '-20%'
            }}
          />
        </Link>
      )
    },
    {
      //상품 이름
      accessorKey: 'product_name',
      header: '',
      cell: ({ row }) => (
        <div className="absolute left-[57%] text-label-strong text-base translate-x-[-57%] translate-y-[-250%]">
          {`${row.getValue('product_name')}`}
        </div>
      )
    },
    {
      //상품 가격
      accessorKey: 'product_price',
      header: '',
      cell: ({ row }) => {
        const price = row.getValue('product_price') as number;
        const count = row.getValue('count') as number;
        const discountRate = row.getValue('discountRate') as number;

        const discountAmount = price - (price * discountRate) / 100;
        const totalAmount = discountAmount * count;

        return (
          <div className="absolute left-[65%] translate-x-[-65%] translate-y-[-70%] text-lg text-primary-strong font-semibold">
            <div className="font-normal text-label-normal text-sm">
              {`${discountRate}%`}
              <span className="ml-1 inline-block text-base font-normal text-label-assistive line-through">
                {`${price.toLocaleString()}원`}
              </span>
            </div>
            {`${totalAmount.toLocaleString()}원`}
          </div>
        );
      }
    },
    {
      //수량 버튼
      accessorKey: 'count',
      header: '',
      cell: ({ row }) => (
        <div className="absolute left-[65%] translate-x-[-65%] translate-y-[35%] ">
          <CountButton
            product_id={row.getValue('product_id')}
            counts={row.getValue('count')}
            selectedItems={selectedItems}
          />
        </div>
      )
    },

    {
      accessorKey: 'product_id',
      header: '',
      cell: ({ row }) => (
        <div style={{ display: 'none' }}>{row.getValue('product_id')}</div>
      )
    },
    {
      accessorKey: 'discountRate',
      header: '',
      cell: ({ row }) => (
        <div style={{ visibility: 'hidden' }}>
          {row.getValue('discountRate')}
        </div>
      )
    },
    {
      //삭제 버튼
      id: 'delete',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => openAlert(row.getValue('product_id'))}
          className="translate-x-0 translate-y-[-150%]"
        >
          <CgClose className="text-[#959595] w-7 h-7" />
        </button>
      )
    }
  ];
  return (
    <>
      <div className="fixed z-50 top-[12%] translate-y-[12%] right-4">
        <DeleteButton
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <div className="relative">
        <DataTable
          columns={columns}
          data={cartData ?? []}
          selectedItems={selectedItems}
        />
      </div>
    </>
  );
};
