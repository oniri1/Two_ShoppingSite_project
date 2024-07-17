import { useEffect, useMemo, useState } from "react";
import Intro from "./Intro/Intro";
import { center } from "../../lib/styles";
import { IIntro, IMyStoreRes } from "../../InterFace/interFace";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface IProps {}

const MyStore = ({}: IProps): JSX.Element => {
  const [storeName, setStoreName] = useState<string>("오류따봉스터");
  const [storePoint, setStorePoint] = useState<number>(0);
  const [storeIntro, setStoreIntro] = useState<string>(
    "이게 보인다면 무언가 오류가 있습니다. 콘솔을 확인하세요"
  );
  const [storeStar, setStoreStar] = useState<number>(0);
  const [storePFImg, setStorePFImg] = useState<string>("/imgs/good.png");
  const [sellCount, setSellCount] = useState<number>(0);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  const loca = useLocation();
  const serverCall = serverUrl + "/mystore" + loca.search;

  const getPageValues = async () => {
    await axios
      .post(serverCall, {}, { withCredentials: true })
      .then(({ data }: { data: IMyStoreRes }): void => {
        setStoreName(data.store.nick);
        setStorePoint(data.store.point);
        setStoreIntro(data.store.Introduction);
        setStoreStar(data.store.reviewId.star);
        setStorePFImg(data.store.profileimg);
        setSellCount(data.store.sellCount);
        setLoginCheck(data.loginuser);
      })
      .catch((error) => {
        // console.log(error);
        setStoreName("앙 에러띠");
        setStoreStar(3.5);
        setLoginCheck(true);
      });
  };

  const intro = useMemo(() => {
    return {
      storeName: storeName,
      storePoint: storePoint,
      storeIntro: storeIntro,
      storeStar: storeStar,
      storePFImg: storePFImg,
      sellCount: sellCount,
      loginCheck: loginCheck,
    };
  }, [
    storeName,
    storePoint,
    storeIntro,
    storeStar,
    storePFImg,
    sellCount,
    loginCheck,
  ]);

  //mount
  useEffect(() => {
    getPageValues();
  });

  return (
    <div className={`${center}`}>
      <Intro intro={intro}></Intro>
      <div></div>
    </div>
  );
};

export default MyStore;
