'use client';

import Loading from '@/components/common/Loading';
import { imageSrc } from '@/hooks/payment/getProductImage';
import { useGetPaymentHistoryWithSupabase } from '@/hooks/payment/useGetPaymentHistory';
import api from '@/service/service';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';

const PayHistoryList = () => {
  const { data: users } = useQuery<Tables<'users'>, Error, Tables<'users'>>({
    queryKey: ['users'],
    queryFn: () => api.auth.getUser()
  });

  const userId = users?.id;

  const { payHistoryList } = useGetPaymentHistoryWithSupabase(userId);

  if (!payHistoryList) {
    return <Loading />;
  }

  const ordersList = payHistoryList.reduce((acc: any, order: any) => {
    const date = dayjs(order.payment_date).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});
  const sortedDates = Object.keys(ordersList).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  console.log(ordersList);
  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date} className="">
          <div className="flex gap-[8px]">
            <p className="font-medium">{date}</p>
            <p className="font-medium">주문</p>
          </div>

          {ordersList[date].map((order: any) => (
            <div key={order.id} className="border p-4 mb-2 rounded">
              <p className="font-medium">
                {order.status === 'CANCELLED' ? '주문취소완료' : '상품준비중'}
              </p>
              {order.products.map((product: any) => (
                <div key={product.id} className="flex">
                  <Image
                    src={imageSrc(product.name)}
                    width={64}
                    height={64}
                    style={{
                      width: 64,
                      height: 64
                    }}
                    alt={product.name}
                  />
                  <div className="flex flex-col">
                    <p>{product.name}</p>
                    <div className="flex">
                      <p>{product.amount}원</p>
                      <p>·</p>
                      <p>{product.quantity}개</p>
                    </div>
                  </div>
                </div>
              ))}
              <div
                //TODO 버튼 임의로 띄워두고 스타일 지정
                className={`flex gap-[20px] ${
                  order.status === 'CANCELLED' ? 'hidden' : 'flex'
                }`}
              >
                <button>주문취소</button>
                <button>배송조회</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PayHistoryList;
