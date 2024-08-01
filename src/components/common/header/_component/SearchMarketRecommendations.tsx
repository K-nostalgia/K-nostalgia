'use client';

import Link from 'next/link';
import React from 'react';

interface TOP8Market {
  id: string;
  market_id: number;
  marketName: string;
  marketAddress: string;
}

const TOP8Market = [
  {
    id: '1',
    market_id: 1244,
    marketName: '부평깡통시장',
    marketAddress: '부산광역시 중구 부평1길 39'
  },
  // 거제도 안 예뻐 ㅇㅠㅇ
  {
    id: '2',
    market_id: 1229,
    marketName: '거제시장',
    marketAddress: '부산광역시 연제구 거제시장로14번길28'
  },
  // 구암 시장은보류
  { id: '3', market_id: 0, marketName: '구암시장', marketAddress: '' },
  {
    id: '4',
    market_id: 1045,
    marketName: '반송시장',
    marketAddress: '경상남도 창원시 성산구 윈이대로 473번길 20-11'
  },
  {
    id: '5',
    market_id: 114,
    marketName: '양평물맑은시장',
    marketAddress: '경기도 양평군 양평읍 양평장터길 15 일원'
  },
  {
    id: '6',
    market_id: 116,
    marketName: '여주한글시장',
    marketAddress: '경기도 여주시 세종로14번길 24-1'
  },
  {
    id: '7',
    market_id: 165,
    marketName: '수유중앙시장',
    marketAddress: '서울특별시 강북로 노해로 17길 21'
  },
  {
    id: '8',
    market_id: 175,
    marketName: '화곡중앙시장',
    marketAddress: '서울특별시 강서구 월정로 30길 66'
  }
];

const SearchMarketRecommendations = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="text-nowrap">
      <div className="px-6">
        <div className="text-base">향그리움이 추천하는 전통시장</div>
        <div className="text-xs text-label-alternative">
          가장 많이 찾았던 전통시장을 추천해 드려요
        </div>
      </div>
      <div className="grid grid-rows-4 grid-cols-2 px-4 pt-3 gap-x-[23px]">
        {TOP8Market.map((item) => (
          <Link
            href={`/market/${encodeURIComponent(
              item.marketName
            )}/${encodeURIComponent(item.marketAddress)}?page=${Math.ceil(
              item.market_id / 10
            )}`}
            key={item.id}
            onClick={() => setIsOpen(false)}
          >
            <div className="gap-1">
              <span className="inline-flex items-center justify-center p-[2px] w-6 h-6 text-primary-20 text-nowrap text-base">
                {item.id}
              </span>
              <span className="text-sm">{item.marketName}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMarketRecommendations;
