import React, { useRef, useState, useEffect, useCallback } from "react";

const NMap = (): JSX.Element => {
  console.log("NMapFunc");
  //맵을 표시할 element를 알려주기 위한 변수
  const mapRef: React.MutableRefObject<null> = useRef(null);

  const [map, setMap] = useState<naver.maps.Map>();

  const [riderLng, setRiderLng] = useState<number>(127);
  const [riderLat, setRiderLat] = useState<number>(35);

  const [userPosition, setUserPosition] = useState<naver.maps.LatLng>();

  const [, setUserMarker] = useState<naver.maps.Marker>(); //유저 마커

  //func
  const userPositionSet = (address: string) => {
    //주소 반환
    naver.maps.Service.geocode(
      { query: address },
      (status: number, response: naver.maps.Service.GeocodeResponse) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.error("Something wrong!");
          return;
        }

        //어드레스 있으면
        if (response.v2.addresses.length > 0) {
          const result = response.v2.addresses[0];

          setUserPosition(new naver.maps.LatLng(+result.y, +result.x));
        } else {
          console.error("유저 포지션 변환 오류");
        }
      }
    );
  };

  //userMaker
  useEffect(() => {
    if (userPosition !== undefined) {
      setUserMarker(
        new naver.maps.Marker({
          position: userPosition,
          map: map,
          icon: {
            content:
              '<img src="./imgs/HamsterWaiter.png" alt="" style="margin: 0px; padding: 0px; border: 2px solid red; border-radius: 100%; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 35px; height: 35px; left: 0px; top: 0px; overflow: hidden;">',
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
  }, [userPosition]);

  //main
  useEffect(() => {
    console.log("mount");

    if (mapRef.current && naver) {
      //네이버 맵에 사용할 Lat Lng를 설정해주는 코드
      //유저와 라이더의 위치
      const riderPosition: naver.maps.LatLng = new naver.maps.LatLng(
        riderLat,
        riderLng
      );

      //new naver.maps.Map(타겟,옵션)을 넣는다. 타겟이 naverMap 옵션을 가지게 된다.
      setMap(
        new naver.maps.Map(mapRef.current, {
          mapTypeId: naver.maps.MapTypeId.NORMAL,
          center: riderPosition,
          zoom: 6, // 지도 확대 정도
        })
      );

      ///
      const address = "서울특별시 강남구 테헤란로 152";
      userPositionSet(address);
      ///

      // 두개를 보여줄 바운딩 포지션
      if (
        riderPosition !== undefined &&
        userPosition !== undefined &&
        map !== undefined
      ) {
        const boundPosition: naver.maps.LatLngBounds =
          new naver.maps.LatLngBounds(riderPosition, userPosition);
        map.fitBounds(boundPosition);
      }

      //마커를 생성하는 클래스 ({옵션들,좌표를 찍을 맵})
      //라이더 마커
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
    }
  }, []);

  //naverMap으로 바뀐 mapRef을 ref로 참조하여 리턴
  return <div ref={mapRef} className="w-[100%] h-[100%]"></div>;
};

export default NMap;
