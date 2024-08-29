'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

const KaKaomap = () => {
  const { id } = useParams<{ id: string }>();
  const [kakaoMapsLoaded, setKakaoMapsLoaded] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const loadKakaoMaps = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = KAKAO_SDK_URL;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setKakaoMapsLoaded(true);
        });
      };
      document.head.appendChild(script);
    };

    loadKakaoMaps();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!kakaoMapsLoaded) return;

      try {
        const response = await fetch(`/api/market/map?id=${id}`);
        const { data } = await response.json();

        if (data && data.도로명주소) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(data.도로명주소, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK && result[0]) {
              const coords = {
                lat: parseFloat(result[0].y),
                lng: parseFloat(result[0].x)
              };
              setLocation(coords);
            }
          });
        }
      } catch (error) {
        console.error('지도 불러오기 에러 ', error);
      }
    };

    fetchData();
  }, [id, kakaoMapsLoaded]);

  if (!kakaoMapsLoaded || !location) {
    return <div>Loading...</div>;
  }

  // 커스텀 마커 이미지 설정
  // const markerImage = {
  //   src: '/image/StateSad.png',
  //   size: {
  //     width: 64, // 이미지의 너비
  //     height: 64 // 이미지의 높이
  //   },
  //   options: {
  //     offset: {
  //       x: 27, // 앵커 X 위치
  //       y: 69 // 앵커 Y 위치
  //     }
  //   }
  // };

  return (
    <div className="border border-secondary-20 rounded-xl overflow-hidden">
      <Map
        center={location}
        scrollwheel={false}
        className="w-[343px] h-[200px] md:w-[1280px] md:h-[512px]"
        level={5}
      >
        <MapMarker position={location} />
        {/* <MapMarker position={location} image={markerImage} />
        <CustomOverlayMap position={location} yAnchor={1}>
          {/* <div dangerouslySetInnerHTML={{ __html: overlayContent }} /> */}
        {/* </CustomOverlayMap> */}
      </Map>
    </div>
  );
};

export default KaKaomap;
