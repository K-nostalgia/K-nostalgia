// 시장명, 시장유형, 도로명주소, 휴게실여부, 주차장여부 상세페이지에서 사용할 시장 정보
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MarketType } from '@/types/Market';
import { PiMapPin } from 'react-icons/pi';
export type ImagesType = {
  title: string;
  link: string;
  thumbnail: string;
  sizeheight: string;
  sizewidth: string;
}[];

const MarketDetailPage = ({ params }: { params: { id: string } }) => {
  const [market, setMarket] = useState<MarketType>();

  const [loading, setLoading] = useState(false);
  const { id } = params;

  useEffect(() => {
    const fetchMarketDetail = async (id: string) => {
      try {
        const response = await fetch(`/api/market/marketDetail?id=${id}`);
        const { data } = await response.json();
        console.log('data____', data);
        setMarket(data);
      } catch (error) {
        console.error('데이터를 가져오지 못했습니다.', error);
      }
    };
    fetchMarketDetail(id);
  }, [id]);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
    };
    fetchImage();
  }, [market]);

  if (!market) return <div>로딩 중..</div>;

  const images = market.이미지 ?? [];

  return (
    <>
      <div className="w-full p-4 bg-normal">
        {images.length > 0 && (
          <div className="flex relative w-[343px] h-[230px] ">
            <Image
              src={images[0]}
              alt={market?.시장명 ?? 'market name'}
              fill
              sizes="(max-width: 768px) 100vw, 140px"
              priority
              className="absolute w-full h-full rounded-[8px]"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-4 mb-5">
        <p className="text-xl font-semibold text-label-strong">
          {market?.시장명}
        </p>
        <p className="text-sm font-normal text-label-alternative">
          {market.도로명주소.split(' ').slice(0, 2).join(' ')}
        </p>
        <div className="w-[375px] h-2 bg-color-[#F2F2F2]" />
      </div>
      <div className="w-full p-4 bg-primary-20">
        <div className="mt-4 mb-8 text-center text-xl font-semibold text-primary-90">
          시장 전체 이미지
        </div>
        {images.slice(0).map((image, index) => {
          if (index === 0) return null; // 0번째 인덱스는 스킵
          return (
            <div key={index}>
              <div className="relative w-[343px] h-[280px] border border-primary-90 rounded-xl mb-4 ">
                <Image
                  src={image}
                  alt={market?.시장명 ?? 'market name'}
                  fill
                  sizes="(max-width: 768px) 100vw, 343px"
                  priority
                  className="absolute w-full h-full rounded-xl"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-primary-70 flex flex-col justify-center items-center">
        <div className="mt-8 mb-8 text-center text-xl font-semibold text-primary-10">
          상세정보
        </div>
        <div className="p-4 w-[327px] h-[205px] bg-slate-400">
          지도 들어갈 자리
        </div>
        <div className="flex mt-2 mb-8 place-items-center text-primary-10">
          <PiMapPin className="w-4 h-4" />
          <p className="text-sm font-normal">{market.도로명주소}</p>
        </div>
      </div>
    </>
  );
};

export default MarketDetailPage;
