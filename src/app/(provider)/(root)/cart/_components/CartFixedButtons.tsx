import PayButton from '@/components/common/PayButton';
import { Tables } from '@/types/supabase';

type CartButtonProps = {
  data: Tables<'cart'>[];
};

export const CartFixedButtons = ({ data }: CartButtonProps) => {
  const orderNameArr = data.map((item) => item.product_name).filter(Boolean);

  // 전달 데이터 형식
  // {
  //   name: "청송 사과",
  //   amount: 8000,
  //   quantity: 3,
  // }

  const product = data.map((item) => ({
    name: item.product_name,
    amount: (item.product_price ?? 0) * (item.count ?? 0),
    quantity: item.count ?? 0
  }));

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
            <p>{`${data.length} 개 ${data
              .reduce(
                (acc, item) =>
                  acc + (item.product_price ?? 0) * (item.count ?? 0),
                0
              )
              .toLocaleString()} 원`}</p>

            <PayButton product={product} orderNameArr={orderNameArr} />
          </div>
        </div>
      )}
    </>
  );
};
