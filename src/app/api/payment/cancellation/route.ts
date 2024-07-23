import { NextRequest, NextResponse } from "next/server";

export const POST =async(request: NextRequest)=>{
  //추가 에러처리 필요
  try {
    const {paymentId} = await request.json();
  
    const response : any = await fetch(`https://api.portone.io/payments/${paymentId}/cancel`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        Authorization:`PortOne ${process.env.PORTONE_API_KEY}`
      },
      body: JSON.stringify({
        storeId: process.env.NEXT_PUBLIC_STORE_ID,
        reason: "테스트 결제입니다. 즉시 환불 처리 됩니다."
      })
  })

  const data = await response.json()
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }

}