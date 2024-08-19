import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NoPayHistory = () => {
  const pathName = usePathname();
  return (
    <div className="w-full md:w-[60vw] flex flex-col  gap-[16px] border-t-4 border-[#FFFFFF] min-w-[375px] max-w-[737px]  md:mt-10">
      <div
        className={`hidden py-10 border-b-8 border-[#F2F2F2] md:flex md:justify-between ${
          pathName === '/my-page' && 'border-none'
        }`}
      >
        <img src="/image/pay_history_tiger.png" alt="복숭아 든 귀여운 호랑이" />
      </div>
      <div className="py-auto flex justify-center items-center flex-col h-[95vh] md:h-[68vh]">
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
    </div>
  );
};

export default NoPayHistory;
