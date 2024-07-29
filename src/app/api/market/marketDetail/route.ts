// 시장 데이터 상세정보 가져오는 API(시장 디테일에서 사용)
import { Market } from '@/types/Market';
import { NextRequest, NextResponse } from 'next/server';

type ApiResponse = {
  data: Market[];
}

const MARKET_URL =
  'https://api.odcloud.kr/api/15052837/v1/uddi:8e90c34b-c086-422f-882a-d3c15efd101f';

export const GET = async (request: NextRequest) => {
  try {
    const {searchParams} = new URL(request.url);
    const page = searchParams.get('page') || '1'
    const address = searchParams.get('address')
    const marketName = searchParams.get('marketname') // url 대소문자 구분을 위함
    const serviceKey = encodeURIComponent('serviceKey');
    const apiKey = process.env.NEXT_PUBLIC_MARKET_API_KEY;

    const response = await fetch(
      `${MARKET_URL}?${serviceKey}=${apiKey}&page=${page}` //총 시장 갯수:1388
    );
    const data = await response.json() as ApiResponse
    let result = data
      
    if (marketName && address) {
        const decodedMarketName = decodeURIComponent(marketName);
        const decodedAddress = decodeURIComponent(address);
      

        const filteredMarket = data.data.find(market =>
            market.시장명 === decodedMarketName && market.도로명주소 === decodedAddress
        )
        if (filteredMarket) {
            result = {data: [filteredMarket]}
        } else {
          result = {data: []}
        }
    }
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '시장 데이터를 가져오지 못했습니다.' },
      { status: 500 }
    );
  }
};