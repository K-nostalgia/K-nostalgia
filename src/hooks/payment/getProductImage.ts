//특산품 이름을 key로, 이미지 url을 value로 갖는 객체
//상품이 추가될 경우 직접 추가해야함
//후에 상품이 너무 많아지면 db에서 가져오는 형식으로 바꾸는 게 좋을 것

//update : 24.9.30

type ImageSrc = {
  [key: string]: string
}
export const imageSrc : ImageSrc  = {
     '옥천 복숭아': 
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product1.jpg',

     '순천 단감': 
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product2.jpg',

     '의성 마늘': 
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product4.jpg',

     '횡성 한우':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product5.jpg',

     '논산 딸기':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product3.jpg',

     '영덕 대게':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product6.jepg',

     '안동 간고등어':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product7.jepg',

     '이천 도자기 찻잔':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product8.jepg',

     '해남 배추':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product9.jpeg',

     '가평 잣':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product10.jpeg',
    
     '청양 고추':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product11.png',
    
     '부여 밤':
       'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/product12.png'
};