'use client';

import { toast } from '@/components/ui/use-toast';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';

const CheckPaymentContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('paymentId');
  const code = searchParams.get('code');
  const totalQuantity = searchParams.get('totalQuantity');

  useEffect(() => {
    const handlePayment = async () => {
      if (code === 'FAILURE_TYPE_PG') {
        //TODO 해당 토스트 안 뜨고있음
        toast({
          variant: 'destructive',
          description: '결제가 취소되었습니다.'
        });
        return router.replace(`/local-food`);
      }
      if (paymentId) {
        try {
          const postPaymentHistory = async () => {
            // 환불
            const cancelResponse = await fetch('/api/payment/transaction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ paymentId })
            });
            // console.log(cancelResponse);
            if (!cancelResponse.ok) {
              toast({
                variant: 'destructive',
                description:
                  '마이페이지의 주문내역에서 환불이 되었는지 확인해주세요'
              });
              throw new Error(
                `Cancellation failed: ${cancelResponse.statusText}`
              );
            }
            //결제 내역 단건 조회
            const getResponse = await fetch(
              `/api/payment/transaction?paymentId=${paymentId}`
            );
            const getData = await getResponse.json();
            // console.log(getData);

            const {
              paidAt,
              status,
              orderName,
              amount,
              method,
              customer,
              products
            } = getData;
            const newPaidAt = dayjs(paidAt)
              .locale('ko')
              .format('YYYY-MM-DD HH:MM');

            if (status === 'PAID') {
              toast({
                variant: 'destructive',
                description: '마이페이지 > 주문내역에서 환불 재시도 해주세요.'
              });
            }

            if (status === 'FAILED') {
              toast({
                variant: 'destructive',
                description: '결제에 실패했습니다. 다시 시도해주세요.'
              });
              router.push(`/local-food`);
              return;
            }

            //supabase 결제 내역 저장
            await fetch('/api/payment/pay-supabase', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: uuidv4(),
                payment_date: newPaidAt,
                status,
                order_name: orderName,
                amount: totalQuantity,
                price: amount.total,
                user_id: customer.id,
                user_name: customer.name,
                payment_id: paymentId,
                pay_provider: method.provider
                  ? method.provider
                  : method.card.name,
                phone_number: customer.phoneNumber,
                products,
                user_email: customer.email
              })
            });

            toast({
              variant: 'destructive',
              description: '결제 완료.'
            });

            router.push(
              `complete-payment?paymentId=${paymentId}&totalQuantity=${totalQuantity}`
            );
          };
          postPaymentHistory();
        } catch (error) {
          console.error(error);
          toast({
            variant: 'destructive',
            description:
              '즉시 환불 처리가 안 된 것 같아요. 주문 내역 페이지에서 확인해주세요.'
          });
        }
      }
    };
    handlePayment();
  }, [code, paymentId, router, totalQuantity]);

  return (
    <div className="bg-normal">
      <div className="flex justify-center flex-col items-center text-label-assistive text-sm absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        <BeatLoader color="#A87939" />
        <p className="my-5">결제 확인중</p>
      </div>
    </div>
  );
};

export default CheckPaymentContent;
