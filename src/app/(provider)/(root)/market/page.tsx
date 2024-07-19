'use client';
import { Market } from '@/types/Market';
import React, { useEffect, useState } from 'react';

const MarketPage = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/market');
        const { data } = await response.json();
        setMarkets(data);
      } catch (error) {
        console.error('데이터를 가져오지 못했습니다.', error);
      }
    };
    fetchData();
  }, []);

  console.log(markets);

  return (
    <>
      {markets.map((market) => {
        return <p key={market.시장코드}>{market.시장명}</p>;
      })}
    </>
  );
};

export default MarketPage;
