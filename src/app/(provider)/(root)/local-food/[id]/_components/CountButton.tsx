interface CountProps {
  count: number | null;
  onCountChange: (count: number) => void;
}

export const CountButton = ({ count, onCountChange }: CountProps) => {
  const onAddCount = () => {
    onCountChange((count ?? 0) + 1);
  };

  const onSubCount = () => {
    if ((count ?? 0) > 1) {
      onCountChange((count ?? 0) - 1);
    }
  };

  return (
    <div className="flex gap-x-4 items-center justify-center border border-label-assistive p-[6px] rounded-[4px] w-24 mt-2">
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
