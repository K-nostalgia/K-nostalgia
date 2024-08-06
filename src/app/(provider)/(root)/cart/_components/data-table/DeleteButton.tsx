import { AlertPage } from '@/components/common/Alert';
import { useDeleteProduct } from '@/hooks/localFood/useDeleteProduct';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

export const DeleteButton = ({ productId }: { productId: string }) => {
  const mutation = useDeleteProduct();
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleDelete = () => {
    mutation.mutate(productId);
    setAlertVisible(false); // Alert 닫기
  };

  return (
    <>
      <button onClick={() => setAlertVisible(true)}>
        <CgClose className="text-[#959595] w-7 h-7" />
      </button>

      {isAlertVisible && (
        <AlertPage
          title="잠깐!"
          message="해당 제품을 삭제하시겠습니까?"
          buttonText="삭제"
          onButtonClick={handleDelete}
          onClose={() => setAlertVisible(false)}
        />
      )}
    </>
  );
};
