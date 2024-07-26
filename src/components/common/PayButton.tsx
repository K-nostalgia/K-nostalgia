'use client';

import PortOne from '@portone/browser-sdk/v2';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const PayButton = () => {
  const router = useRouter();
  const pathName = usePathname();

  const date = dayjs(new Date(Date.now())).locale('ko').format('YYMMDD');
  const newPaymentId = `${date}-${uuidv4().slice(0, 13)}`;

  //TODO 로그인하지 않았을 경우 로그인 페이지로 유도
  const payRequest = async () => {
    const response = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
      channelKey: process.env.NEXT_PUBLIC_INICIS_CHANNEL_KEY,
      paymentId: `${newPaymentId}`,
      orderName: '옥천 복숭아, (배열 풀어서 문자로 넣기)',
      totalAmount: 1000,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      redirectUrl:
        process.env.NODE_ENV === 'production'
          ? // TODO 배포 후 배포 주소 url로 변경
            `https://your-app-name.vercel.app/check-payment?status=success&path_name=${pathName}`
          : `http://localhost:3000/check-payment?status=success&path_name=${pathName}`,
      appScheme:
        process.env.NODE_ENV === 'production'
          ? // TODO 배포 후 배포 주소 url로 변경
            `https://your-app-name.vercel.app/check-payment?status=success&path_name=${pathName}`
          : `http://localhost:3000/check-payment?status=success&path_name=${pathName}`,
      customer: {
        //user table에서 뽑아오기
        email: 'jonghoon7431@gmail.com',
        phoneNumber: '01000000000',
        fullName: '이종훈'
      },
      windowType: {
        pc: 'IFRAME',
        mobile: 'REDIRECTION'
      },
      bypass: {
        inicis_v2: {
          acceptmethod: [`SKIN(#586452)`]
        }
      }
    });

    const paymentId = response?.paymentId;
    console.log('response:', response);

    if (response?.code != null) {
      // 결제 과정에서 오류 발생시 처리
      router.push(`${pathName}`);

      return alert('결제에 실패했습니다. 다시 시도해주세요');
    }

    //즉시 환불
    const cancelResponse = await fetch('/api/payment/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paymentId })
    });

    if (!cancelResponse.ok) {
      alert('즉시 환불 실패. 당일 자정 전까지 일괄 환불됩니다.');
      throw new Error(`Cancellation failed: ${cancelResponse.statusText}`);
    }

    const cancelData = await cancelResponse.json();

    console.log('cancel:', cancelData);

    //결제 체크 페이지로 리다이렉션
    router.push(`/check-payment?paymentId=${paymentId}`);
  };

  //TODO 결제 완료 후 서버에 확인 요청 (금액대조) => 추후 구현
  // const notified = await fetch(`api/payment/complete`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   // paymentId와 주문 정보를 서버에 전달합니다
  //   body: JSON.stringify({
  //     paymentId: response.paymentId
  //     // 주문 정보...
  //   })
  // });
  // console.log(response);
  // };

  return (
    <div>
      <button
        className="bg-primary-heavy py-3 px-4 rounded-xl text-normal w-48"
        onClick={payRequest}
      >
        바로 구매하기
      </button>
    </div>
  );
};

export default PayButton;
