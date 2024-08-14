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
import { useEffect } from 'react';
import { useDeleteProduct } from '@/hooks/localFood/useDeleteProduct';
import { CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { DeleteButton } from './DeleteButton';
import useDeviceSize from '@/hooks/useDeviceSize';
import { useGetProduct } from '@/hooks/localFood/useGetProduct';

export type CartItem = {
  id: string | null;
  product_id: string | null;
  image: string[] | null;
  product_price: number | 0;
  product_name: string | null;
  count: number | 0;
  discountRate: number | 0;
  description: string | null;
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
    discountRate: item.discountRate,
    description: item.description
  }));

  return mappedCartItems;
};

export const TableDataColumns = ({
  selectedItems,
  setSelectedItems
}: TableProps) => {
  const { cartData, isPending, error } = useUserCartData();
  const mutation = useDeleteProduct();
  const { isDesktop } = useDeviceSize();

  const handleDelete = (productId: string) => {
    mutation.mutate(productId);
  };

  const openAlert = (productId: string) => {
    Swal.fire({
      text: '상품을 삭제하시겠습니까?',
      showCancelButton: true,
      cancelButtonColor: '#E0DDD9',
      confirmButtonColor: '#9C6D2E',
      cancelButtonText: '취소하기',
      confirmButtonText: '삭제하기',
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
        <div className="flex items-center whitespace-nowrap md:relative md:top-[-70px] md:z-50 md:left-3">
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
          <div
            className={`text-base text-label-strong ml-2 md:ml-0 absolute left-10`}
          >
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
      accessorKey: 'description',
      header: '',
      cell: ({ row }) => (
        <div className="hidden">{row.getValue('description')}</div>
      )
    },
    {
      //상품 이미지
      accessorKey: 'image',
      header: () => <div className="max-w-[115px]"></div>,
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
              objectFit: 'cover'
            }}
            className="translate-x-[-12%] md:translate-x-0"
          />
        </Link>
      )
    },
    {
      //상품 이름
      accessorKey: 'product_name',
      header: () => (
        <div className="hidden md:block absolute top-4 left-14 text-left">
          상품정보
        </div>
      ),
      cell: ({ row }) => (
        <div className="absolute md:static md:translate-x-0 md:translate-y-0 md:text-left left-[57%] text-label-strong text-base translate-x-[-57%] translate-y-[-250%]">
          {`${row.getValue('product_name')}`}
          <p className="hidden md:block mt-1 text-sm text-label-assistive">{`${row.getValue(
            'description'
          )}`}</p>
        </div>
      )
    },

    {
      //수량 버튼
      accessorKey: 'count',
      header: () => <div className="hidden md:block">수량</div>,
      cell: ({ row }) => (
        <div className="absolute md:max-w-[84px] md:mx-auto md:static md:translate-x-0 md:translate-y-0 left-[65%] translate-x-[-65%] translate-y-[35%] ">
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
        <div className="hidden">{row.getValue('product_id')}</div>
      )
    },

    {
      //할인 전 금액
      accessorKey: 'discountRate',
      header: () => <div className="hidden md:block">할인 전 금액</div>,
      cell: ({ row }) => {
        const price = row.getValue('product_price') as number;

        return (
          <div className="invisible md:visible">
            {`${price.toLocaleString()}원`}
          </div>
        );
      }
    },
    {
      //상품 가격
      accessorKey: 'product_price',
      header: () => <div className="hidden md:block">주문금액</div>,
      cell: ({ row }) => {
        const price = row.getValue('product_price') as number;
        const count = row.getValue('count') as number;
        const discountRate = row.getValue('discountRate') as number;

        const discountAmount = price - (price * discountRate) / 100;
        const totalAmount = discountAmount * count;

        return (
          <div className="absolute md:static md:translate-x-0 md:translate-y-0 left-[65%] translate-x-[-65%] translate-y-[-70%] text-lg text-primary-strong font-semibold">
            <div className="font-normal text-label-normal text-sm md:hidden">
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
      //삭제 버튼
      id: 'delete',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => openAlert(row.getValue('product_id'))}
          className="translate-x-0 translate-y-[-150%] md:translate-y-0"
        >
          <CgClose className="text-[#959595] w-7 h-7" />
        </button>
      )
    }
  ];
  return (
    <div
      className={`max-w-screen-xl mx-auto ${
        isDesktop && 'text-center relative'
      }`}
    >
      <h1
        className={`${
          isDesktop &&
          'inline-flex relative mb-10 mt-20 text-primary-10 px-4 py-3 border border-r-0 border-l-0 border-t-primary-20 border-b-primary-20'
        }`}
      >
        <Image
          src={'/image/Tiger_Cart.png'}
          width={93}
          height={47}
          alt="호랑이"
          className="absolute top-[-79%] right-[-30%]"
        />
        장바구니
      </h1>

      <div className="relative">
        <div
          className={`${
            isDesktop && 'absolute top-[-5%] translate-y-[5%]'
          } fixed z-50 top-[12%] translate-y-[12%] right-4`}
        >
          <DeleteButton
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
        <DataTable
          columns={columns}
          data={cartData ?? []}
          selectedItems={selectedItems}
        />
      </div>
    </div>
  );
};
