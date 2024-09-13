import { usePathname, useRouter } from 'next/navigation';
import { BsChevronRight } from 'react-icons/bs';

const TopIconInDesktop = () => {
  const pathName = usePathname();
  const route = useRouter();
  return (
    <div
      className={`hidden py-10 border-b-8 border-[#F2F2F2] md:flex md:justify-between ${
        pathName === '/my-page' && 'border-none'
      }`}
    >
      <img src="/image/pay_history_tiger.png" alt="복숭아 든 귀여운 호랑이" />
      <div
        className={`flex items-center text-[14px] gap-1 ${
          pathName === '/payment' && 'hidden'
        }`}
      >
        <span
          className="underline cursor-pointer"
          onClick={() => route.push('payment')}
        >
          더보기
        </span>
        <BsChevronRight className=" w-4 h-4 text-[#545454] cursor-pointer" />
      </div>
    </div>
  );
};

export default TopIconInDesktop;
