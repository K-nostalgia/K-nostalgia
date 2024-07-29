import { Carousel } from './Carousel';

export const SectionMarket = async () => {
  const response = await fetch(
    'http://localhost:3000/api/market/marketDetailList'
  );
  const data = await response.json();

  return (
    <div className="bg-[#FFF8EF]">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-primary-heavy my-10 mx-10 font-custom">
          유명 전통시장
        </h2>
        <Carousel data={data} />
      </div>
    </div>
  );
};
