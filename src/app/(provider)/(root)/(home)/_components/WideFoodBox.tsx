'use client';
import { DefaultImage } from '@/components/common/DefaultImage';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface FoodProps {
  item: Tables<'local_food'>;
  index: number;
}

export const WideFoodBox = ({ item, index }: FoodProps) => {
  const { title_image, food_name, description, price, discountRate } = item;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const discountAmount =
    (price ?? 0) - ((price ?? 0) * (discountRate ?? 0)) / 100;
  return (
    <>
      <Link href={`/local-food/${item.product_id}`}>
        <li
          className={`flex flex-col rounded-[12px] ${
            index === 2
              ? 'absolute left-[50%] translate-x-[-50%] bottom-0'
              : 'relative'
          } flex-grow`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {title_image ? (
            <Image
              src={title_image[0]}
              width={index === 1 || index === 2 ? 636 : 282}
              height={index === 1 || index === 2 ? 221 : 482}
              alt={`${food_name}이미지`}
              priority
              style={{
                width: index === 1 || index === 2 ? 636 : 282,
                height: index === 1 || index === 2 ? 221 : 482,
                objectFit: 'cover',
                borderRadius: '12px',
                border: '1px solid #FFF3E3'
              }}
            />
          ) : (
            <DefaultImage text={'상품이미지가 없습니다'} />
          )}
          {isHovered && (
            <div
              className={`flex flex-col justify-center items-start absolute ${
                index === 1 || index === 2
                  ? 'bottom-0 right-0 top-0 border-l-0 rounded-br-[12px] rounded-tr-[12px]'
                  : 'bottom-0 left-0 right-0 border-t-0 rounded-b-[12px]'
              }  bg-[rgba(0,0,0,.56)] border-b-primary-80 border text-label-light bg-opacity-80 px-12 py-[61px]`}
            >
              <h3 className="text-base font-medium text-secondary-90">
                {food_name}
              </h3>
              <p className="text-xs font-normal text-label-light mb-2">
                {description}
              </p>
              <p className="text-sm font-bold text-secondary-90">
                {discountAmount.toLocaleString()}원
                <span className="font-normal text-secondary-30 ml-2 line-through">
                  {price?.toLocaleString()}원
                </span>
              </p>
            </div>
          )}
        </li>
      </Link>
    </>
  );
};
