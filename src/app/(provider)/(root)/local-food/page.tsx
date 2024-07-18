'use client';
import React, { useEffect } from 'react';

const LocalFood = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/market');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('데이터를 가져오지 못했습니다.', error);
      }
    };
    fetchData();
  }, []);

  return <>시장페이지</>;
};

export default LocalFood;
