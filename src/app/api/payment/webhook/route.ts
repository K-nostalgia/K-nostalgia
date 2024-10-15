//webhook api(포트원)

//해당 파일 위치가 webhook url 입니다

//feat1) 환불 시, supabase 'orderd_list' 테이블의 status 항목 업데이트
// - 사업자 등록 안 된 가결제라 자정 전 일괄 환불됨
// - 해당 환불 로직 추적 및 db 업데이트 위해 필요

//TODO feat2) 환불 시, 쿠폰을 사용한 결제일 경우 사용한(삭제된) 쿠폰 살리기

//update: 24.8.8

import supabase from "@/utils/supabase/client";
import { NextRequest } from "next/server";

type WebhookRes = {
  type: string;
  timestamp: string;
  data:{
    transactionId: string;
    paymentId: string;
    cancellationId: string;
  }
}
export const POST = async (request: NextRequest) => {
  try {
    const response : WebhookRes = await request.json();

    const paymentId = response.data.paymentId

    if(response.type === 'Transaction.Cancelled'){
      const {error} = await supabase
      .from('orderd_list')
      .update({status:'CANCELLED'})
      .eq('payment_id',paymentId)

      if(error){
        console.error('update error:',error)
      }
    }

    return new Response(JSON.stringify({ message: 'success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('webhook error:', error);
    return new Response(JSON.stringify({ message: 'error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};