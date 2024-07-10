import React, { useRef, useState, useEffect } from "react";

const NMap = (): JSX.Element => {
  const mapRef: React.MutableRefObject<null> = useRef(null);

  const [riderX, setRiderX] = useState<number>(35);
  const [riderY, setRiderY] = useState<number>(127);
  const [userX, setUserX] = useState<number>(36.5);
  const [userY, setUserY] = useState<number>(126.5);

  useEffect(() => {
    if (mapRef.current && naver) {
      //네이버 맵에 사용할 Lat Lng를 설정해주는 코드
      //유저와 라이더의 위치
      const riderPosition: naver.maps.LatLng = new naver.maps.LatLng(
        riderX,
        riderY
      );
      const userPosition: naver.maps.LatLng = new naver.maps.LatLng(
        userX,
        userY
      );

      //new naver.maps.Map(타겟,옵션)을 넣는다. 타겟이 naverMap 옵션을 가지게 된다.
      const map: naver.maps.Map = new naver.maps.Map(mapRef.current, {
        mapTypeId: naver.maps.MapTypeId.NORMAL,
        center: riderPosition,
        zoom: 6, // 지도 확대 정도
      });

      // 두개를 보여줄 바운딩 포지션
      const boundPosition: naver.maps.LatLngBounds =
        new naver.maps.LatLngBounds(riderPosition, userPosition);
      map.fitBounds(boundPosition);

      //마커를 생성하는 클래스 ({옵션들,좌표를 찍을 맵})
      new naver.maps.Marker({
        position: riderPosition,
        map: map,
        icon: {
          content:
            '<img src="./imgs/HamsterRider.png" alt="" style="margin: 0px; padding: 0px; border: 2px solid blue; border-radius: 100%; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 35px; height: 35px; left: 0px; top: 0px; overflow: hidden;">',
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35),
        },
      });

      //유저 마커
      new naver.maps.Marker({
        position: userPosition,
        map: map,
        icon: {
          content:
            '<img src="./imgs/HamsterWaiter.png" alt="" style="margin: 0px; padding: 0px; border: 2px solid red; border-radius: 100%; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 35px; height: 35px; left: 0px; top: 0px; overflow: hidden;">',
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35),
        },
      });
    }
  }, []);

  //naverMap으로 바뀐 mapRef을 ref로 참조하여 리턴
  return <div ref={mapRef} className="w-[100%] h-[100%]"></div>;
};

export default NMap;
