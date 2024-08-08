import supabase from '@/utils/supabase/client';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  try {
    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .select('*');

    if (reviewError) {
      return NextResponse.json({ error: reviewError.message }, { status: 400 });
    }

    return NextResponse.json(reviewData);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
