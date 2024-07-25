import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const email = data.email as string;
  const password = data.password as string;
  const nickname = data.nickname as string;
  const name = data.name as string;

  const supabase = createClient();

  console.log('Received Data:', { email, password, nickname, name });

  const { data: userData, error: userDataError } = await supabase.auth.signUp({
    email,
    password
  });

  if (userDataError ) {
    return NextResponse.json({ error: userDataError .message }, { status: 400 });
  }

  const userId = userData.user?.id;

  // user 테이블에 추가
  const { error: insertError } = await supabase
    .from('users')
    .insert({ id: userId, email, password, nickname, name });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  return NextResponse.json(userData);
}
