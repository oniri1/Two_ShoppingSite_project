import React, { useRef, useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const NMap = (): JSX.Element => {
  console.log("NMapFunc");
  //맵을 표시할 element를 알려주기 위한 변수
  const mapRef: React.MutableRefObject<null> = useRef(null);

  const [map, setMap] = useState<naver.maps.Map>();

  const [riderPosition, setRiderPosition] = useState<naver.maps.LatLng>();
  const [, setRiderMarker] = useState<naver.maps.Marker>();

  const [userPosition, setUserPosition] = useState<naver.maps.LatLng>();
  const [, setUserMarker] = useState<naver.maps.Marker>();

  const [boundPosition, setBoundPosition] = useState<naver.maps.LatLngBounds>();

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

          console.log(result.y);
          setUserPosition(new naver.maps.LatLng(+result.y, +result.x));
        } else {
          console.error("유저 포지션 변환 오류");
        }
      }
    );
  };

  const getRiderLatLng = async () => {
    await axios
      .post(
        `${serverUrl}/GpsRiderGet`,
        {}, //아이디 추가해야 함
        {}
      )
      .then((data: AxiosResponse<any, any>) => {
        //성공시 콜백
        //성공시 URL
        console.log(data);
      })
      .catch(() => {
        //실패시 URL
        //실패시 URL
        console.error("라이더 위치 실패");
        //유저와 라이더의 위치
        setRiderPosition(new naver.maps.LatLng(36.5, 127.5));
      });
  };

  const getUserAddress = async () => {
    await axios
      .post(
        `${serverUrl}/GpsUserGet`,
        {}, //아이디 추가해야 함
        {}
      )
      .then((data: AxiosResponse<any, any>) => {
        //성공시 URL
        console.log(data);
      })
      .catch(() => {
        //실패시 URL
        console.error("유저 어드레스 실패");
        userPositionSet("서울특별시 강남구 테헤란로 152");
      });
  };
  //

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

  //riderMaker
  useEffect(() => {
    if (riderPosition !== undefined) {
      setRiderMarker(
        new naver.maps.Marker({
          position: riderPosition,
          map: map,
          icon: {
            content:
              '<img src="./imgs/HamsterRider.png" alt="" style="margin: 0px; padding: 0px; border: 2px solid blue; border-radius: 100%; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 35px; height: 35px; left: 0px; top: 0px; overflow: hidden;">',
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
  }, [riderPosition]);

  //boundposition
  useEffect(() => {
    if (userPosition && riderPosition && map) {
      console.log("bound posi reset");
      setBoundPosition(
        new naver.maps.LatLngBounds(riderPosition, userPosition)
      );
    }
  }, [userPosition, riderPosition]);

  //bunding
  useEffect(() => {
    if (map && boundPosition) {
      console.log("bounding");
      map.fitBounds(boundPosition);
    }
  }, [boundPosition]);

  //mount
  useEffect(() => {
    if (mapRef.current && naver) {
      getUserAddress();
      getRiderLatLng();

      //map set
      setMap(
        new naver.maps.Map(mapRef.current, {
          mapTypeId: naver.maps.MapTypeId.NORMAL,
          zoom: 6, // 지도 확대 정도
        })
      );

      console.log("마운트 끝");
    }
  }, []);

  //naverMap으로 바뀐 mapRef을 ref로 참조하여 리턴
  return <div ref={mapRef} className="w-[100%] h-[100%]"></div>;
};

export default NMap;
