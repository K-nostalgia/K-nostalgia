import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  //TODO 에러 처리 다시하셈 뭔 에러나도 200이여
  // 결제 완료되지 않았어도 데이터 저장은 돼서 결제완료 ^^! 가 뜸
  //결제쪽 라우트 핸들러랑 같이 보면서 처리해야함
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

    if (!userId) {
      return NextResponse.json({ message: '유저 정보를 찾을 수 없습니다' }, { status: 400 });
    }

    const response = await supabase
      .from('orderd_list')
      .select('*')
      .order('payment_date', { ascending: false })
      .eq('user_id', userId);

      console.log(response)
      
    const { data, error } = response;
    if (error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '예기치 않은 오류가 발생했습니다' }, { status: 500 });
  }
};