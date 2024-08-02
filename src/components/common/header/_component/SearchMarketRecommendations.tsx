'use client';

import Link from 'next/link';
import React from 'react';

interface TOP8Market {
  id: string;
  market_id: number;
  marketName: string;
}

const TOP8Market = [
  {
    id: '1',
    market_id: 1260,
    marketName: '재송한마음시장'
  },
  {
    id: '2',
    market_id: 2,
    marketName: '가평잣고을시장'
  },
  {
    id: '3',
    market_id: 457,
    marketName: '예산시장'
  },
  {
    id: '4',
    market_id: 1045,
    marketName: '반송시장'
  },
  {
    id: '5',
    market_id: 1311,
    marketName: '주문진종합시장'
  },
  {
    id: '6',
    market_id: 116,
    marketName: '여주한글시장'
  },
  {
    id: '7',
    market_id: 165,
    marketName: '수유중앙시장'
  },
  {
    id: '8',
    market_id: 175,
    marketName: '화곡중앙시장'
  }
];

const SearchMarketRecommendations = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="text-nowrap">
      <div className="px-2 pt-6">
        <div className="text-base">향그리움이 추천하는 전통시장</div>
        <div className="text-xs text-label-alternative pb-[17px]">
          가장 많이 찾았던 전통시장을 추천해 드려요
        </div>
      </div>
      <div className="grid grid-rows-4 grid-cols-2 gap-2">
        {TOP8Market.map((item) => (
          <Link
            href={`/market/${item.market_id}`}
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
