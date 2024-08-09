import { useDeleteProduct } from '@/hooks/localFood/useDeleteProduct';

interface ButtonProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DeleteButton = ({
  selectedItems,
  setSelectedItems
}: ButtonProps) => {
  const mutation = useDeleteProduct();

  const handleSelectedDelete = () => {
    selectedItems.forEach((productId) => {
      mutation.mutate(productId);
    });

    setSelectedItems([]);
  };

  return (
    <button
      onClick={handleSelectedDelete}
      className="text-base text-label-alternative font-normal"
    >
      선택 삭제
    </button>
  );
};
