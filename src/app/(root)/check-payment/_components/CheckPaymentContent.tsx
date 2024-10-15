'use client';

//feat : 결제 확인 -> 내역 supabase 저장

//update : 24.09.30

import { toast } from '@/components/ui/use-toast';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';

const CheckPaymentContent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const code = searchParams.get('code');
  const totalQuantity = searchParams.get('totalQuantity');

  const [isPaymentHistoryLoaded, setIsPaymentHistoryLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    const handlePayment = async () => {
      if (code === 'FAILURE_TYPE_PG') {
        toast({
          variant: 'destructive',
          description: '결제 실패했습니다 잠시 후 다시 시도해주세요'
        });
        return router.replace(`/local-food`);
      }

      if (paymentId) {
        const postPaymentHistory = async () => {
          //결제 내역 조회
          const getPayHistory = await fetch(
            `/api/payment/transaction?paymentId=${paymentId}`
          );
          const payHistory = await getPayHistory.json();

          const {
            paidAt,
            status,
            orderName,
            amount,
            method,
            customer,
            products
            //TODO webhooks 정보 필요할지 확인 후 필요하면 추가
          } = payHistory;

          const newPaidAt = dayjs(paidAt) //결제 일시 형식 변경(dayjs)
            .locale('ko')
            .format('YYYY-MM-DD HH:MM');

          //status === 'PAID' : 결제 성공
          if (status === 'PAID') {
            setIsPaymentHistoryLoaded(true);
            toast({
              variant: 'destructive',
              description: '결제 완료되었습니다'
            });
          }

          //결제 내역 supabase 저장
          await fetch('/api/payment/pay-supabase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: uuidv4(),
              payment_date: newPaidAt,
              status,
              order_name: orderName,
              amount: totalQuantity,
              price: amount.total,
              user_id: customer.id,
              user_name: customer.name,
              payment_id: paymentId,
              pay_provider: method.provider
                ? method.provider
                : method.card.name,
              phone_number: customer.phoneNumber,
              products,
              user_email: customer.email
            })
          });

          router.replace(`complete-payment?paymentId=${paymentId}`);
        };
        postPaymentHistory();
      }
    };
    handlePayment();
  }, [code, paymentId, router, totalQuantity]);

  return (
    <div className="bg-normal">
      <div className="flex justify-center flex-col items-center text-label-assistive text-sm absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        <BeatLoader color="#A87939" />
        <p className="my-5">
          {isPaymentHistoryLoaded ? '' : '결제를 확인중입니다'}
        </p>
      </div>
    </div>
  );
};

export default CheckPaymentContent;
