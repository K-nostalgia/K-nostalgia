import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  //에러 처리 다시하셈 뭔 에러났는데 200이여
  const response = await request.json();
  // const { 
  //   id,
  //   payment_date,
  //   status,
  //   order_name,
  //   amount,
  //   price,
  //   user_id,
  //   user_name,
  //   payment_id,
  //   pay_provider,
  //   phone_number
  // }: Tables<'orderd_list'> = response;
  console.log(response)

  const { error } = await supabase.from('orderd_list').insert(response);

  if (error) {
    console.error(error);
    return NextResponse.json({ status: '에러', message: error.message });
  }
  return NextResponse.json({ status: '200' });
};

// export const GET = async (request: NextRequest) => {
//   try {
//     const url = new URL(request.url);
//     const postId = url.searchParams.get('post_id');

//     if (!postId) {
//       return NextResponse.json({ message: 'post_id 가 필요합니다' }, { status: 400 });
//     }

//     const response = await supabase
//       .from('comments')
//       .select('*', { count: 'exact' })
//       .order('created_at', { ascending: false })
//       .eq('post_id', postId);

//     const { data, error } = response;
//     if (error) {
//       console.error(error);
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: '예기치 않은 오류가 발생했습니다' }, { status: 500 });
//   }
// };