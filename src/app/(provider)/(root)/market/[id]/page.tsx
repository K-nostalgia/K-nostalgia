// 시장명, 시장유형, 도로명주소, 휴게실여부, 주차장여부 상세페이지에서 사용할 시장 정보
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MarketType } from '@/types/Market';
import { PiMapPin } from 'react-icons/pi';
import { LuDot } from 'react-icons/lu';
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
      <div className="w-full p-4 bg-normal flex flex-col items-center">
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
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-semibold text-label-strong">
          {market?.시장명}
        </p>
        <p className="mb-4 text-sm font-normal text-label-alternative">
          {market.도로명주소.split(' ').slice(0, 2).join(' ')}
        </p>
        <div className="w-full h-1 border-4 border-color-[#F2F2F2]" />
      </div>
      <div className="w-full p-4 bg-primary-20 flex flex-col items-center">
        <div className="mt-4 mb-8 text-center text-xl font-semibold text-primary-90">
          시장 전체 이미지
        </div>
        {images.slice(0).map((image, index) => {
          if (index === 0) return null; // 0번째 인덱스는 스킵
          return (
            <div key={index}>
              <div className=" relative w-[343px] h-[280px] border border-primary-90 rounded-xl mb-4 ">
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
      <div className="w-full mb-40 bg-primary-70 flex flex-col justify-center items-center">
        <div className="mt-8 mb-8 text-center text-xl font-semibold text-primary-10">
          상세정보
        </div>
        <Image
          src={
            'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/markets/Map.png'
          }
          width={343}
          height={80}
          priority
          alt="시장디테일 지도 이미지"
          style={{ width: 343, height: 220, objectFit: 'cover' }}
        />
        <div className="flex mt-2 mb-8 place-items-center text-primary-10">
          <PiMapPin className="w-4 h-4" />
          <p className="text-sm font-normal">{market.도로명주소}</p>
        </div>
        <div className="w-full h-1 border-4 border-[#D6A461] border-opacity-40 " />
        <div className="mx-[60px] mt-8 mb-10 px-9 py-6 border border-secondary-20 rounded-xl bg-primary-90">
          <p
            className="text-base font-medium text-primary-10 text-center
          mb-3"
          >
            필요 사항 보유 여부
          </p>
          <div className="flex justify-start">
            <LuDot className="text-primary-20" />
            <div className="text-sm mr-6 text-label-strong">
              고객 전용 주차장
            </div>
            <div className="text-sm text-left text-label-alternative">
              {market.시장전용고객주차장_보유여부 === 'Y' ? (
                <div>보유　</div>
              ) : (
                '미보유'
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <LuDot className="text-primary-20" />
            <span className="text-sm mr-auto text-label-strong">
              고객 휴게실
            </span>
            <span className="text-sm text-label-alternative">
              {market.고객휴게실_보유여부 === 'Y' ? (
                <div>보유　</div>
              ) : (
                '미보유'
              )}
            </span>
          </div>
          <div className="flex justify-start">
            <LuDot className="text-primary-20" />
            <span className="text-sm mr-auto text-label-strong">
              물품 보관함
            </span>
            <span className="text-sm text-label-alternative">
              {market.물품보관함_보유여부 === 'Y' ? (
                <div>보유　</div>
              ) : (
                '미보유'
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDetailPage;
