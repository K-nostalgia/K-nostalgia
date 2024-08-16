'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import { banners, webBanners } from '@/lib/banners';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useDebounce from '@/hooks/useDebounce';

export const SectionBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1280);
  const debouncedWidth = useDebounce(windowWidth, 200);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <div className="md:mt-20 max-w-screen-xl mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
      >
        <CarouselContent>
          {(debouncedWidth < 1280 ? banners : webBanners).map((img, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center relative"
            >
              <Link href={index === 1 ? '/my-page/coupon-page' : '#'}>
                <Image
                  src={img}
                  width={debouncedWidth < 1280 ? 375 : 1280} // 모바일과 웹에 따라 width 조정
                  height={debouncedWidth < 1280 ? 335 : 280}
                  priority
                  alt={`메인 배너 이미지 ${index + 1}`}
                  style={{
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:block absolute right-4 translate-x-[-10%] bottom-[5%] translate-y-[-31%] px-[10px] py-[2px] rounded-[16px] bg-[rgba(0,0,0,.24)] text-center text-label-light text-xs font-medium">
          {`${current} / ${count}`}
        </div>
      </Carousel>
    </div>
  );
};
