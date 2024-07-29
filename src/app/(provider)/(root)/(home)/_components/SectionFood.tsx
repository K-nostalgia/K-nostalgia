import { Tables } from '@/types/supabase';
import Link from 'next/link';
import { FoodBox } from './FoodBox';

export const SectionFood = async () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseurl}/api/localfood`);
  const data: Tables<'local_food'>[] = await response.json();

  return (
    <div className="bg-secondary-normal">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-label-light my-10 mx-10 font-custom">
          지역 특산물
        </h2>
        <ul className="grid grid-cols-2 gap-6 mx-[10px]">
          {data.slice(0, 4).map((item, index) => {
            return (
              <FoodBox
                key={item.product_id}
                item={item}
                index={index}
              ></FoodBox>
            );
          })}
        </ul>
        <Link
          href="/local-food"
          className="border-label-disable border rounded-[12px] w-[95%] my-10"
        >
          <button className="w-full  transition-all duration-300 ease-in-out px-4 py-3 group-hover:hover:bg-label-disable text-label-light">
            더 보기
          </button>
        </Link>
      </div>
    </div>
  );
};
