'use client';

import { useQuery } from '@tanstack/react-query';
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

interface SearchBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ isOpen, setIsOpen }: SearchBarProps) => {
  const pathName = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [res, setRes] = useState<any[]>([]);
  // const [tableValue, setTableValue] = useState<string>("")

  // console.log(pathName);

  // const getTableName = () => {
  //   if (pathName === '/market' || pathName.startsWith('/market')) {
  //     setTableValue("market")
  //   } else if (pathName === '/local-food' || pathName.startsWith('/local-food/')) {
  //     setTableValue("local-food")
  //   }
  // }

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
    const tableValue =
      pathName === '/market' || pathName.startsWith('/market')
        ? 'markets'
        : pathName === '/local-food' || pathName.startsWith('/local-food/')
        ? 'local_food'
        : '';

    console.log(tableValue);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ searchValue: searchTerm, tableValue })
      });
      const data = await response.json();
      console.log(data);

      setRes(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const sendMessageMutate = useMutation({
  //   mutationFn: sendMessage,
  //   onSuccess: () => {
  //     setMessage('');
  //     queryClient.invalidateQueries({ queryKey: ['chatData'] });
  //   }
  // });

  // 시장일 땐 시장 검색
  // 특산물 페이지일 땐 특산물 검색

  // TODO Mic 장바구니랑 주문내역 서치 아이콘 잠깐 숨겼다가 다시 해보기 유저 테스트 동안

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="top" className="bg-white">
        {/* 헤더, 디스크립션 일단 없는 쪽 */}
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* 헤더, 디스크립션 일단 없는 쪽_끝*/}
        <form className="py-4" onSubmit={submitSearchTerm}>
          <Input
            placeholder={
              pathName === '/market' || pathName.startsWith('/market')
                ? '시장에 대해 검색하세요'
                : pathName === '/local-food' ||
                  pathName.startsWith('/local-food/')
                ? '특산물에 대해 검색하세요'
                : '이 페이지 검색은 준비 중이에요'
            }
            value={searchTerm}
            onChange={handleSearchTerm}
            className="placeholder:text-label-assistive"
          />
          <Button type="submit">검색</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
