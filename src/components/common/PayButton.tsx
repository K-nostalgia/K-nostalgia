'use client';

import PortOne from '@portone/browser-sdk/v2';
import { v4 as uuidv4 } from 'uuid';

const PayButton = () => {
  //TODO 로그인하지 않았을 경우 로그인 페이지로 유도
  const payRequest = async () => {
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
      // 채널 키 설정
      channelKey: process.env.NEXT_PUBLIC_INICIS_CHANNEL_KEY,
      paymentId: `${uuidv4()}`,
      orderName: '어쩌구 복숭아',
      totalAmount: 1000,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      //TODO products object[] 항목 추가?
      customer: {
        email: 'jonghoon7431@gmail.com',
        phoneNumber: '01000000000',
        fullName: '이종훈'
      },
      windowType: {
        pc: 'IFRAME',
        //TODO 모바일 환경에서 REDIRECTION이 어떻게 적용되는지 추후 확인
        //TODO redirectUrl 항목 추가
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

    if (!response || response.code != null) {
      // 결제 과정에서 오류 발생시 처리
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
  return (
    <div>
      <button onClick={payRequest}>결제하기</button>
    </div>
  );
};

export default PayButton;
