import { Tables } from '@/types/supabase';
import Link from 'next/link';

type Market = Tables<'markets'>;

interface MarketSearchResultsProps {
  response: Market[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarketSearchResult = ({
  response,
  setIsOpen
}: MarketSearchResultsProps) => {
  return (
    <div className="border-t border-label-assistive">
      {response.map((item, index) => (
        <Link href={`/market/${item.id}`} key={item.id}>
          <div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer px-3 py-[6px] text-base hover:bg-[#F2F2F2]"
          >
            {item.시장명}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MarketSearchResult;
