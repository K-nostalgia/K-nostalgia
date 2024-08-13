import Image from 'next/image';
import { useEffect, useState } from 'react';
import MarketLikes from '../../_components/MarketLikes';
import Link from 'next/link';
import { MarketType } from '@/types/Market';
import { useUser } from '@/hooks/useUser';

interface MarketRecommendPropsType {
  region: string;
}

const MarketRecommend = ({ region }: MarketRecommendPropsType) => {
  const { data: user, isLoading, error } = useUser();
  const [markets, setMarkets] = useState<MarketType[]>([]);
  const [loading, setLoading] = useState();

  const getRecommend = async () => {
    try {
      const response = await fetch(`/api/market/recommend?region=${region}`);
      const data = await response.json();
      setMarkets(data);
    } catch (error) {
      console.error('추천 시장 불러오는 중 오류발생', error);
    }
  };

  useEffect(() => {
    getRecommend();
  }, [region]);

  return (
    <div className="pb-8 w">
      <div className="px-4 py-8 text-center text-xl font-semibold text-secondary-10">
        주변 추천 전통시장
      </div>
      {loading ? (
        <p>로딩중...</p>
      ) : (
        <div className="flex px-4 space-x-4 overflow-x-scroll scrollbar-hide">
          {markets.map((item, index) => (
            <div
              key={index}
              className="w-[328px] py-3 px-3 rounded-xl border border-solid border-secondary-50
              bg-normal"
            >
              <Link href={`/market/${item.id}`}>
                <div className="flex flex-col mb-2">
                  <div className="flex justify-between">
                    <div className="pl-1">
                      <p className="text-base font-semibold text-label-strong">
                        {item.시장명}
                      </p>
                      <p className="w-[272px] text-sm text-label-normal font-normal text-ellipsis overflow-hidden whitespace-nowrap">
                        {item.도로명주소}
                      </p>
                    </div>
                    <div
                      className="flex justify-end items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MarketLikes
                        pixel={5}
                        userId={user?.id}
                        marketId={item.id}
                      />
                    </div>
                  </div>
                </div>
                {item.이미지 ? (
                  <div className="relative flex gap-2">
                    {item.이미지.slice(0, 2).map((imgSrc, index) => (
                      <div
                        key={index}
                        className={`rounded-[8px] relative w-[148px] h-[130px] ${
                          index === 0
                            ? 'rounded-l-[8px] rounded-r-none'
                            : 'rounded-r-[8px] rounded-l-none'
                        }`}
                      >
                        <Image
                          src={imgSrc}
                          alt={`${item.시장명} - 이미지 ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 343px"
                          priority
                          className="absolute w-full h-full rounded-[8px]"
                          style={{
                            objectFit: 'cover',
                            borderRadius:
                              index === 0 ? '8px 0 0 8px' : '0 8px 8px 0'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'red' }}>Error: {item.error}</p>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketRecommend;
