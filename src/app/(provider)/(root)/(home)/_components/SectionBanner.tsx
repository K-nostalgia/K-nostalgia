'use client';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { banners } from '@/lib/banners';
import Image from 'next/image';

export const SectionBanner = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Autoplay]}
      spaceBetween={16}
      slidesPerView={'auto'}
      centeredSlides={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
    >
      {banners.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            width={375}
            height={315}
            priority
            alt={`메인 배너 이미지 ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
