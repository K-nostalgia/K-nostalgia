// 시장명, 시장유형, 도로명주소, 휴게실여부, 주차장여부 상세페이지에서 사용할 시장 정보
'use client';
import { Market } from '@/types/Market';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoHeart } from 'react-icons/go';
export type ImagesType = {
  title: string;
  link: string;
  thumbnail: string;
  sizeheight: string;
  sizewidth: string;
}[];

const MarketDetailPage = ({
  params,
  searchParams
}: {
  params: { marketname: string; address: string };
  searchParams: {
    page: string;
  };
}) => {
  const [market, setMarket] = useState<Market>();
  const [images, setImages] = useState<ImagesType | null>(null);
  const [loading, setLoading] = useState(false);
  const { marketname, address } = params;
  const page = searchParams.page;

  useEffect(() => {
    const fetchMarketDetail = async (page: string) => {
      try {
        const response = await fetch(
          `/api/market/marketDetail?marketname=${marketname}&address=${address}&page=${page}`
        );
        const { data } = await response.json();
        console.log('data____', data);
        setMarket(data[0]);
      } catch (error) {
        console.error('데이터를 가져오지 못했습니다.', error);
      }
    };
    fetchMarketDetail(page);
  }, [page, address, marketname]);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);

      if (market) {
        try {
          const response = await fetch(
            `/api/market/marketImage?query=${encodeURIComponent(
              market.시장명
            )}&display=5`
          );

          const data = await response.json();
          console.log('Image Data___', data);
          setImages(data);
        } catch (error) {
          console.error('이미지를 가지고 오지 못했습니다.', error);
          setImages(null);
        }
      }
    };

    fetchImage();
  }, [market]);
  if (!images) return <div>로딩 중..</div>;

  return (
    <div>
      <h1>{market?.시장명}</h1>
      <div className="relative w-[140px] h-[140px]">
        <Image
          src={images![0].link}
          alt={market?.시장명 ?? 'market name'}
          fill
          sizes="(max-width: 768px) 100vw, 140px"
          priority
          className="absolute w-full h-full"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {images.map((image, index) => {
        if (index === 0) return null; // 0번째 인덱스는 스킵
        return (
          <>
            <div key={image.link} className="relative w-[343px] h-[220px]">
              <Image
                src={image.link}
                alt={market?.시장명 ?? 'market name'}
                fill
                sizes="(max-width: 768px) 100vw, 343px"
                priority
                className="absolute w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MarketDetailPage;
