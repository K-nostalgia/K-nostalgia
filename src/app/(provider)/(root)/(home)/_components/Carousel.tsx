'use client';

import { useRef } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  data: string[];
}

export const Carousel = ({ data }: Props) => {
  SwiperCore.use([Navigation, Pagination]);
  const swiperRef = useRef<SwiperCore>();
  const breakpoints = {
    768: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    1024: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    1200: {
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  };
  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      spacebetween={spaceBetween} // 슬라이드 간격
      slidesPerView={slidesPerView} // 화면에 보여줄 슬라이드 갯수
      Loop={true} //슬라이드 무한 반복 여부
      autoplay={false} //슬라이드 자동 재생 여부
      navigation // prev, next button 73
      pagination={{ clickable: true }}
      breakpoints={breakpoints}
      className="w-80 h-64"
    >
      {data?.map((item, index) => (
        <SwiperSlide key={index}>
          <p>{item}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
