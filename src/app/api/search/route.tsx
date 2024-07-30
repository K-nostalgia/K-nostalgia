import { NextRequest, NextResponse } from 'next/server';

const MARKET_URL =
  'https://api.odcloud.kr/api/15052837/v1/uddi:8e90c34b-c086-422f-882a-d3c15efd101f';

export const GET = async (request: NextRequest) => {
  try {
    const serviceKey = process.env.NEXT_PUBLIC_MARKET_API_KEY;

    // 총 데이터 개수 1,388개
    if (serviceKey) {
      const response = await fetch(
        `${MARKET_URL}?serviceKey=${serviceKey}&page=1&perPage=1388`
      );

      const { data } = await response.json();
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
