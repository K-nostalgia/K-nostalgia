import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { imageSrc } from '@/hooks/payment/getProductImage';
import { Tables } from '@/types/supabase';
import supabase from '@/utils/supabase/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StarRating } from '../../local-food/[id]/_components/StarRating';
import ReviewForm from './ReviewForm';

interface Props {
  order: Order;
}

interface Product {
  amount: number;
  id: string;
  name: string;
  quantity: number;
  user_id: string;
  hasReview?: boolean;
  rating?: number | null | undefined;
}

interface Order extends Omit<Tables<'orderd_list'>, 'products'> {
  products: Product[] | null;
}

const ReviewProductDetail = ({ order }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productsWithReviewStatus, setProductsWithReviewStatus] = useState<
    Product[]
  >([]);
  const isDisabled = order.status === 'CANCELLED';
  const { user_id, payment_date } = order;

  useEffect(() => {
    const fetchReviewStatus = async () => {
      if (order.products) {
        const updatedProducts = await Promise.all(
          order.products.map(async (product) => {
            const { data } = await supabase
              .from('reviews')
              .select('rating')
              .eq('product_id', product.id)
              .eq('user_id', user_id as string)
              .maybeSingle();
            return { ...product, hasReview: !!data, ...data };
          })
        );
        setProductsWithReviewStatus(updatedProducts);
      }
    };

    fetchReviewStatus();
  }, [order.products, user_id, productsWithReviewStatus]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div
            role="button"
            onClick={(e) => {
              if (isDisabled) {
                e.preventDefault();
              }
            }}
            className={`flex flex-col gap-2 h-[40px] w-[343px] px-[10px] py-[16px] justify-center items-center text-[14px] text-[#F6F5F3] font-semibold leading-[140%] rounded-[10px] ${
              isDisabled ? 'bg-[#E0DDD9]' : 'bg-[#9C6D2E]'
            }`}
          >
            리뷰 작성하기
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#FAF8F5] w-[330px] h-[627px] rounded-2xl">
          {selectedProduct ? (
            <ReviewForm
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              isEditing={selectedProduct.hasReview}
              payment_date={payment_date}
            />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="w-full flex justify-center text-center text-[18px] font-semibold leading-[160%]">
                  <p className="text-[18px] font-semibold flex justify-center pt-[12px] pb-[8px]">
                    리뷰 작성 가능 상품
                  </p>
                </DialogTitle>
                <div className="flex flex-col">
                  <div>
                    {productsWithReviewStatus.map((product: Product) => {
                      const { name, id, amount, quantity, hasReview } = product;
                      const date = dayjs(order.payment_date)
                        .locale('ko')
                        .format('YYYY. MM. DD');

                      return (
                        <div key={id} className="py-4 flex gap-3 border-b-2">
                          <div>
                            <img
                              className="rounded-[8px] w-[64px] h-[64px]"
                              src={imageSrc(name)}
                              alt={name}
                            />
                          </div>
                          <div className="flex flex-col flex-1 items-start">
                            <div className="mb-2">
                              <p className="flex font-medium">{name}</p>
                              <div className="flex gap-[4px] items-center text-[#79746D]">
                                <p>{amount}원</p>
                                <p>·</p>
                                <p>{quantity}개</p>
                              </div>
                              <p className="text-[14px] text-[#AFACA7]">
                                작성 가능 기한 : {date}
                              </p>
                              <div>
                                {product.rating ? (
                                  <StarRating
                                    rating={product.rating}
                                    size={24}
                                  />
                                ) : null}
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                setSelectedProduct({
                                  ...product,
                                  user_id: user_id as string
                                })
                              }
                              className="flex flex-col g-[33px] px-3 py-2 justify-center self-stretch items-center text-[12px] font-semibold leading-[140%] text-[#9C6D2E] border-[1px] border-[#9C6D2E] rounded-[8px]"
                            >
                              {hasReview
                                ? '리뷰 수정하기'
                                : '상세 리뷰 작성하기'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewProductDetail;
