'use client';

import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';

const CheckPayment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('paymentId');
  const pathName = searchParams.get('path_name');
  const code = searchParams.get('code');
  const totalQuantity = searchParams.get('totalQuantity');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePayment = async () => {
      if (code === 'FAILURE_TYPE_PG') {
        alert('결제 취소되었습니다.');
        router.push(`${pathName}`);
        return;
      }
      if (paymentId) {
        try {
          const postPaymentHistory = async () => {
            //결제 내역 단건 조회
            const getResponse = await fetch(
              `/api/payment/transaction?paymentId=${paymentId}`
            );
            const getData = await getResponse.json();
            console.log(getData);

            const {
              paidAt,
              status,
              orderName,
              amount,
              method,
              customer,
              products
            } = getData;
            const newPaidAt = dayjs(paidAt)
              .locale('ko')
              .format('YYYY-MM-DD HH:MM');

            //supabase 결제 내역 저장
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
                pay_provider: method.provider,
                phone_number: customer.phoneNumber,
                products
              })
            });
          };

          await postPaymentHistory();
          alert('결제 완료');
          router.push(
            `complete-payment?paymentId=${paymentId}&totalQuantity=${totalQuantity}`
          );
        } catch (error) {
          console.error(error);
          alert('결제 처리중 오류 발생');
        }
      }
      setIsLoading(false);
    };
    handlePayment();
  }, [paymentId, router, pathName, code, totalQuantity]);

  if (isLoading) {
    return (
      <Suspense>
        <div className="bg-normal">
          <div className="flex justify-center flex-col items-center text-label-assistive text-sm absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
            <BeatLoader color="#A87939" />
            <p className="my-5">결제 확인중</p>
          </div>
        </div>
      </Suspense>
    );
  }
  return null;
};

export default CheckPayment;
