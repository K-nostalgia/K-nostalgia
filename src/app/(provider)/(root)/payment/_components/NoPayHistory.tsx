import Image from 'next/image';

const NoPayHistory = () => {
  return (
    <div className="bg-slate-400 w-full h-[80vh] flex flex-col justify-center items-center">
      <Image
        src="/image/StateSad.png"
        alt="주문 내역 없음"
        width={100}
        height={100}
        className="w-[100px] h-[100px] mx-auto"
      />
      <p>여기 멘트 뭐라고쓸까요?</p>
    </div>
  );
};

export default NoPayHistory;
