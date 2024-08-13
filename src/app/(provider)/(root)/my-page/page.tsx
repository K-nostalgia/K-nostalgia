'use client';
import { useUser } from '@/hooks/useUser';
import React, { useEffect } from 'react';
import Profile from './_components/Profile';
import LikeMarket from './_components/LikeMarket';
import OrderList_mypage from './_components/OrderList_mypage';
import Coupon_mypage from './_components/Coupon_mypage';
import Logout from './_components/Logout';
import Loading from '@/components/common/Loading';
import { useRouter } from 'next/navigation';
import CancelUser from './_components/CancelUser';

const Mypage = () => {
  const { data: user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // console.log(user);
      if (!user) {
        router.push('/log-in');
      }
    }
  }, [isLoading, user]);

  if (isLoading) return <Loading />;
  if (error) return <div> 로딩 에러 </div>;

  return (
    <div>
      <Profile />
      <div className="border-4 border-[#F2F2F2]" />
      <LikeMarket />
      <div className="border-4 border-[#F2F2F2]" />
      <OrderList_mypage />
      <div className="border border-[#F2F2F2]" />
      <Coupon_mypage />
      <div className="border border-[#F2F2F2]" />
      <CancelUser />
      <div className="border border-[#F2F2F2]" />
      <Logout />
    </div>
  );
};

export default Mypage;
