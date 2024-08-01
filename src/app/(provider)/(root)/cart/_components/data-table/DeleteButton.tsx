import { useDeleteProduct } from '@/hooks/localFood/useDeleteProduct';
import { CgClose } from 'react-icons/cg';

export const DeleteButton = ({ productId }: { productId: string }) => {
  const mutation = useDeleteProduct();

  const handleDelete = () => {
    if (confirm('해당 제품을 삭제하시겠습니까?')) {
      mutation.mutate(productId);
    }
  };

  return (
    <button onClick={handleDelete}>
      <CgClose className="text-[#959595] w-7 h-7" />
    </button>
  );
};
