'use client';

import { Carousel } from './Carousel';
import { useEffect, useState } from 'react';

export type MainMarket = {
  시장명: string;
  '시장 유형': string;
  도로명주소: string;
  이미지: string | null;
};

export const SectionMarket = () => {
  const [mainMarket, setMainMarket] = useState<MainMarket[]>([]);
  const [images, setImages] = useState<MainMarket[] | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const response = await fetch('/api/market/marketDetailList');
      const { data } = await response.json();
      setMainMarket(data);
    };

    fetchMarketData();
  }, []);

  useEffect(() => {
    const fetchMarketImages = async () => {
      const results: MainMarket[] = [];

      for (const market of mainMarket) {
        try {
          const response = await fetch(
            `/api/market/marketImage?query=${encodeURIComponent(
              market.시장명
            )}&display=1`
          );
          const data = await response.json();
          results.push({
            시장명: market.시장명,
            '시장 유형': market['시장 유형'],
            도로명주소: market.도로명주소,
            이미지: data
          });
        } catch (error: any) {
          results.push({
            시장명: market.시장명,
            '시장 유형': market['시장 유형'],
            도로명주소: market.도로명주소,
            이미지: null
          });
        }

        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      setImages(results);
    };

    if (mainMarket.length > 0) {
      fetchMarketImages();
    }
  }, [mainMarket]);

  return (
    <div className="bg-[#FFF8EF]">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-primary-heavy my-10 mx-10 font-custom">
          유명 전통시장
        </h2>

        <Carousel data={mainMarket} images={images} />
      </div>
    </div>
  );
};
