'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { PiShoppingCartSimple } from 'react-icons/pi';
import SearchBar from './SearchBar';

interface ShowSearchCartProps {
  showSearch: boolean;
  showCart: boolean;
}

const ShowSearchCart = ({ showSearch, showCart }: ShowSearchCartProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // 검색, 카트 있다 = 기본 / 검색만 있음 / 검색, 카트 둘 다 없음 = false
  if (showSearch && showCart) {
    return (
      <div className="flex p-1 gap-1 w-[72px] h-9">
        <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <GoSearch className="w-7 h-7" onClick={handleSearchToggle} />
        <PiShoppingCartSimple
          onClick={() => router.push('/cart')}
          className="cursor-pointer w-7 h-7"
        />
      </div>
    );
  } else if (showSearch && !showCart) {
    return (
      <div className="flex p-1 w-9 h-9">
        <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <GoSearch className="w-7 h-7" onClick={handleSearchToggle} />
      </div>
    );
  } else if (!showSearch && showCart) {
    return (
      <div className="flex p-1 w-9 h-9">
        <PiShoppingCartSimple
          onClick={() => router.push('/cart')}
          className="cursor-pointer w-7 h-7"
        />
      </div>
    );
  } else {
    return <div className="invisible w-9 h-9" />;
  }
};

export default ShowSearchCart;
