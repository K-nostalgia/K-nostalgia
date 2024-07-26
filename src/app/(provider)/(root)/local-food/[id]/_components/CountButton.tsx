import { Tables } from '@/types/supabase';
import { useState } from 'react';

interface CountProps {
  data: number | null;
}

export const CountButton = ({ data }: CountProps) => {
  const [count, setCount] = useState(data || 1);

  const onAddCount = () => {
    setCount((prev) => prev + 1);
  };

  const onSubCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className="flex gap-x-2 items-center">
      <button onClick={onSubCount} className="rounded-sm">
        -
      </button>
      <span>{count}</span>
      <button onClick={onAddCount} className="rounded-sm">
        +
      </button>
    </div>
  );
};
