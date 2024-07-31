'use client';

import SwiperCore, { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoHeart } from 'react-icons/go';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { MainMarket } from './SectionMarket';
import { LikeButton } from './LikeButton';

interface marketProps {
  images: MainMarket | null | undefined;
}

export const Carousel = ({ images }: marketProps) => {
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
          <div className="bg-primary-strong text-label-light p-4 rounded-br-[12px] rounded-bl-[12px]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{item.시장명}</h2>
              <LikeButton />
            </div>
            <div className="text-sm mt-2 leading-[22.4px]">
              <p>{item['시장 유형']}</p>
              <p>{item.도로명주소}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
