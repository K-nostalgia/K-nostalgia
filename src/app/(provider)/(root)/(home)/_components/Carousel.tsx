'use client';

import SwiperCore, { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Market } from '@/types/Market';
import Image from 'next/image';

interface marketProps {
  data: Market[];
}

export const Carousel = ({ data }: marketProps) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination]}
      spaceBetween={16}
      slidesPerView={2}
      centeredSlides={true}
      pagination={{ clickable: true }}
      onSwiper={() => {}}
      onSlideChange={() => {}}
    >
      {data.slice(0, 4).map((item, index) => (
        <SwiperSlide key={index}>
          <div>
            <Image
              src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product2.jpg"
              width={454}
              height={340}
              alt={`Slide ${index + 1}`}
              style={{ border: '3px solid #9C6D2E' }}
            />
          </div>
          <div className="bg-primary-strong text-label-light p-4 rounded-br-[12px] rounded-bl-[12px]">
            <h2 className="text-lg">{item.시장명}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
