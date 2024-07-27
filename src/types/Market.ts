export interface Welcome5 {
  currentCount: number;
  data: Market[];
  matchCount: number;
  page: number;
  perPage: number;
  totalCount: number;
}

export interface Market {
  '간이 도서관_보유여부': 보유여부;
  고객동선통로_보유여부: 보유여부;
  '고객지원센터 보유 여부': 보유여부;
  고객휴게실_보유여부: 보유여부;
  공동물류창고_보유여부: 보유여부;
  교육장_보유여부: 보유여부;
  도로명주소: string;
  문화교실_보유여부: 보유여부;
  물품보관함_보유여부: 보유여부;
  방송센터_보유여부: 보유여부;
  쇼핑카트_보유여부: 보유여부;
  수유센터_보유여부: 보유여부;
  '스프링쿨러 보유 여부': 보유여부;
  시군구: string;
  시도: string;
  '시장 유형': 시장유형;
  시장명: string;
  '시장전용 고객주차장_보유여부': 보유여부;
  '아케이드 보유 여부': 보유여부;
  엘리베이터_에스컬레이터_보유여부: 보유여부;
  '외국인 안내센터_보유여부': 보유여부;
  유아놀이방_보유여부: 보유여부;
  자동심장충격기_보유여부: 보유여부;
  자전거보관함_보유여부: 보유여부;
  종합콜센터_보유여부: 보유여부;
  지번주소: string;
  체육시설_보유여부: 보유여부;
  '화재감지기 보유여부': 보유여부;
  회의실_보유여부: 보유여부;
}

export enum 보유여부 {
  N = 'N',
  Y = 'Y'
}

export enum 시장유형 {
  전통시장 = '전통시장'
}

// export type Market = {
//   시장명: 'string';
//   시장유형: 'string';
//   시군구: 'string';
//   시도: 'string';
//   지번주소: 'string';
//   도로명주소: 'string';
//   시장전용고객주차장_보유여부: 'string';
//   물품보관함_보유여부: 'string';
//   고객지원센터_보유여부: 'string';
//   외국인안내센터_보유여부: 'string';
//   수유센터_보유여부: 'string';
//   유아놀이방_보유여부: 'string';
//   자전거보관함_보유여부: 'string';
//   자동심장충격기_보유여부: 'string';
// };

// export type Market = {
//   mrktNm: string;
//   mrktType: string;
//   rdnmadr: string;
//   lnmadr: string;
//   mrktEstblCycle: string;
//   latitude: string;
//   longitude: string;
//   storNumber: string;
//   trtmntPrdlst: string;
//   useGcct: string;
//   homepageUrl: string;
//   pblicToiletYn: string;
//   prkplceYn: string;
//   estblYear: string;
//   phoneNumber: string;
//   referenceDate: Date;
//   insttCode: string;
// };
