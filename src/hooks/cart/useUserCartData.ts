'use client';

import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useUserCartData = () => {
  const {
    data: cartData,
    isPending,
    error
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (!user) return [];
      if (userError) console.error(userError.message);

      const { data: productData, error } = await supabase
        .from('cart')
        .select('*, product:product_id(*)')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      return productData.sort((a, b) => {
        const idA = a.product_id ?? '';
        const idB = b.product_id ?? '';
        return idA.localeCompare(idB);
      });
    }
  });
  return { cartData, isPending, error };
};
