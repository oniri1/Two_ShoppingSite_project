import {
  rowfont,
  center,
  outborder,
  nanoBtn,
  blockTextOver,
} from "../../../../lib/styles";
import { FaMapMarkerAlt } from "react-icons/fa";
import SCbuttons from "./buttons";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../../lib/interFace";
import { useEffect, useState } from "react";

interface IProps {
  data: IProduct;
}

const SellContent = ({ data }: IProps) => {
  const navigate = useNavigate();

  const [imgCurtainActive, setImgCurtainActive] = useState<boolean>(false);
  const [boxTextValue, setBoxTextValue] = useState<string>("정보수정");

  const moveToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    if (imgCurtainActive) {
      if (data.state === "배송중") {
        setBoxTextValue("배송현황");
      }
      if (data.state === "판매 완료") {
        setBoxTextValue("배송완료");
      }
    }
  }, [imgCurtainActive]);

  //mount
  useEffect(() => {
    if (data.state !== "판매중") {
      setImgCurtainActive(true);
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
            backgroundImage: `url(${data.img})`,
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
                  {data.state}
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
        <SCbuttons text={boxTextValue} />
      </div>
    </div>
  );
};

export default SellContent;
