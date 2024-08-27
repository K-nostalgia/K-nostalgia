import PayHistory from '@/app/(root)/payment/_components/PayHistoryList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '향그리움-주문내역',
  description: '구매하신 특산품 주문 내역을 확인하실 수 있는 페이지입니다.'
};

const PaymentList = () => {
  return (
    <div>
      <PayHistory />
    </div>
  );
};

export default PaymentList;
