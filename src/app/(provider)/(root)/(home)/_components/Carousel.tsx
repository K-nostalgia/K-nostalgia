'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { MainMarket } from './SectionMarket';
import { LikeButton } from './LikeButton';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

interface marketProps {
  images: MainMarket | null | undefined;
}

export const Carousel = ({ images }: marketProps) => {
  const { data: user } = useUser();

  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination]}
      spaceBetween={16}
      slidesPerView={'auto'}
      centeredSlides={true}
      pagination={{ clickable: true }}
      className="!pb-[80px]"
    >
      {images?.slice(0, 4).map((item, index) => (
        <SwiperSlide key={index} className="!w-[311px]">
          <Link href={`/market/${item.id}`}>
            <div>
              {item.이미지 ? (
                <Image
                  src={`${item.이미지[0]?.link}`}
                  width={454}
                  height={340}
                  priority
                  alt={`Slide ${index + 1}`}
                  style={{
                    height: 340,
                    border: '3px solid #9C6D2E',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                  }}
                />
              ) : (
                <>없음</>
              )}
            </div>
          </Link>
          <div className="bg-primary-20 text-label-light p-4 rounded-br-[12px] rounded-bl-[12px]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{item.시장명}</h2>
              <LikeButton marketId={item.id} userId={user?.id as string} />
            </div>
            <div className="text-sm mt-2 leading-[22.4px]">
              <p>전통시장</p>
              <p>{item.도로명주소}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
