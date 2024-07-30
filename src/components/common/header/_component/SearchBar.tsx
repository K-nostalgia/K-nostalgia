'use client';

import { useQuery } from '@tanstack/react-query';

const SearchBar = () => {
  const fetchSearchMarketData = async (): Promise<any> => {
    try {
      const rs = await fetch('/api/search');
      const data = await rs.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: searchMarketData } = useQuery({
    queryKey: ['searchMarketData'],
    queryFn: fetchSearchMarketData,
    // 데이터 변하지 않음 캐싱 처리
    staleTime: Infinity
  });

  if (searchMarketData) {
    console.log(searchMarketData);
  }
  return <div>Search</div>;
};

export default SearchBar;
