'use client';

import Loading from '@/components/common/Loading';
import { useGetPaymentHistoryWithSupabase } from '@/hooks/payment/useGetPaymentHistory';
import api from '@/service/service';
import { OrderListInPayHistory } from '@/types/payHistory';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { usePathname } from 'next/navigation';
import NoPayHistory from './NoPayHistory';
import PayHistoryItem from './PayHistoryItem';
import TopIconInDesktop from './TopIconInDesktop';

const PayHistoryList = () => {
  const pathName = usePathname();

  const { data: users } = useQuery<Tables<'users'>, Error, Tables<'users'>>({
    queryKey: ['users'],
    queryFn: () => api.auth.getUser()
  });

  const userId = users?.id;

  const { payHistoryList } = useGetPaymentHistoryWithSupabase(userId);

  if (!payHistoryList) {
    return <Loading />;
  }

  const orderList = payHistoryList.reduce<OrderListInPayHistory>(
    (acc, order: any) => {
      const date = dayjs(order.payment_date).format('YYYY. MM. DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    },
    {}
  );
  const sortedDates = Object.keys(orderList).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  const datesToRender =
    pathName === '/my-page' ? [sortedDates[0]] : sortedDates;

  return (
    <>
      {Object.keys(orderList).length === 0 ? (
        <NoPayHistory />
      ) : (
        <div
          className={`min-w-[375px] mb-[80px] mx-auto bg-normal max-w-[737px] md:w-full md:p-0 overflow-y-auto  ${
            pathName === '/payment' && 'pt-[16px] mt-[3.25rem]'
          }`}
        >
          <TopIconInDesktop />
          {datesToRender.map((date) => (
            <div
              key={date}
              className={`${pathName === '/payment' && 'pt-4 md:pt-7 md:pb-9'}`}
            >
              <div className="flex gap-[8px] ml-[4px] px-[16px] md:p-0 md:text-[18px]">
                <p className="font-medium">{date}</p>
                <p className="font-medium">주문</p>
              </div>
              <PayHistoryItem orderList={orderList} date={date} />
              <hr className="border-2 border-[#F2F2F2]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PayHistoryList;
