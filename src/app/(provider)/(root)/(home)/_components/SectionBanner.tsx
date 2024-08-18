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
import useDeviceSize from '@/hooks/useDeviceSize';

export const SectionBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { isDesktop } = useDeviceSize();

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
    <div className={` max-w-screen-xl mx-auto ${isDesktop && 'mt-20'}`}>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
      >
        <CarouselContent>
          {(isDesktop ? webBanners : banners).map((img, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center relative w-full"
            >
              <Link href={index === 1 ? '/my-page/coupon-page' : '#'}>
                <Image
                  src={img}
                  width={isDesktop ? 1280 : 375}
                  height={isDesktop ? 280 : 335}
                  priority
                  alt={`메인 배너 이미지 ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',

                    objectFit: 'cover'
                  }}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          className={`${
            isDesktop
              ? 'block absolute right-4 translate-x-[-10%] bottom-[5%] translate-y-[-31%] px-[10px] py-[2px] rounded-[16px] bg-[rgba(0,0,0,.24)] text-center text-label-light text-xs font-medium'
              : 'hidden'
          }`}
        >
          {`${current} / ${count}`}
        </div>
      </Carousel>
    </div>
  );
};
