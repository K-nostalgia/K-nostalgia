'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useState } from 'react';
import SearchMarketRecommendations from './SearchMarketRecommendations';
import { GoSearch } from 'react-icons/go';

interface SearchBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ isOpen, setIsOpen }: SearchBarProps) => {
  const pathName = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [response, setResponse] = useState<any[]>([]);

  const marketSide = pathName === '/market' || pathName.startsWith('/market');
  const localFoodSide =
    pathName === '/local-food' || pathName.startsWith('/local-food/');

  // XSS 방지 및 공백 제거
  const sanitizeInput = (str: string) => {
    const trimmedStr = str.replace(/\s+/g, '').trim();

    const encoded = trimmedStr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return encoded;
  };

  // 검색어 입력
  const handleSearchTerm = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  //검색어 전송
  const submitSearchTerm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() === '') {
      return;
    }

    // 'markets' or 'local-food'
    const tableValue = marketSide
      ? 'markets'
      : localFoodSide
      ? 'local_food'
      : '';

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        // 공백 제거
        body: JSON.stringify({
          searchValue: sanitizeInput(searchTerm),
          tableValue
        })
      });
      const data = await response.json();
      console.log(data);
      setResponse(data);
      setSearchTerm('');
    } catch (error) {
      console.log(error);
    }
  };

  // TODO Mic 장바구니랑 주문내역 서치 아이콘 잠깐 숨겼다가 다시 해보기 유저 테스트 동안

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="top" className="bg-white mx-4">
        {/* 헤더, 디스크립션 일단 없는 쪽 */}
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* 헤더, 디스크립션 일단 없는 쪽_끝*/}
        <form className="py-4" onSubmit={submitSearchTerm}>
          <Input
            placeholder={
              marketSide
                ? '시장을 검색해주세요'
                : localFoodSide
                ? '특산물을 검색해주세요'
                : '이 페이지 검색은 준비 중이에요'
            }
            value={searchTerm}
            onChange={handleSearchTerm}
            className="border-primary-30 py-[2px] pl-3 pr-2 rouned-[6px] placeholder:text-label-assistive"
            disabled={!marketSide && !localFoodSide}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-5 top-15 transform -translate-y-1/2"
            disabled={!marketSide && !localFoodSide}
            aria-label="검색"
          >
            <GoSearch />
          </Button>
        </form>
        {/* pathName이 마켓쪽일 때는 시장 검색 / pathName이 특산물일 때는 특산물 검색 */}
        {marketSide ? (
          response.length > 0 ? (
            response.map((item) => (
              <div key={item.id} className="hover:bg-green">
                {item.시장명}
              </div>
            ))
          ) : (
            <div className="text-label-assistive">검색 결과가 없습니다.</div>
          )
        ) : localFoodSide ? (
          response.length > 0 ? (
            response.map((item) => (
              <div key={item.product_id} className="hover:bg-green">
                {item.food_name}
              </div>
            ))
          ) : (
            <div className="text-label-assistive">검색 결과가 없습니다.</div>
          )
        ) : null}
        <SearchMarketRecommendations setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
