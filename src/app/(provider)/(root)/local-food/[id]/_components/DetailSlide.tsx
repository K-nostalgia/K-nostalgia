import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { DefaultImage } from '@/components/common/DefaultImage';
import Image from 'next/image';

interface SlideProps {
  images: string[] | null;
}

export const DetailSlide = ({ images }: SlideProps) => {
  const text = '이미지가 없습니다.';
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={'auto'}
      centeredSlides={true}
      pagination={{ clickable: true }}
      // autoplay={{ delay: 2000, disableOnInteraction: false }}
      // loop={true}
    >
      {images?.map((img, index) => (
        <SwiperSlide key={index}>
          {img ? (
            <Image
              src={img}
              width={375}
              height={375}
              priority
              alt={`상세 대표 이미지`}
              style={{ width: 375, height: 375, objectFit: 'cover' }}
            />
          ) : (
            <DefaultImage text={text} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
