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
// import { Link } from 'lucide-react';
import { Tables } from '@/types/supabase';
import Link from 'next/link';

interface SearchBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Market = Tables<'markets'>;
type LocalFood = Tables<'local_food'>;

const SearchBar = ({ isOpen, setIsOpen }: SearchBarProps) => {
  const pathName = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [response, setResponse] = useState<
    (Tables<'local_food'> | Tables<'markets'>)[] | null
  >(null);

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
      setResponse(data);
      setSearchTerm('');
    } catch (error) {
      console.log(error);
    }
  };

  // TODO 밑에 검색창 나오게 하기 입력 때 바로 ...

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="top"
        className="bg-white"
        style={{
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
        }}
      >
        {/* 헤더, 디스크립션 일단 없는 쪽 */}
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* 헤더, 디스크립션 일단 없는 쪽_끝*/}
        <form className="py-4" onSubmit={submitSearchTerm}>
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder={
                marketSide
                  ? '시장을 검색해주세요'
                  : localFoodSide
                  ? '특산물을 검색해주세요'
                  : '이 페이지 검색은 준비 중이에요'
              }
              value={searchTerm}
              onChange={handleSearchTerm}
              className="border-primary-30 py-[2px] pl-3 pr-10 rouned-md placeholder:text-label-assistive"
              disabled={!marketSide && !localFoodSide}
              style={{ borderRadius: '6px' }}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 flex items-center h-full"
              disabled={!marketSide && !localFoodSide}
              aria-label="검색"
              style={{ border: 'none', background: 'none' }}
            >
              <GoSearch className="w-[22px] h-[22px]" />
            </Button>
          </div>
        </form>
        {/* pathName이 마켓쪽일 때는 시장 검색 / pathName이 특산물일 때는 특산물 검색 */}
        <div className="mx-2 flex flex-col gap-[2px]">
          {marketSide &&
            response &&
            (response.length > 0 ? (
              response.map((item) => (
                <Link
                  href={`/market/${(item as Market).id}`}
                  key={(item as Market).id}
                >
                  <div
                    className="cursor-pointer hover:bg-gray-100 p-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {(item as Market).시장명}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-label-assistive my-3">
                검색 결과가 없습니다.
              </div>
            ))}
          {localFoodSide &&
            response &&
            (response.length > 0 ? (
              response.map((item) => (
                <Link
                  href={`/local-food/${(item as LocalFood).product_id}`}
                  key={(item as LocalFood).product_id}
                >
                  <div
                    className="cursor-pointer hover:bg-gray-100 p-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {(item as LocalFood).food_name}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-label-assistive my-3">
                검색 결과가 없습니다.
              </div>
            ))}
        </div>
        <SearchMarketRecommendations setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
