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
    console.log(response);

    const paymentId = response.data.paymentId

    if(response.type === 'Transaction.Cancelled'){
      const {data, error} = await supabase
      .from('orderd_list')
      .update({status:'CANCELLED'})
      .eq('payment_id',paymentId)

      console.log(data)
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