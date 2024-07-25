import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createClient();

  // 쿠키 삭제
  await supabase.auth.signOut();

  return NextResponse.json('');
}
