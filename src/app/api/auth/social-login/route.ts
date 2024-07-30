import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');
  const next = searchParams.get('next');

  if (!provider) {
    return NextResponse.json({ error: 'Provider is required' }, { status: 400 });
  }

  const supabase = createClient();

  const providerlist: { [key: string]: 'kakao' | 'google' } = {
    'kakao': 'kakao',
    'google': 'google'
  };

  const { data: socialuser, error } = await supabase.auth.signInWithOAuth({
    provider: providerlist[provider],
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    },
  });

  if (!(provider in providerlist)) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json(socialuser);
}
