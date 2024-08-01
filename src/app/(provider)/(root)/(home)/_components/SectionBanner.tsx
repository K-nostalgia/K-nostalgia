'use client';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { banners } from '@/lib/banners';
import Image from 'next/image';

export const SectionBanner = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Autoplay, EffectFade]}
      pagination={{
        type: 'fraction'
      }}
      effect={'fade'}
      spaceBetween={16}
      slidesPerView={'auto'}
      centeredSlides={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
    >
      {banners.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            width={375}
            height={335}
            priority
            alt={`메인 배너 이미지 ${index + 1}`}
            style={{ objectFit: 'cover' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
