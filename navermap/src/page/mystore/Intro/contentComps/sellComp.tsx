import { useEffect, useState } from "react";
import { rowfont, center, outborder, nanoBtn } from "../../../../lib/styles";
import SellContent from "./sellContents";
import { IProduct } from "../../../../lib/interFace";
import Count from "../../../../Component/jabs/Count";
import axios from "axios";
import { sellContentsErr, buyContentsErr } from "../../../../lib/errors";
import { useLocation } from "react-router-dom";

interface IProps {
  value: string;
}

const SellComp = ({ value }: IProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const loca = useLocation();

  const getData = async (value: number) => {
    //판매상품
    if (value === 0) {
      await axios
        .post(`${serverUrl}/mysell${loca.search}`, {}, {})
        .then(() => {})
        .catch(() => {
          setProducts(sellContentsErr);
        });
    }

    //구매상품
    if (value === 1) {
      await axios
        .post(`${serverUrl}/mypurchase${loca.search}`, {}, {})
        .then(() => {})
        .catch(() => {
          setProducts(buyContentsErr);
        });
    }
  };

  //mount
  useEffect(() => {
    console.log("벨류 : ", value);

    if (value === "판매상품") {
      getData(0);
    } else if (value === "구매상품") {
      getData(1);
    }
  }, []);

  return (
    <div className={`mt-4 w-[100%] h-[90%]`}>
      <Count text="상품" number={products.length}></Count>
      <div className={`p-3 grid justify-items-end`}>
        <div className="flex">
          <div className={`${outborder} ${center} p-1 pl-4 pr-4`}>
            상품 등록
          </div>
        </div>
      </div>

      {/* 상품페이지 변환 */}
      <div
        className={`h-auto flex flex-nowrap overflow-x-scroll`}
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((data: IProduct, idx: number) => {
          return <SellContent key={idx} data={data} />;
        })}
      </div>
    </div>
  );
};

export default SellComp;
