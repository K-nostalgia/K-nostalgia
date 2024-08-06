'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface HeaderNav {
  path: string;
  pathName: string;
}

const HeaderNav = [
  {
    path: '/',
    pathName: '홈'
  },
  {
    path: '/market',
    pathName: '전통 시장'
  },
  {
    path: '/local-food',
    pathName: '특산물'
  }
];

const WebHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const router = useRouter();

  //클릭시 인덱스 === 액티브 인덱스
  const onClickActive = (index: number) => {
    setActiveIndex(index);
  };

  const handleHeaderNavigation = (path: string, index: number) => {
    // 액티브 인덱스랑 인덱스가 같을 경우
    if(activeIndex === index) {
    // 인덱스에 따라 순차적으로 이동

    }

    // 그 다음에 라우터 이동
    router.push(path);
  };

  return (
    <nav className="mt-20 flex flex-row items-center gap-5">
      {HeaderNav.map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-center items-center gap-5"
        >
          <div className="py-[23px] px-5">{item.pathName}</div>
          <div
            className={`w-[72px] h-[1px] bg-[#AFAFAF] ${
              index === HeaderNav.length - 1 ? 'hidden' : 'block'
            }`}
          >
            {' '}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default WebHeader;
