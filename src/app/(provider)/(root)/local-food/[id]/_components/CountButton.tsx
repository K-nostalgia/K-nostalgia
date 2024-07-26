import { useState } from 'react';

export const CountButton = () => {
  const [count, setCount] = useState(1);

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
