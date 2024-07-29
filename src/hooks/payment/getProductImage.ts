export const imageSrc = (name: string) => {
  switch (name) {
    case '옥천 복숭아':
      return 'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product1.jpg';

    case '창원 단감':
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