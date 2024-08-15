import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { BsChevronRight } from 'react-icons/bs';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import Loading from '@/components/common/Loading';

const LikeMarket = () => {
  const { data: userData } = useUser();

  const getLikedMarkets = async () => {
    if (!userData || !userData.id) {
      throw new Error('사용자 ID를 찾을 수 없습니다.');
    }

    const response = await fetch(`/api/market/liked-markets/${userData.id}`);
    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  };

  const {
    data: likedMarkets,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['likedMarkets', userData?.id],
    queryFn: getLikedMarkets,
    enabled: !!userData?.id
  });

  if (isLoading) return <Loading />;
  if (isError) return <div> 에러가 발생했습니다.</div>;

  const markets = Array.isArray(likedMarkets)
    ? likedMarkets
    : [likedMarkets].filter(Boolean);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <GoHeart className="mr-[8px] text-label-normal text-[20px]" />
        <span className="text-[16px]">관심 전통시장</span>
        <BsChevronRight className="ml-auto text-[#545454]" />
      </div>

      {markets.length > 0 ? (
        markets.map((market, index) => (
          <div
            key={market.id || index}
            className="border border-secondary-50 rounded-xl mt-1 p-3 flex"
          >
            <div>
              <h3 className="text-[16px] text-label-strong font-semibold">
                {market.시장명 || '이름 없음'}
              </h3>
              <p className="text-label-normal text-[14px]">
                {market.도로명주소 || '주소 없음'}
              </p>

              <div className="mt-2 mb-3 flex">
                {market.이미지 ? (
                  <>
                    <Image
                      src={market.이미지[0]}
                      alt={`${market.시장명 || '시장'} 이미지`}
                      width={64}
                      height={64}
                      className="rounded-lg mr-4"
                    />
                    <Image
                      src={market.이미지[1]}
                      alt={`${market.시장명 || '시장'} 이미지`}
                      width={64}
                      height={64}
                      className="rounded-lg mr-4"
                    />
                  </>
                ) : (
                  '이미지 없음'
                )}
              </div>
            </div>

            <GoHeartFill className="text-[#DB3B3B] text-[24px] ml-auto" />
          </div>
        ))
      ) : (
        <div className="text-center"> 관심 전통시장이 없습니다. </div>
      )}
    </div>
  );
};

export default LikeMarket;
