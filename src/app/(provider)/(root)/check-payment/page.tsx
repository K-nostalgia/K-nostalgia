'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

const CheckPayment = () => {
  //결제 여부 확인(결제 후 리다이렉트 될 페이지)
  //status 확인 => 결제 성공시 supabase에 저장 후 complete-payment 페이지로 이동
  //결제 실패시 이 전 페이지로 이동

  const searchParams = useSearchParams();
  const router = useRouter();
  //   const protocol = window.location.protocol;
  //   const host = window.location.host;
  // const [data, setData] = useState<any>([]);

  const insertPaymentHistory = async () => {
    //supabase에 주문내역 저장 로직
  };

  useEffect(() => {
    const status = searchParams.get('status');
    const paymentId = searchParams.get('paymentId');
    const pathName = searchParams.get('path_name');
    const code = searchParams.get('code');

    // 모바일에서 결제 취소 (혹은 실패?)
    if (code === 'FAILURE_TYPE_PG') {
      //TODO alert 2번씩 뜸 .. ㅎ ㅏ ,,,,,,,,,,,,
      alert('결제 취소되었습니다.');
      router.push(`${pathName}`);
      return;
    } else {
      alert('Payment successful');
      // 여기에 결제 성공 후 처리 로직 추가

      //TODO 내역 단건 조회 => SUPABASE에 주문내역 저장.
      const getPaymentResult = async () => {
        const getResponse = await fetch(
          `/api/payment/transaction?paymentId=${paymentId}`
        );
        const getData = await getResponse.json();

        console.log('history', getData);
      };
      getPaymentResult();
      // router.push(`complete-payment`);
    }

    return () => {
      //페이지 빠져나갈 때 초기화 할 거 있으면 여기에
    };
  }, []);

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
