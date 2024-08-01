'use client';

import Loading from '@/components/common/Loading';
import { toast } from '@/components/ui/use-toast';
import { usePaymentCancellation } from '@/hooks/payment/canclePayWithDbUpdate';
import { imageSrc } from '@/hooks/payment/getProductImage';
import { useGetPaymentHistoryWithSupabase } from '@/hooks/payment/useGetPaymentHistory';
import api from '@/service/service';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';

const PayHistoryList = () => {
  const { data: users } = useQuery<Tables<'users'>, Error, Tables<'users'>>({
    queryKey: ['users'],
    queryFn: () => api.auth.getUser()
  });

  const userId = users?.id;

  const { payHistoryList } = useGetPaymentHistoryWithSupabase(userId);
  const cancelPaymentMutation = usePaymentCancellation();
  if (!payHistoryList) {
    return <Loading />;
  }

  const ordersList = payHistoryList.reduce((acc: any, order: any) => {
    const date = dayjs(order.payment_date).format('YYYY. MM. DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});
  const sortedDates = Object.keys(ordersList).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  //취소 및 db 업데이트
  const cancelPayment = async (order: any) => {
    const { status, payment_id, ...rest } = order;
    const newHistory = {
      status: 'CANCELLED',
      payment_id,
      ...rest
    };
    try {
      await cancelPaymentMutation.mutateAsync({ payment_id, newHistory });
    } catch (error) {
      console.error('주문 취소 중 오류 발생:', error);
    }
  };

  return (
    <div className="p-[16px] border-t-4 border-[#F2F2F2] mb-[70px]">
      {sortedDates.map((date) => (
        <div key={date}>
          <div className="flex gap-[8px] ml-[4px]">
            <p className="font-medium">{date}</p>
            <p className="font-medium">주문</p>
          </div>

          {ordersList[date].map((order: any) => (
            <div
              key={order.id}
              className="border rounded-[12px] p-[16px] mt-[8px] mb-[16px]"
            >
              <div className="flex gap-[4px]">
                <p className="font-medium">
                  {order.status === 'CANCELLED' ? '주문취소완료' : '상품준비중'}
                </p>
                <p className="text-[#AFAFAF]">·</p>
                <div className="flex">
                  {order.status === 'PAID' && (
                    <p className="text-[#9C6D2E] font-normal">
                      {dayjs(order.payment_date)
                        .locale('ko')
                        .format('MM/DD (ddd)')}{' '}
                      도착
                    </p>
                  )}
                </div>
              </div>

              {order.products.map((product: any, index: number) => (
                <div key={product.id}>
                  <div
                    className={`flex gap-[12px] pt-[12px] ${
                      index !== order.products.length - 1
                        ? 'border-b-2 pb-[12px]'
                        : ''
                    }`}
                  >
                    <Image
                      src={imageSrc(product.name)}
                      width={64}
                      height={64}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 8
                      }}
                      alt={product.name}
                    />

                    <div className="flex flex-col justify-center gap-[8px]">
                      <p className="font-medium text-[16px]">{product.name}</p>
                      <div className="flex text-[#79746D] gap-[4px]">
                        <p>{product.amount.toLocaleString()}원</p>
                        <p>·</p>
                        <p>{product.quantity}개</p>
                      </div>
                    </div>
                    {index !== order.products.length - 1 && <hr />}
                  </div>
                </div>
              ))}
              <div
                className={`flex gap-[7px] text-[14px] font-semibold pt-[12px] ${
                  order.status !== 'CANCELLED' ? 'flex' : 'hidden'
                }`}
              >
                <button
                  className="py-[10px] px-[16px] border-[1px] border-[#AFAFAF] text-[#79746D] w-[152px] h-[40px] rounded-[10px]"
                  onClick={() => cancelPayment(order)}
                >
                  주문취소
                </button>
                <button
                  className="py-[10px] px-[16px] border-[1px] border-[#9C6D2E] text-[#9C6D2E] w-[152px] h-[40px] rounded-[10px]"
                  onClick={() => {
                    toast({
                      variant: 'destructive',
                      description: '서비스 준비 중이에요.'
                    });
                  }}
                >
                  배송조회
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PayHistoryList;
