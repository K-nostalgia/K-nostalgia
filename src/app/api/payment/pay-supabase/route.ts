import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const response = await request.json();

  const { error } = await supabase.from('orderd_list').insert(response);

  if (error) {
    console.error(error);
    return NextResponse.json({ status: '500', message: error.message });
  }
  return NextResponse.json({ status: '200' });
};

export const GET = async (request: NextRequest) => {

  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const page =  parseInt(url.searchParams.get('page') || '1',10)

    if (!userId) {
      return NextResponse.json({ message: '유저 정보를 찾을 수 없습니다' }, { status: 400 });
    }
    const PAGE_PER_ITEM: number = 3;

    const start = (page - 1) * PAGE_PER_ITEM
    const end = start + PAGE_PER_ITEM - 1

    const {data, error} = await supabase
      .from('orderd_list')
      .select('*')
      .order('created_at', { ascending: false })
      .eq('user_id', userId)
      .range(start,end)
      
    if (error) {
      console.error(error);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '예기치 않은 오류가 발생했습니다' }, { status: 500 });
  }
};

export const PUT = async(request: NextRequest)=>{
  try {
    const newHistory = await request.json()
    const {payment_id} = newHistory

    const {error} = await supabase
    .from('orderd_list')
    .update(newHistory)
    .eq('payment_id',payment_id)

    if (error) {
      throw error;
    }
    return NextResponse.json({ message: '주문 내역 업데이트 완료' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '주문 내역 업데이트 중 오류 발생' }, { status: 500 });
  }
}