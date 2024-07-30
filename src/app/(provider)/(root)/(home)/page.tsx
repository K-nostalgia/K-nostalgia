import { SectionBanner } from './_components/SectionBanner';
import { SectionFood } from './_components/SectionFood';
import { SectionMarket } from './_components/SectionMarket';

const Homepage = () => {
  return (
    <>
      <SectionBanner />
      <SectionFood />
      <SectionMarket />
    </>
  );
};

export default Homepage;
