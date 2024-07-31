'use client';
import { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';

export const LikeButton = () => {
  const [isLike, setIsLike] = useState(false);

  const onLikeButton = () => {
    setIsLike((prev) => !prev);
  };

  return (
    <>
      {isLike ? (
        <GoHeartFill
          onClick={onLikeButton}
          style={{ color: '#DB3B3B' }}
          className="w-[22px] h-[22px] transition-transform duration-300 ease-in-out hover:scale-110"
        />
      ) : (
        <GoHeart
          onClick={onLikeButton}
          style={{ color: '#F6F5F3' }}
          className="w-[22px] h-[22px] transition-transform duration-300 ease-in-out hover:scale-110"
        />
      )}
    </>
  );
};
