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
            <>
              <Image
                src={img}
                width={375}
                height={375}
                priority
                alt={`상세 대표 이미지`}
                style={{
                  width: 375,
                  height: 375,
                  objectFit: 'cover',
                  position: 'relative'
                }}
              />
              <div className="bg-product-custom absolute z-10 inset-0 flex justify-center items-center text-center text-white text-xl font-semibold">
                해당 상품은 <br />
                실제 판매 상품이 아닙니다
              </div>
            </>
          ) : (
            <DefaultImage text={text} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
