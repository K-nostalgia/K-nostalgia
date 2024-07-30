'use client';

import api from '@/service/service';
import { Tables } from '@/types/supabase';
import PortOne from '@portone/browser-sdk/v2';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export type Products = {
  name: string | null;
  amount: number;
  quantity: number;
  id?: string;
}[];

type Props = {
  orderNameArr: (string | null)[];
  product: Products;
};

const PayButton = ({ orderNameArr, product }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const requestOrderName = orderNameArr.join(',');
  const products = product.map((prev) => ({ ...prev, id: uuidv4() }));

  const date = dayjs(new Date(Date.now())).locale('ko').format('YYMMDD');
  const newPaymentId = `${date}-${uuidv4().slice(0, 13)}`;

  const deliveryCharge: number = 2500;
  const discount: number = 2000;
  const price: number = products.reduce(
    (acc, item) => acc + item.amount * item.quantity,
    0
  );
  const totalQuantity = product.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = price + deliveryCharge - discount;

  const { data: users, isPending: usersIsPending } = useQuery<
    Tables<'users'>,
    Error,
    Tables<'users'>
  >({
    queryKey: ['users'],
    queryFn: () => api.auth.getUser()
  });

  const payRequest = async () => {
    if (!users) {
      return alert('로그인 후 이용 가능합니다');
    }
    const { name, email, id } = users;

    const response = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
      channelKey: process.env.NEXT_PUBLIC_INICIS_CHANNEL_KEY,
      paymentId: `${newPaymentId}`,
      orderName: requestOrderName,
      totalAmount,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      products: products as any,
      redirectUrl:
        process.env.NODE_ENV === 'production'
          ? // TODO 배포 후 배포 주소 url로 변경
            ''
          : // `https://your-app-name.vercel.app/check-payment?status=success&path_name=${pathName}`
            `http://localhost:3000/check-payment?status=success&path_name=${pathName}`,
      appScheme:
        process.env.NODE_ENV === 'production'
          ? // TODO 배포 후 배포 주소 url로 변경
            // `https://your-app-name.vercel.app/check-payment?status=success&path_name=${pathName}`
            ''
          : `http://localhost:3000/check-payment?status=success&path_name=${pathName}`,
      customer: {
        customerId: id,
        email: email as string,
        phoneNumber: '01000000000',
        fullName: name as string
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

    if (response?.code != null) {
      // 결제 과정에서 오류 발생시 처리
      router.push(`${pathName}`);
      console.log(response);

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
    console.log(cancelResponse);
    if (!cancelResponse.ok) {
      alert('즉시 환불 실패. 당일 자정 전까지 일괄 환불됩니다.');
      throw new Error(`Cancellation failed: ${cancelResponse.statusText}`);
    }

    const { error: cancelError } = await cancelResponse.json();
    //TODO 환불 에러시 조치 추가
    console.log(cancelError);

    router.push(
      `/check-payment?paymentId=${paymentId}&totalQuantity=${totalQuantity}`
    );
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
        onClick={payRequest}
        className="bg-primary-strong py-3 px-4 rounded-xl text-white w-full text-center text-base leading-7"
      >
        바로 구매하기
      </button>
    </div>
  );
};

export default PayButton;
