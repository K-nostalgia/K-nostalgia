'use client';
// import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { banners } from '@/lib/banners';
// import Image from 'next/image';
// import Link from 'next/link';

// export const SectionBanner = () => {
//   return (
//     <Swiper
//       // install Swiper modules
//       modules={[Pagination, Autoplay, EffectFade]}
//       pagination={{
//         type: 'fraction'
//       }}
//       effect={'fade'}
//       spaceBetween={16}
//       slidesPerView={'auto'}
//       centeredSlides={true}
//       autoplay={{ delay: 4000, disableOnInteraction: false }}
//       loop={true}
//     >
//       {banners.map((img, index) => (
//         <SwiperSlide key={index}>
//           <Link href={index === 1 ? '/coupon-page' : '#'}>
//             <Image
//               src={img}
//               width={375}
//               height={335}
//               priority
//               alt={`메인 배너 이미지 ${index + 1}`}
//               style={{ objectFit: 'cover' }}
//             />
//           </Link>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import { banners } from '@/lib/banners';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

export const SectionBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
      >
        <CarouselContent>
          {banners.map((img, index) => (
            <CarouselItem key={index}>
              <Link href={index === 1 ? '/coupon-page' : '#'}>
                <Image
                  src={img}
                  width={375}
                  height={335}
                  priority
                  alt={`메인 배너 이미지 ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute right-4 bottom-[5%] translate-y-[-5%] px-[10px] py-[2px] rounded-[16px] bg-[rgba(0,0,0,.24)] text-center text-label-light text-xs font-medium">
        {`${current} / ${count}`}
      </div>
    </div>
  );
};
