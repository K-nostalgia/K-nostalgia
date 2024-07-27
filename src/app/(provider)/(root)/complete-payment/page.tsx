'use client';
import Loading from '@/components/common/Loading';
import useGetPaymentHistory from '@/hooks/useGetPaymentHistory';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CompletePayment = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  console.log(paymentId);

  const { payHistory, payHistoryIsPending } = useGetPaymentHistory({
    paymentId
  });
  //TODO 상품 이미지 넣을 방법....
  //supabase 버킷에서 빼오기?
  console.log(payHistory);
  if (payHistoryIsPending || !payHistory) {
    return <Loading />;
  }
  const { paidAt, orderName, products } = payHistory;

  // const buttonStyle
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
          <div>{orderName}</div>
          <div>
            {products[0].amount} {products[0].quantity}
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>총 상품금액</p> <p>{}</p>
        </div>
        <div>
          <p>배송비</p> <p>2,500</p>
        </div>
        <div>
          <p>상품 할인 금액</p> <p>-2,000</p>
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
