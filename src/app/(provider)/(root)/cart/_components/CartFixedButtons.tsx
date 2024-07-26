import PayButton from '@/components/common/PayButton';
import { Tables } from '@/types/supabase';

type CartButtonProps = {
  data: Tables<'cart'>[];
};

const DELIVERY_FEE = 2500;
const COUPON = 2000;

export const CartFixedButtons = ({ data }: CartButtonProps) => {
  const totalAmount = data.reduce(
    (acc, item) => acc + (item.product_price ?? 0) * (item.count ?? 0),
    0
  );

  const totalPrice = totalAmount + DELIVERY_FEE - COUPON;

  const orderName = data.map((item) => item.product_name).filter(Boolean);
  const totalQuantity = data.reduce((acc, item) => acc + (item.count ?? 0), 0);

  const orderDetails = {
    orderName,
    totalQuantity: totalQuantity,
    totalAmount: totalPrice
  };

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
            <PayButton data={orderDetails} />
          </div>
        </div>
      )}
    </>
  );
};
