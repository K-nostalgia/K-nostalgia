'use client';
import useGetPaymentHistory from '@/hooks/useGetPaymentHistory';
import { useSearchParams } from 'next/navigation';

const CompletePayment = () => {
  //TODO 결제 내역 조회 쿼리로 캐싱
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  console.log(paymentId);

  const { payHistory, payHistoryIsPending } = useGetPaymentHistory({
    paymentId
  });
  //TODO PAYMENT_NOT_FOUND. 왜??
  console.log(payHistory);
  const {} = payHistory;
  return (
    <div>
      주문번호 {paymentId},{}
    </div>
  );
};

export default CompletePayment;
