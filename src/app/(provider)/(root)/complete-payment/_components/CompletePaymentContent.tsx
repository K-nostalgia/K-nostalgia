'use client';

import Loading from '@/components/common/Loading';
import { imageSrc } from '@/hooks/payment/getProductImage';
import useGetPaymentHistory from '@/hooks/payment/useGetPaymentHistory';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const CompletePaymentContent = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');

  const { payHistory, payHistoryIsPending } = useGetPaymentHistory({
    paymentId
  });
  console.log(payHistory);
  if (payHistoryIsPending || !payHistory) {
    return <Loading />;
  }
  const { paidAt, products, amount } = payHistory;
  const price = products?.reduce(
    (acc: number, item: any) => acc + item.amount,
    0
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-normal">
        <div className="w-full m-auto mb-[104px]">
          <div>
            <div className="flex flex-col items-center px-[46.5px] pb-[15px] pt-[8px]">
              <Image
                src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/images/Tiger_congrats.png"
                alt="결제 완료 이미지"
                width={300}
                height={300}
                style={{
                  width: '282',
                  height: '175'
                }}
                priority
              />
              <p className="text-[20px] text-[#9C6D2E] font-medium leading-7">
                결제가 완료됐어요!
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[8px] p-[16px] leading-[160%]">
            <div className="flex flex-row justify-between">
              <p className="text-[#79746D] font-medium">주문번호</p>
              <p className="font-semibold text-[#1F1E1E]">{paymentId}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[#79746D] font-medium">결제일자</p>
              <p className="font-semibold text-[#1F1E1E]">
                {dayjs(paidAt).locale('ko').format('YYYY. MM. DD HH:MM')}
              </p>
            </div>
          </div>

          <div className="border-t-4 border-[#F2F2F2] pt-[20px] pb-[16px]">
            <div className="flex flex-col gap-[16px]">
              {products?.map((product: any) => {
                const { id, name, amount, quantity } = product;
                const src = imageSrc(name);
                return (
                  <div
                    key={id}
                    className="flex gap-[12px] border-b-2 border-[#F2F2F2] pb-[16px] px-[16px]"
                  >
                    <Image
                      src={src}
                      width={64}
                      height={64}
                      alt={name}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                    <div className="flex flex-col justify-center gap-[8px]">
                      <p className="text-[16px] font-medium">{name}</p>
                      <div className="flex flex-row gap-[4px] text-[#79746D]">
                        <p>{amount.toLocaleString('ko-KR')}원</p>
                        <p>·</p>
                        <p>{quantity}개</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-[16px] flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <p className="font-normal">총 상품금액</p>
              <p className="font-semibold">{price?.toLocaleString('ko-KR')}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-normal">배송비</p>
              <p className="font-semibold">2,500원</p>
            </div>
            <div className="flex justify-between">
              <p className="font-normal">쿠폰 할인 금액</p>
              <p className="font-semibold">-2,000원</p>
            </div>
          </div>
          <div className="flex justify-between px-[16px] pt-[16px] pb-[32px] mt-[16px] border-t-2 border-[#F2F2F2]">
            <p className="font-semibold text-[18px]">총 결제 금액</p>
            <p className="font-semibold text-[20px]">
              {amount.total.toLocaleString('ko-KR')}원
            </p>
          </div>
        </div>
        <div className="font-semibold flex mb-[16px] gap-[12px] fixed bottom-0 bg-[#FAF8F5] py-[12px] shadow-[rgba(31,30,30,0.08)_0px_-2px_8px_0px] w-screen justify-center">
          <Link href="payment">
            <button className="w-[166px] h-[48px] px-[12px] py-16px border-[1px] border-[#9C6D2E] text-[#9C6D2E] rounded-[12px]">
              주문 내역 보기
            </button>
          </Link>
          <Link href={'/local-food'}>
            <button className="bg-[#9C6D2E] text-white w-[166px] h-[48px] px-[12px] rounded-[12px]">
              계속 쇼핑하기
            </button>
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default CompletePaymentContent;
