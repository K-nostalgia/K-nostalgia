import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log(2);
    return NextResponse.json({ error: 'id가 없습니다.' }, { status: 400 });
  }
  const { data, error } = await supabase.from('users').select().eq('id', user.id).single()

  if (error) {
    console.log(3);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
