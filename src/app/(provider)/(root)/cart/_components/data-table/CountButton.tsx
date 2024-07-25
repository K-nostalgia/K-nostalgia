'use client';

import supabase from '@/utils/supabase/client';
import { useState } from 'react';

interface CountButtonProps {
  product_id: string;
  counts: number;
}

export const CountButton: React.FC<CountButtonProps> = ({
  product_id,
  counts
}) => {
  const [count, setCount] = useState(counts || 1);

  const onAddCount = async () => {
    setCount((prev) => prev + 1);
    const { error } = await supabase
      .from('cart')
      .update({
        count: count + 1
      })
      .eq('product_id', product_id);

    if (error) {
      console.log({ error });
      alert('수량이 추가되지 않았습니다.');
      return;
    }
  };

  const onSubtractCount = async () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      const { error } = await supabase
        .from('cart')
        .update({
          count: count - 1
        })
        .eq('product_id', product_id);

      if (error) {
        console.log({ error });
        alert('수량이 감소되지 않았습니다.');
        return;
      }
    }
  };

  return (
    <div className="flex gap-x-2 items-center">
      <button onClick={onSubtractCount} className="rounded-sm">
        -
      </button>
      <span>{count}</span>
      <button onClick={onAddCount} className="rounded-sm">
        +
      </button>
    </div>
  );
};
