'use client';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { GoSearch } from 'react-icons/go';
import { PiShoppingCartSimple } from 'react-icons/pi';

type HeaderProps = {
  headerTitle?: string;
};

const Header = ({ headerTitle }: HeaderProps) => {
  const { data: user, isLoading, error } = useUser();
  const router = useRouter();

  console.log('user', user);

  return (
    //TODO mic md:hidden, <div>로고 대신 뒤로 가기 버튼? 상태 어떻게 전해줘야 한다.
    <div className="flex justify-between my-2 mx-3 md:hidden">
      <div onClick={() => router.push('/')} className="cursor-pointer">
        로고
      </div>
      <div>{headerTitle}</div>
      <div className="flex p-1 gap-1">
        <GoSearch />
        <PiShoppingCartSimple
          onClick={() => router.push('/cart')}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
