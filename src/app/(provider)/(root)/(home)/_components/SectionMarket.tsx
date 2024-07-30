'use client';

import { Carousel } from './Carousel';
import { useEffect, useState } from 'react';

export const SectionMarket = () => {
  const [mainMarket, setMainMarket] = useState<any[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const response = await fetch('/api/market/marketDetailList');
      const result = await response.json();
      setMainMarket(result.data);
      console.log(result);
      setMainMarket(result.data);
    };

    fetchMarketData();
  }, []);

  return (
    <div className="bg-[#FFF8EF]">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-primary-heavy my-10 mx-10 font-custom">
          유명 전통시장
        </h2>
        <Carousel data={mainMarket} />
      </div>
    </div>
  );
};
