'use client';

import Loading from '@/components/common/Loading';
import { useGetPaymentHistoryWithSupabase } from '@/hooks/payment/useGetPaymentHistory';
import { useUser } from '@/hooks/useUser';
import {
  BaseOrderInPayHistory,
  OrderListInPayHistory
} from '@/types/payHistory';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import NoPayHistory from './NoPayHistory';
import PayHistoryItem from './PayHistoryItem';
import TopIconInDesktop from './TopIconInDesktop';

const PayHistoryList = () => {
  const pathName = usePathname();
  const { data: user } = useUser();

  const userId = user?.id;

  const {
    payHistoryList,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetPaymentHistoryWithSupabase(userId);

  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!payHistoryList || isPending) {
    return <Loading />;
  }

  //날짜가 key 값, value가 배열인 객체로 변환
  const orderList = payHistoryList.reduce<OrderListInPayHistory>(
    (acc, order: BaseOrderInPayHistory) => {
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
          {isFetchingNextPage ? <Loading /> : hasNextPage && <div ref={ref} />}
        </div>
      )}
    </>
  );
};

export default PayHistoryList;
