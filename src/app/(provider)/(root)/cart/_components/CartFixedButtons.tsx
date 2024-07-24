import PayButton from '@/components/common/PayButton';
import { Tables } from '@/types/supabase';

type CartButtonProps = {
  data: Tables<'cart'>;
};

export const CartFixedButtons = ({ data }: CartButtonProps) => {
  return (
    <>
      {data?.length === 0 ? (
        <div className="bg-normal shadow-custom px-4 pt-3 pb-1 fixed bottom-0 left-0 right-0">
          <div className="flex gap-3 ">
            <button className=" bg-label-disable py-3 px-4 rounded-xl text-normal flex-grow">
              상품을 담아주세요
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-normal shadow-custom px-4 pt-3 pb-1 fixed bottom-0 left-0 right-0">
          <div className="flex gap-3 justify-between items-center">
            <p>{`0 개 ${0} 원`}</p>
            <PayButton />
          </div>
        </div>
      )}
    </>
  );
};
