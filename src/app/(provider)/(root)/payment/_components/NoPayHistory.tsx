import Image from 'next/image';
import Link from 'next/link';

const NoPayHistory = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col gap-[16px] justify-center items-center border-t-4 border-[#FFFFFF]">
      <Image
        src="/image/StateSad.png"
        alt="주문 내역 없음"
        width={100}
        height={100}
        className="w-[100px] h-[100px] mx-auto"
      />
      <p className="text-[18px] text-[#AFACA7] font-medium">
        주문 내역이 없어요
      </p>
      <Link href={'local-food'}>
        <button className="w-au h-[48px] px-[32px] py-[12px] rounded-[12px] text-white bg-[#9C6D2E] mt-[16px] font-semibold leading-[140%]">
          특산물 보러 가기
        </button>
      </Link>
    </div>
  );
};

export default NoPayHistory;
