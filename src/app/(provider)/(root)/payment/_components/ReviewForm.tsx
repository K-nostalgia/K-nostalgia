import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { imageSrc } from '@/hooks/payment/getProductImage';
import supabase from '@/utils/supabase/client';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

type Products = {
  amount: number;
  id: string;
  name: string;
  quantity: number;
  user_id?: string;
};

const ReviewForm = ({
  product,
  onBack,
  isEditing,
  payment_date
}: {
  product: Products;
  onBack: () => void;
  isEditing?: boolean;
  payment_date: string | null;
}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const date = dayjs(payment_date).locale('ko').format('YYYY. MM. DD');
  const { name, amount, quantity, id, user_id } = product;

  useEffect(() => {
    if (isEditing) {
      const fetchReview = async () => {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', product.id)
          .eq('user_id', user_id as string)
          .single();

        if (data) {
          setRating(data.rating as number);
          setContent(data.content as string);
        }
      };
      fetchReview();
    }
  }, [isEditing, product.id, product.user_id]);

  const submitReview = async () => {
    if (rating === 0) {
      return toast({
        variant: 'destructive',
        description: '별점은 필수로 입력해주세요.'
      });
    }
    const reviewData = {
      product_id: product.id,
      user_id: product.user_id,
      rating,
      content
    };
    let error;
    if (isEditing) {
      const { error: updateError } = await supabase
        .from('reviews')
        .update(reviewData)
        .eq('product_id', product.id)
        .eq('user_id', product.user_id as string);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('reviews')
        .insert(reviewData);
      error = insertError;
    }

    if (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: '리뷰 저장 중 오류가 발생했습니다.'
      });
    } else {
      toast({
        description: isEditing
          ? '리뷰가 수정되었습니다.'
          : '리뷰가 작성되었습니다.'
      });
      onBack();
    }
  };

  const DeleteHandler = async () => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('product_id', product.id)
        .eq('user_id', product.user_id as string);

      if (error) throw error;

      toast({
        description: '리뷰가 삭제되었습니다.'
      });
      onBack();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        variant: 'destructive',
        description: '리뷰 삭제 중 오류가 발생했습니다.'
      });
    }
  };

  return (
    <div>
      <div aria-hidden="true">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between pt-[12px] pb-[8px]">
              <button
                onClick={onBack}
                className="text-gray-500"
                aria-label="뒤로 가기"
              >
                <ChevronLeft size={34} />
              </button>
              <h2 className="text-[18px] font-semibold flex justify-center leading-[160%]">
                리뷰 작성하기
              </h2>
              <div className="invisible">
                <ChevronLeft size={34} />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>

        <div>
          <div
            key={id}
            className="py-4 flex gap-3 border-b-2 border-[#F2F2F2] mt-[6px]"
          >
            <div>
              <img
                className="w-[64px] h-[64px] rounded-[8px] md:w-[88px] md:h-[88px]"
                src={imageSrc(name)}
                alt={name}
              />
            </div>
            <div className="flex flex-col items-start w-full flex-1">
              {isEditing && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute right-0 mr-4 py-1 px-2 text-[12px] text-[#1F1E1E] font-normal leading-[140%] bg-[#F2F2F2] rounded-[6px] md:text-[14px]">
                      삭제
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[330px] h-[220px] flex flex-col justify-center gap-1">
                    <AlertDialogHeader className="flex flex-col  gap-0 justify-center">
                      <AlertDialogTitle className="flex justify-center ">
                        리뷰를 삭제하시겠어요?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex justify-center ">
                        삭제 후에는 복구나 재작성이 불가해요
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className=" pt-6 flex items-end">
                      <AlertDialogAction
                        onClick={DeleteHandler}
                        className="text-[#ED1B18]"
                      >
                        삭제하기
                      </AlertDialogAction>
                      <AlertDialogCancel className="bg-[#9C6D2E] text-white">
                        계속 작성하기
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <div className="flex flex-col mb-2 md:gap-[6px]">
                <p className="flex font-medium md:text-[20px]">{name}</p>
                <div className="flex gap-[4px] items-center text-[#79746D] font-medium md:text-[16px]">
                  <p>{amount}원</p>
                  <p>·</p>
                  <p>{quantity}개</p>
                </div>
                <p className="font-normal text-[#AFACA7] text-[14px]">
                  작성 가능 기한 : {date}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center py-4 gap-3 -mx-4 border-b-[6px] border-[#F2F2F2]">
            <h2 className="font-semibold">상품의 품질은 어땠나요?</h2>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? 'text-[#D6A461]' : 'text-[#E0E0E0]'
                  }`}
                >
                  <FaStar key={index} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="상품에 대한 솔직한 리뷰를 작성해주세요 :)"
          className="w-full h-[243px] p-4 border rounded focus:outline-none focus:ring-1 focus:ring-[#9C6D2E] resize-none md:h-[426px]"
        />
        {/* bg-[#FAF8F5] */}
      </div>
      <div className="flex -mx-4 w-[calc(100%+2rem)] shadow-custom pt-3 pb-6">
        <button
          onClick={submitReview}
          className="mt-4 mx-[16px] h-12 bg-[#9C6D2E] text-white px-4 py-2 rounded-[10px] w-full"
        >
          {isEditing ? '리뷰 수정 완료' : '리뷰 작성 완료'}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
