import { useState, ChangeEvent } from "react";
import { IIntro } from "../../../lib/interFace";
import { getClip } from "../../../lib/func";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Star from "../../../Component/Star/Star";

import { rowfont, center, outborder, nanoBtn } from "../../../lib/styles";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Intro = ({ intro }: IIntro): JSX.Element => {
  const {
    storeName,
    storePoint,
    storeIntro,
    storeStar,
    storePFImg,
    sellCount,
    loginCheck,
  } = intro;

  const [nameBtn, setNameBtn] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>("");

  const [contentBtn, setContentBtn] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<string>("");

  const navigate = useNavigate();
  const loca = useLocation();
  const callbackUrl = `${loca.pathname}${loca.search}`;

  console.log(callbackUrl);
  //func
  const nameBtnOpen = () => {
    setNameBtn(true);
  };

  const storeNameHandler = async () => {
    if (nameValue !== "") {
      const serverCall = serverUrl + "/myStoreNameSet" + loca.search;

      await axios
        .post(serverCall, { name: nameValue }, {})
        .then(() => {
          navigate(`${callbackUrl}`);
        })
        .catch((error) => {
          navigate(`${callbackUrl}`);
        })
        .finally(() => {
          setNameValue("");
          setNameBtn(false);
        });
    }
  };

  const contentBtnOpen = () => {
    setContentBtn(true);
  };

  const storeContentHandler = async () => {
    if (contentValue !== "") {
      const serverCall = serverUrl + "/myStoreContentSet" + loca.search;

      await axios
        .post(serverCall, { content: contentValue }, {})
        .then(() => {
          navigate(`${callbackUrl}`);
        })
        .catch((error) => {
          console.log(error);
          navigate(`${callbackUrl}`);
        })
        .finally(() => {
          setContentValue("");
          setContentBtn(false);
        });
    }
  };

  //

  return (
    <div
      className={`border-2 border-gray-300 w-[95%] h-[350px] p-5 flex justify-between gap-[4%]`}
    >
      {/*  */}
      <div
        style={{
          backgroundImage: "url('/imgs/banner.png')",
        }}
        className={`${center} w-[35%] h-[100%] bg-cover relative`}
      >
        <div className="bg-black bg-opacity-25 w-[100%] h-[100%] absolute"></div>
        {/* 프로파일 이미지 */}
        <div className={`w-[100px] h-[100px] z-20`}>
          <div
            style={{
              backgroundImage: `url(${storePFImg})`,
            }}
            className={`w-[100%] h-[100%] bg-cover rounded-full overflow-hidden`}
          ></div>
          {/* 이름, 별, 평점 */}
          <div>
            {/* 이름 */}
            <div className={`${center} text-white font-bold`}>{storeName}</div>
            {/* 별, 평점 */}
            <Star storeStar={storeStar} />
          </div>
        </div>
        {/*  */}
      </div>

      {/*  */}
      <div className={`w-[65%] h-[100%] p-1 [&>*]:mb-4`}>
        <div className={`flex gap-2`}>
          <div className="font-bold">{storeName}</div>
          {loginCheck && (
            <button className={`${rowfont} ${nanoBtn}`} onClick={nameBtnOpen}>
              상점명 수정
            </button>
          )}
          {nameBtn && (
            <>
              <input
                value={nameValue}
                onInput={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) => {
                  setNameValue(value);
                }}
                className={`${outborder} h-[24px]`}
                type="text"
              />
              <button
                onClick={storeNameHandler}
                className={`${rowfont} ${nanoBtn}`}
              >
                수정하기
              </button>
            </>
          )}
        </div>
        <div className={`flex gap-[2%]`}>
          <div className={`${rowfont} text-gray-400`}>
            상품 판매 {sellCount}
          </div>
          {loginCheck && (
            <div className={`${rowfont}`}>보유 포인트:{storePoint}</div>
          )}
        </div>
        <div className={`${rowfont} h-[65%]`}>{storeIntro}</div>
        {loginCheck && (
          <div className={`flex`}>
            <button
              onClick={contentBtnOpen}
              className={`${center} ${rowfont} ${nanoBtn} h-[24px]`}
            >
              소개글 수정
            </button>
            {contentBtn && (
              <>
                <input
                  value={contentValue}
                  onInput={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setContentValue(value);
                  }}
                  className={`${outborder} h-[24px] ml-2`}
                  type="text"
                />
                <button
                  onClick={storeContentHandler}
                  className={`${rowfont} ${nanoBtn}`}
                >
                  수정하기
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
