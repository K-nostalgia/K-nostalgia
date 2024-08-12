import supabase from '@/utils/supabase/client';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();

  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id'); // 쿼리 파라미터에서 product_id 가져오기

    if (!productId) {
      return NextResponse.json(
        { error: '상품 ID가 없습니다.' },
        { status: 400 }
      );
    }

    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId);

    if (reviewError) {
      return NextResponse.json({ error: reviewError.message }, { status: 400 });
    }

    return NextResponse.json(reviewData);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
