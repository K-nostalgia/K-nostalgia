import { Carousel } from './Carousel';

export const SectionMarket = () => {
  const data = ['첫번쨰', '두번째', '세번째', '네번째'];
  return (
    <div className="bg-label-disable">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-primary-heavy my-10 mx-10 font-custom">
          유명 전통시장
        </h2>
        <Carousel data={data} />
      </div>
    </div>
  );
};
