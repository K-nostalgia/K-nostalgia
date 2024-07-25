'use client';

import PortOne from '@portone/browser-sdk/v2';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const PayButton = () => {
  const router = useRouter();
  const pathName = usePathname();

  //${protocol}//${host}${pathName}

  //TODO 로그인하지 않았을 경우 로그인 페이지로 유도
  const payRequest = async () => {
    const response = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
      channelKey: process.env.NEXT_PUBLIC_INICIS_CHANNEL_KEY,
      //TODO 주문 번호 변경 (텍스트-숫자 형식)
      paymentId: `${uuidv4()}`,
      orderName: '어쩌구 복숭아',
      totalAmount: 1000,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      redirectUrl:
        process.env.NODE_ENV === 'production'
          ? // TODO 배포 후 배포 주소 url로 변경
            //encodeURIComponent : 문자 인코딩 메서드
            `https://your-app-name.vercel.app/payment?status=success&path_name=${pathName}`
          : `http://localhost:3000/payment?status=success&path_name=${pathName}`,
      appScheme:
        process.env.NODE_ENV === 'production'
          ? // TODO 배포 후 배포 주소 url로 변경
            //encodeURIComponent : 문자 인코딩 메서드
            `https://your-app-name.vercel.app/payment?status=success&path_name=${pathName}`
          : `http://localhost:3000/payment?status=success&path_name=${pathName}`,

      //TODO products object[] 항목 추가?
      customer: {
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
      router.push('/pathName');
      return alert(response?.message);
    }

    //즉시 환불
    const cancelResponse = await fetch('/api/payment/cancellation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paymentId })
    });

    if (!cancelResponse.ok) {
      throw new Error(`Cancellation failed: ${cancelResponse.statusText}`);
    }

    const cancelData = await cancelResponse.json();

    console.log('cancel:', cancelData);

    //TODO 값 DB에 저장

    //결제 완료 페이지로 리다이렉션
    router.push('/payment');
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

  //TODO 결제 단건 조회 후, DB에 추가
  //1. 필요한 정보 뽑기
  //2. supabase 업데이트 방법 생각(useState로 담아서 한번에 ? )

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
