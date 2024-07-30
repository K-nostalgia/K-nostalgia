'use client';
import { useUser } from '@/hooks/useUser';
import React from 'react';
import Profile from './_components/Profile';
import LikeMarket from './_components/LikeMarket';
import OrderList_mypage from './_components/OrderList_mypage';
import Coupon_mypage from './_components/Coupon_mypage';
import Logout from './_components/Logout';

const Mypage = () => {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> error ~ ^^ </div>;

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
      <Logout />
    </div>
  );
};

export default Mypage;
