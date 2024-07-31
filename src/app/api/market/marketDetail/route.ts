// 시장 데이터 상세정보 가져오는 API(시장 디테일에서 사용)
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  console.log(1);
  const supabase = createClient()
  try {
    const {searchParams} = new URL(request.url);
    const marketId = searchParams.get('id')
    console.log("2",marketId)

    if(!marketId) {
      console.log("3");
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const {data, error: marketDataError} = await supabase.from('markets').select("*").eq('id',marketId).single()
        console.log(data);
    if (marketDataError) {
      console.log("4");
      return NextResponse.json({ error: marketDataError.message },{ status: 400 });
    }
        
    return NextResponse.json({data: data});
  } catch (error) {
    console.log("5");
    return NextResponse.json(
      { error: '시장 데이터를 가져오지 못했습니다.' },
      { status: 500 }
    );
  }
};