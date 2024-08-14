'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useCallback, useEffect, useState } from 'react';
import SearchRecommendations from './SearchRecommendations';
import { GoSearch } from 'react-icons/go';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import useDebounce from '@/hooks/useDebounce';
import HomeSearchResult from './HomeSearchResult';
import MarketSearchResult from './MarketSearchResult';
import LocalFoodSearchResult from './LocalFoodSearchResults';

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
  const [results, setResults] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const marketSide = pathName === '/market' || pathName.startsWith('/market');
  const localFoodSide =
    pathName === '/local-food' || pathName.startsWith('/local-food/');
  const homeSide = pathName === '/';

  // TODO 검색 결과 빈 배열로 받기 => 검색 결과 없음으로 처리
  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value.trim() === '') {
      setResponse(null);
    }
    // 검색어 길이 제한
    if (event.target.value.length >= 20) {
      alert('20자 미만으로 검색해주세어흥');
      setSearchTerm('');
      return;
    }
  };

  //검색어 전송 분기 처리
  const submitSearchTerm = useCallback(async () => {
    if (debounceSearchTerm.trim() === '') {
      return setResponse([]);
    }

    // 'markets' or 'local-food', home일 땐 빈 문자열
    const tableValue = marketSide
      ? 'markets'
      : localFoodSide
      ? 'local_food'
      : '';

    try {
      const response = await fetch(
        tableValue ? '/api/search' : '/api/search/home',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          // 공백 제거
          body: JSON.stringify({
            searchValue: debounceSearchTerm.replace(/\s+/g, '').trim(),
            tableValue
          })
        }
      );
      const data = await response.json();
      console.log('3. data 받는 순간', data);
      setResponse(data);
    } catch (error) {
      console.log(error);
    }
  }, [debounceSearchTerm, localFoodSide, marketSide]);

  // 계속해서 작동
  useEffect(() => {
    if (debounceSearchTerm) {
      submitSearchTerm();
    }
  }, [debounceSearchTerm, submitSearchTerm]);

  // TODO 1. 최근 검색어 저장

  // TODO 2. 키보드 이동

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="top"
        className="bg-normal rounded-b-[12px] md:w-[608px]"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="w-full relative flex items-center">
          <Input
            placeholder={
              marketSide
                ? '시장을 검색해주세요'
                : localFoodSide
                ? '특산물을 검색해주세요'
                : homeSide
                ? '시장과 특산물을 검색해주세요'
                : '이 페이지 검색은 준비 중이에요'
            }
            value={searchTerm}
            onChange={handleSearchTerm}
            disabled={!marketSide && !localFoodSide && !homeSide}
            className={`pr-10 placeholder:text-label-alternative text-base bg-white ${
              searchTerm.trim() === ''
                ? 'border-primary-30 rounded-[6px]'
                : 'border-label-assistive border-b-0 rounded-t-[6px]'
            }`}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 flex items-center h-full"
            disabled={!marketSide && !localFoodSide && !homeSide}
            aria-label="검색"
            style={{ border: 'none', background: 'none' }}
            onClick={submitSearchTerm}
          >
            <GoSearch className="w-[22px] h-[22px]" />
          </Button>
        </div>

        {/* 검색+최근 하단 둥글게, 검색되면 보이기 */}
        <div
          className={`flex flex-col border border-t-0 border-label-assistive rounded-b-[6px] ${
            searchTerm.trim() === '' ? 'hidden' : 'block'
          }`}
        >
          {/* 검색 결과 있을 경우 */}
          {response !== null && response.length > 0 && (
            <>
              {homeSide && (
                <HomeSearchResult response={response} setIsOpen={setIsOpen} />
              )}
              {marketSide && (
                <MarketSearchResult
                  response={response as Market[]}
                  setIsOpen={setIsOpen}
                />
              )}
              {localFoodSide && (
                <LocalFoodSearchResult
                  response={response as LocalFood[]}
                  setIsOpen={setIsOpen}
                />
              )}
            </>
          )}

          <div className="px-3 py-[6px] text-xs border-t border-label-assistive">
            최근 검색어
          </div>
        </div>

        {/* 검색 결과 없을 경우 검색창에서 보이는 것 X */}
        {response !== null && response.length === 0 && (
          <div className="text-left text-md text-label-alternative pt-5 px-2">
            검색 결과가 없습니다.
            <p>
              <span className="font-semibold">
                {marketSide
                  ? '시장'
                  : localFoodSide
                  ? '특산물'
                  : '시장과 특산물'}
              </span>
              에 대해 검색해주세요!
            </p>
          </div>
        )}

        {/* 검색하지 않을 때만 보여주기 */}
        {searchTerm.trim() === '' && (
          <SearchRecommendations setIsOpen={setIsOpen} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
