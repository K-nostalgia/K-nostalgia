'use client';
import { Market } from '@/types/Market';
import React, { useEffect, useState } from 'react';

const MarketPage = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [images, setImages] = useState<
    { 시장명: string; image: string | null; error: string | null }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('/api/market/marketList');
        const { data } = await response.json();
        setMarkets(data);
      } catch (error) {
        console.error('데이터를 가져오지 못했습니다.', error);
      }
    };
    fetchMarkets();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const results = [];

      for (const market of markets) {
        try {
          const response = await fetch(
            `/api/market/marketImage?query=${encodeURIComponent(market.시장명)}`
          );
          const data = await response.json();
          results.push({ 시장명: market.시장명, image: data, error: null });
        } catch (error: any) {
          results.push({
            시장명: market.시장명,
            image: null,
            error: error.message
          });
        }

        // 각 요청 사이에 0.2초 지연 추가(요청 속도가 너무 빨라서 이미지를 찾아올 수 가 없다는 에러가 뜸)
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      setImages(results);
      setLoading(false);
    };

    if (markets.length > 0) {
      fetchImages();
    }
  }, [markets]);

  return (
    <>
      <div>
        {loading ? (
          <p>로딩중...</p>
        ) : (
          images.map((item, index) => (
            <div key={index}>
              <h3>{item.시장명}</h3>
              {item.image ? (
                <img src={item.image} alt={item.시장명} />
              ) : (
                <p style={{ color: 'red' }}>Error: {item.error}</p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MarketPage;
