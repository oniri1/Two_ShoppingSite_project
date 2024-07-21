import { center, blockTextOver } from "../../../../lib/styles";
import SCbuttons from "./buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../../../../lib/interFace";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../../../../Context/Modal";
import { useSetRecoilState, useRecoilState } from "recoil";

interface IProps {
  data: IProduct;
  isBuyTap?: boolean;
}

const SellContent = ({ data, isBuyTap = false }: IProps) => {
  //state
  const [imgCurtainActive, setImgCurtainActive] = useState<boolean>(false);
  const [boxTextValue, setBoxTextValue] = useState<string>("정보수정");

  //hooks
  const navigate = useNavigate();
  const ModalState = useSetRecoilState(Modal);

  //custom
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const loca = useLocation();
  const callbackUrl = `${loca.pathname}${loca.search}`;
  const imgBase = process.env.REACT_APP_IMG_BASE;

  //funcs
  const moveToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  //// text = 정보수정 배송현황 리뷰쓰기 구매확정
  const moveToProductRetouch = () => {
    if (data.id) {
      navigate(`/write/${data.id}`);
    } else {
      console.log("정보수정 error", data.id);
    }
  };

  const showMapModal = () => {
    ModalState("showMap");
  };

  const showReviewModal = () => {
    ModalState("reviewWhite");
  };

  const confirmation = () => {
    axios
      .post(`${serverUrl}/purchase/${data.id}`, {}, { withCredentials: true })
      .then(() => {
        navigate(`${callbackUrl}`);
      })
      .catch((err) => {
        navigate(`${callbackUrl}`);
        console.log(err);
      });
  };

  const funcsHandler = (value: string) => {
    if (value === "정보수정") {
      return moveToProductRetouch();
    } else if (value === "배송현황") {
      return showMapModal();
    } else if (value === "리뷰쓰기") {
      return showReviewModal();
    } else if (value === "구매확정") {
      return confirmation();
    } else {
      return () => {
        console.log("error");
      };
    }
  };

  //mount
  useEffect(() => {
    if (data.itemState !== "판매중") {
      setImgCurtainActive(true);

      if (data.itemState === "배송중") {
        setBoxTextValue("배송현황");
      }
      if (data.itemState === "판매 완료" || data.itemState === "판매완료") {
        setBoxTextValue("배송완료");
      }
      if (data.itemState === "구매 완료" || data.itemState === "구매완료") {
        setBoxTextValue("리뷰쓰기");
      }
    }
  }, []);

  return (
    <div
      className={`h-[420px] min-w-[220px]`}
      onClick={() => {
        if (data.id) {
          moveToProduct(data.id + "");
        } else {
          console.log("전설의 따봉스터가 오류를 표합니다!");

          return;
        }
      }}
    >
      <div className={`border-2`}>
        {/* 이미지 */}
        <div
          className={`h-[220px] bg-cover relative ${center}`}
          style={{
            backgroundImage: `url(${imgBase}${data.img})`,
          }}
        >
          {imgCurtainActive && (
            <>
              <div
                className={`${center} bg-black opacity-35 h-[100%] w-[100%]`}
              />
              <div
                className={`${center} absolute border-2 border-white rounded-full w-[80px] h-[80px]`}
              >
                <div
                  className={`flex text-white ${blockTextOver} text-2xl font-medium`}
                >
                  {data.itemState}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 상품 정보 */}
        <div className={``}>
          <div className={`p-2 border-b-2`}>{data.title}</div>
          <div className={`p-2 flex justify-between`}>
            <span>
              <span className="pr-1 font-semibold">{data.price}</span>
              <span>원</span>
            </span>
            <span>
              {data.createdAt
                ? Math.floor(
                    (+new Date() - +new Date(data.createdAt)) /
                      (1000 * 60 * 60 * 24)
                  ) + "일전"
                : "따봉일"}
            </span>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-between p-1">
        {isBuyTap && data.itemState === "배송중" && (
          <SCbuttons
            text={"구매확정"}
            click={() => {
              funcsHandler("구매확정");
            }}
          />
        )}
        {boxTextValue !== "배송완료" && (
          <SCbuttons
            text={boxTextValue}
            click={() => {
              funcsHandler(boxTextValue);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SellContent;
