'use client';
import Loading from '@/components/common/Loading';
import { imageSrc } from '@/hooks/payment/getProductImage';
import useGetPaymentHistory from '@/hooks/payment/useGetPaymentHistory';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

//TODO UI작업, 타입 지정
const CompletePayment = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  console.log(paymentId);

  const { payHistory, payHistoryIsPending } = useGetPaymentHistory({
    paymentId
  });
  console.log(payHistory);
  if (payHistoryIsPending || !payHistory) {
    return <Loading />;
  }
  const { paidAt, orderName, products, amount } = payHistory;
  const price: number = products.reduce(
    (acc: number, item: any) => acc + item.amount,
    0
  );

  return (
    <div>
      <Image
        src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/images/Tiger_congrats.png"
        width={282}
        height={175}
        alt=""
      />
      <h3>결제가 완료됐어요!</h3>
      <div>주문번호 {paymentId}</div>
      <div>결제일자 {paidAt}</div>
      <div>
        {/* 상품 이미지 */}
        <div>
          <div>
            {products.map((product: any) => {
              const { name, amount, quantity } = product;
              const src = imageSrc(name);
              return (
                <div>
                  <Image src={src} width={64} height={64} alt={name} />
                  {name},{amount},{quantity}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>총 상품금액</p> <p>{price}</p>
        </div>
        <div>
          <p>배송비</p> <p>2,500</p>
        </div>
        <div>
          <p>쿠폰 할인 금액</p> <p>-2,000</p>
        </div>
        <br />
        <div>
          <p>총 결제 금액</p>
          <p>{amount.total}</p>
        </div>
      </div>
      <div>
        <Link href="payment">
          <button className="w-[166px] h-[48px] px-[12px] py-16px border-[1px] border-[#9C6D2E]">
            주문 내역 보기
          </button>
        </Link>
        <button>계속 쇼핑하기</button>
      </div>
    </div>
  );
};

export default CompletePayment;
