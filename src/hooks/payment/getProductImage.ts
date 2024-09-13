// export const imageSrc = async (name: string) => {

//   const {data, error} = await supabase
//   .from('local_food')
//   .select('title_image')
//   .eq('food_name', name)
//   .single()

//   if(error){
//     console.error(error)
//   }
//   if(!data?.title_image){
//     return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/Tiger_Sad.png'
//   }


//   return data.title_image[0]
// };

//TODO PayHistoryList 의 orderList(product) 가공하는 훅으로 변경 or 제거
export const imageSrc = (name: string) => {
  switch (name) {
    case '옥천 복숭아':
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product1.jpg';

    case '순천 단감':
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product2.jpg';

    case '의성 마늘':
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product4.jpg';

    case '횡성 한우':
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product5.jpg';

    case '논산 딸기':
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product3.jpg';

    default:
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/Tiger_Sad.png';
  }
};