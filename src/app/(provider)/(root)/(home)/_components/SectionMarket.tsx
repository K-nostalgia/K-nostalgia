'use client';

import { Market } from '@/types/Market';
import { Carousel } from './Carousel';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export type MainMarket = {
  시장명: string;
  '시장 유형': string;
  도로명주소: string;
  이미지: string | null;
}[];

export const SectionMarket = () => {
  // const [mainMarket, setMainMarket] = useState<Market[]>([]);
  //const [images, setImages] = useState<MainMarket | null>(null);

  const { data: mainMarket, error: mainMarketError } = useQuery({
    queryKey: ['market'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/market/marketDetailList');
        const { data } = await response.json();
        return data;
      } catch (error) {
        console.error('메인에 시장 데이터를 가져오지 못했습니다', error);
      }
      if (mainMarketError) {
        console.error('서버 오류', mainMarketError.message);
        return null;
      }
    }
  });

  const fetchMarketImages = async () => {
    const results: MainMarket = [];

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
    return results;
  };

  const { data: marketImages } = useQuery<MainMarket | null | undefined>({
    queryKey: ['marketImg'],
    queryFn: fetchMarketImages
  });

  return (
    <div className="bg-[#FFF8EF]">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-primary-heavy my-10 mx-10 font-custom">
          유명 전통시장
        </h2>

        <Carousel images={marketImages} />
      </div>
    </div>
  );
};
