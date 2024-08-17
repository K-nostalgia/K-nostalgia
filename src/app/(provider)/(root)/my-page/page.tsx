'use client';
import Loading from '@/components/common/Loading';
import useDeviceSize from '@/hooks/useDeviceSize';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import PayHistoryList from '../payment/_components/PayHistoryList';
import CancelUser from './_components/CancelUser';
import Coupon_mypage from './_components/Coupon_mypage';
import LikeMarket from './_components/LikeMarket';
import Logout from './_components/Logout';
import OrderList_mypage from './_components/OrderList_mypage';
import Profile from './_components/Profile';

const Mypage = () => {
  const { data: user, isLoading, error } = useUser();
  const router = useRouter();
  const { isDesktop } = useDeviceSize();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/log-in');
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) return <Loading />;
  if (error) return <div> 로딩 에러 </div>;

  const handleGoCoupon = () => {
    router.push('/my-page/coupon-page');
  };

  const handleGoMarket = () => {
    router.push('/my-page/likemarket-page');
  };

  return (
    <div className="md:flex md:flex-row md:max-w-[1280px]">
      {/* 오른쪽 사이드 */}
      {isDesktop ? (
        <div className="flex flex-col">
          <div className="w-[749px] flex justify-between items-end">
            <Image
              src="/image/like_tiger.png"
              alt="관심전통시장 "
              width={141}
              height={88}
              className="w-[141px] h-[88px] mt-10"
            />
            <div
              className="items-center flex p-3 gap-2 cursor-pointer"
              onClick={handleGoMarket}
            >
              <span className="underline"> 더보기 </span>
              <BsChevronRight className=" w-4 h-4 text-[#545454] cursor-pointer" />
            </div>
          </div>
          <LikeMarket />
          <div className="border-4 border-[#F2F2F2] mt-4 w-full" />

          <div className="flex flex-col">
            <div className="w-[749px] flex justify-between items-end">
              <Image
                src="/image/coupon_tiger.png"
                alt="마이페이지 쿠폰호랑이 "
                width={141}
                height={88}
                className="w-[141px] h-[88px] mt-10"
              />
              <div
                className="items-center flex p-3 gap-2 cursor-pointer"
                onClick={handleGoCoupon}
              >
                <span className="underline"> 더보기 </span>
                <BsChevronRight className=" w-4 h-4 text-[#545454] cursor-pointer" />
              </div>
            </div>

            <Image
              src={user?.coupon || '쿠폰이 없어요'}
              alt="profile"
              width={343}
              height={161}
              priority
              className="w-[343px] h-[161px] mt-[24px]"
            />

            <div className="border-4  border-[#F2F2F2] mt-10" />
          </div>
          <div>
            <PayHistoryList />
          </div>
        </div>
      ) : (
        // 앱버전
        <div className="">
          <Profile />
          <div className="border-4 border-[#F2F2F2]" />
          <LikeMarket />
          <div className="border-4 border-[#F2F2F2]" />
          <OrderList_mypage />
          <div className="border border-[#F2F2F2]" />
          <Coupon_mypage />
          <div className="border border-[#F2F2F2]" />
          <CancelUser />
          <div className="border-4 border-[#F2F2F2]" />
          <Logout />
        </div>
      )}
    </div>
  );
};
export default Mypage;
