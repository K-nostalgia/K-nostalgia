
// TODO 추후 구현 = 지불된 금액과 상품 금액 비교.
// export const POST = async(  req: NextApiRequest,  res: NextApiResponse)=>{

// try {
  // 요청의 body로 SDK의 응답 중 txId와 paymentId가 오기를 기대합니다.
//   const {txId, paymentId} = req.body;

//   // 1. PortOne API Key를 통해 AccessToken을 가져옵니다.
//   const portOneAPI = await initializePortOneAPI(
//     process.env.PORTONE_API_KEY || '', // 포트원 API Key
//   );

//   // 2. 포트원 결제내역 단건조회 API 호출
//   const paymentResponse = await portOneAPI.getPaymentDetails({
//     payment_id: paymentId,
//   });
//   const {payment} = paymentResponse;
//   const {id, transactions} = payment;

//   // 대표 트랜잭션(승인된 트랜잭션)을 선택합니다.
//   const transaction = transactions.find((tx: any) => tx.is_primary === true);
//   if (!transaction) throw 'no transaction';

//   //TODO 3. 가맹점 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.=>
//   //SUPABASE 테이블에 ORDER 테이블 만들기, 상품 정보 넣어두기
//   //테이블에서 가격 대조 후 맞으면 진행

//   const order = await FakeORM.OrderService.findById(id);
//   if (order && order.amount === transaction.amount.total) {
//     switch (transaction.status) {
//       case 'VIRTUAL_ACCOUNT_ISSUED': {
//         // const {virtual_account} = transaction.payment_method_detail;
//         // 가상 계좌가 발급된 상태입니다.
//         // 계좌 정보(virtual_account)를 이용해 원하는 로직을 구성하세요.
//         console.log('가상 계좌');
//         break;
//       }
//       case 'PAID': {
//         // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
//         console.log('paid');
//         break;
//       }
//     }
//     res.status(200).send('ok');
//   } else {
//     // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
//     res.status(400).send('warning: diff');
//   }
// } catch (e: any) {
//   // 결제 검증에 실패했습니다.
//   console.error('fail', e.message, e.response.data);
//   res.status(400).send(e);
// }
// }