import { NextRequest, NextResponse } from "next/server";

export const GET =async(request: NextRequest)=>{
  try {
    const url = new URL(request.url)
    const paymentId = url.searchParams.get('paymentId')
    const response = await fetch(`https://api.portone.io/payments/${paymentId}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization:`PortOne ${process.env.PORTONE_API_KEY}`
      },
    })
    const data = await response.json()
  return  NextResponse.json(data)

  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }

}