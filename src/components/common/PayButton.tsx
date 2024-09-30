'use client';

import { useUser } from '@/hooks/useUser';
import PortOne from '@portone/browser-sdk/v2';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '../ui/use-toast';

type ProductProps = {
  id: string | null;
  name: string | null;
  amount: number;
  quantity: number;
}[];

type Props = {
  orderNameArr: string[];
  product: ProductProps;
  text: string; //버튼 텍스트
};

type ButtonStylesObj = {
  [key: string]: string;
};

const PayButton = ({ orderNameArr, product, text }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);

  const date = dayjs(new Date(Date.now())).locale('ko').format('YYMMDD');
  const newPaymentId = `${date}-${uuidv4().slice(0, 13)}`; //주문 번호

  const DELIVERY_CHARGE: number = 2500;
  const COUPON_DISCOUNT: number = 2000;
  const price: number = product.reduce((acc, item) => acc + item.amount, 0);

  const totalQuantity = product.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = price + DELIVERY_CHARGE - COUPON_DISCOUNT;

  const { data: user } = useUser();

  const [lastCallTime, setLastCallTime] = useState(0);
  const THROTTLE_DELAY = 5000;

  useEffect(() => {
    //결제 창 열려있을 때 PopStateEvent 제한
    const handlePopstate = (e: PopStateEvent) => {
      if (isPaymentOpen) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        toast({
          description: '결제창을 먼저 종료해주세요'
        });
      }
    };
    if (isPaymentOpen) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopstate);
    }
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [isPaymentOpen]);

  //결제 요청 함수(클릭핸들러)
  const onPayButtonClickThrottled = useCallback(async () => {
    if (!user) {
      return toast({
        description: '로그인 후 이용 가능합니다'
      });
    }
    if (product.length === 0) {
      return toast({
        description: '구매할 상품을 선택 해 주세요'
      });
    }

    const now = Date.now();

    if (now - lastCallTime >= THROTTLE_DELAY) {
      setLastCallTime(now);
      setIsPaymentOpen(true);
      window.history.pushState(null, '', window.location.href);

      toast({
        variant: 'destructive',
        description: '가결제입니다, 당일 자정 전 일괄 환불됩니다'
      });
      setTimeout(() => {
        toast({
          variant: 'destructive',
          description: '즉시 환불은 마이페이지에서 가능합니다'
        });
      }, 1500);
      const { name, email, id } = user;

      const requestOrderName = orderNameArr.join(',');

      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
        channelKey: process.env.NEXT_PUBLIC_INICIS_CHANNEL_KEY,
        paymentId: `${newPaymentId}`,
        orderName: requestOrderName,
        totalAmount,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        products: product as any,
        redirectUrl:
          process.env.NODE_ENV === 'production'
            ? `https://https://k-nostalgia-one.vercel.app/check-payment?totalQuantity=${totalQuantity}`
            : `http://localhost:3000/check-payment?totalQuantity=${totalQuantity}`,
        appScheme:
          process.env.NODE_ENV === 'production'
            ? `https://https://k-nostalgia-one.vercel.app/check-payment?totalQuantity=${totalQuantity}`
            : `http://localhost:3000/check-payment?totalQuantity=${totalQuantity}`,
        noticeUrls: [
          `https://https://k-nostalgia-one.vercel.app/api/payment/webhook`
        ],

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
        toast({
          variant: 'destructive',
          description: '결제에 실패했습니다 다시 시도해주세요'
        });
        setIsPaymentOpen(false);
        setLastCallTime(0);
        return router.replace(`${pathName}`);
      }
      setIsPaymentOpen(false);
      router.push(
        `/check-payment?paymentId=${paymentId}&totalQuantity=${totalQuantity}`
      );
    } else {
      toast({
        description: '결제 창 요청중입니다'
      });
    }
  }, [
    user,
    product,
    orderNameArr,
    totalQuantity,
    totalAmount,
    router,
    pathName,
    lastCallTime
  ]);

  const ButtonStylesObj: ButtonStylesObj = {
    '바로 구매하기':
      'min-w-[165px] flex bg-primary-strong py-3 px-4 rounded-xl text-white max-w-[234px] w-screen justify-center items-center leading-7',
    '선택 상품 주문하기':
      'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-[#9C6D2E] font-semibold leading-7 border-[1px] border-[#9C6D2E]',
    '전체 상품 주문하기':
      'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-white font-semibold leading-7 bg-[#9C6D2E]'
  };
  const buttonDisabled = product.length === 0;

  let PayButtonStyle = ButtonStylesObj[text];

  if (buttonDisabled) {
    switch (text) {
      case '바로 구매하기':
        PayButtonStyle =
          'min-w-[165px] max-w-[234px] w-screen flex justify-center items-center bg-stone-200 py-3 px-4 rounded-xl text-white leading-7';
        break;
      case '선택 상품 주문하기':
        PayButtonStyle =
          'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-stone-300 font-semibold leading-7 border-[1px] border-stone-300';
        break;
      case '전체 상품 주문하기':
        PayButtonStyle =
          'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-white font-semibold leading-7 bg-stone-200';
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <button
        className={PayButtonStyle}
        onClick={onPayButtonClickThrottled}
        disabled={buttonDisabled || isPaymentOpen}
      >
        {text}
      </button>
    </div>
  );
};

export default PayButton;
