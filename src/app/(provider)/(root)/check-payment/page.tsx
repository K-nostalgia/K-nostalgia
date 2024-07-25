'use client';

import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

const CheckPayment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('paymentId');
  const pathName = searchParams.get('path_name');
  const code = searchParams.get('code');

  const [hasUpdated, setHasUpdated] = useState<boolean>(false);

  if (code === 'FAILURE_TYPE_PG') {
    //TODO alert 2번씩 뜸 .. ㅎ ㅏ ,,,,,,,,,,,,
    alert('결제 취소되었습니다.');
    router.push(`${pathName}`);
    return;
  } else {
    const postPaymentHistory = async () => {
      //결제 내역 단건 조회
      const getResponse = await fetch(
        `/api/payment/transaction?paymentId=${paymentId}`
      );
      const getData = await getResponse.json();

      const { paidAt, status, orderName, amount, method, customer } = getData;
      const newPaidAt = dayjs(paidAt).locale('ko').format('YYYY-MM-DD HH:MM');

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
          amount: 0,
          price: amount.total,
          //user_id만 users 테이블이랑 연결
          user_id: 'a8424195-b959-411e-b00e-f89c25eccf4f',
          user_name: customer.name,
          payment_id: paymentId,
          pay_provider: method.provider,
          phone_number: customer.phoneNumber
        })
      });

      return alert('결제 완료');
    };

    useEffect(() => {
      if (paymentId && !hasUpdated) {
        postPaymentHistory();
        setHasUpdated(true);
      }
    }, []);

    router.push(`complete-payment`);
  }

  return (
    <div className="bg-normal">
      <div className="flex justify-center flex-col items-center text-label-assistive text-sm absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        <BeatLoader color="#A87939" />
        <p className="my-5">결제 확인중</p>
      </div>
    </div>
  );
};

export default CheckPayment;
