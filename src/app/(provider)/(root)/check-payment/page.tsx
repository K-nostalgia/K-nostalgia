import Loading from '@/components/common/Loading';
import { Suspense } from 'react';
import CheckPaymentContent from './_components/CheckPaymentContent';

const CheckPayment = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CheckPaymentContent />
    </Suspense>
  );
};

export default CheckPayment;
