'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

const CheckPayment = () => {
  //결제 여부 확인(모바일 환경에서만 사용. 결제 후 리다이렉트 될 페이지)

  //   const searchParams = useSearchParams();
  //   const router = useRouter();
  //   const protocol = window.location.protocol;
  //   const host = window.location.host;
  //   const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   const status = searchParams.get('status');
  //   const paymentId = searchParams.get('paymentId');
  //   const pathName = searchParams.get('path_name');

  //   // TODO 모바일에서 결제 취소했을때

  //   if (status === 'success') {
  //     alert('Payment successful');
  //     // 여기에 결제 성공 후 처리 로직 추가

  //     //내역 단건 조회
  //     const getPaymentResult = async () => {
  //       const getResponse = await fetch(
  //         `/api/payment/pay-history?paymentId=${paymentId}`
  //       );
  //       const getData = await getResponse.json();

  //       console.log('history', getData);
  //       setData(getData);
  //       console.log(data);

  //TODO ***************에바
  //2. `/${pathName}` <= 이게 왜 http://cart/ 로 이동되는지 ?
  //  - origin도 따로 빼와서 같이 넣어줘야할 듯
  //       if (data.status === 'FAILED') {
  //         // console.error('No paymentId found');
  //         // router.push(`/${pathName}`);
  //         // return;
  //       }

  //       return () => {
  //         setData(null);
  //       };
  //     };
  //     // getPaymentResult();
  //   }
  // }, []);

  // if (!data) {
  //   return <Loading />;
  // }
  return <div>CheckPayment</div>;
};

export default CheckPayment;
