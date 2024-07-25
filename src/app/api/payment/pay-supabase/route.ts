import { Tables } from "@/types/supabase";
import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const response = await request.json();
  const {}: Tables<'orderd_list'> = response;

  const { error } = await supabase.from('comments').insert({ });

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