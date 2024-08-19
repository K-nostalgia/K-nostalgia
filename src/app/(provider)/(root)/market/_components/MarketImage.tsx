'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MarketImageProps {
  src: string;
  alt: string;
  sizes: string;
  className: string;
}

const MarketImage = ({ src, alt, sizes, className }: MarketImageProps) => {
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    setImagePath(src);
  }, [src]);

  return (
    <Image
      src={imagePath}
      alt={alt}
      fill
      sizes={sizes}
      priority
      onError={() =>
        setImagePath(
          'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/markets/market-image.svg'
        )
      }
      className={className}
      style={{
        objectFit: 'cover'
      }}
    />
  );
};

export default MarketImage;
