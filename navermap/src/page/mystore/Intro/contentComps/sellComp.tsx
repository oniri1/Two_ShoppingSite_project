import { useEffect, useState } from "react";
import { rowfont, center, outborder, nanoBtn } from "../../../../lib/styles";
import SellContent from "./sellContents";
import { IProduct, IProductRes } from "../../../../lib/interFace";
import Count from "../../../../Component/jabs/Count";
import axios, { AxiosResponse } from "axios";
import { sellContentsErr, buyContentsErr } from "../../../../lib/errors";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  value: number;
}

const SellComp = ({ value }: IProps) => {
  //State
  const [products, setProducts] = useState<IProduct[]>([]);

  //env
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  //values
  const loca = useLocation();
  const navigate = useNavigate();

  const getData = async (value: number) => {
    //판매상품
    if (value === 1) {
      await axios
        .post(
          `${serverUrl}/mysell${loca.search}`,
          {},
          { withCredentials: true }
        )
        .then((data: AxiosResponse) => {
          const res: IProductRes = data.data;
          const products: IProduct[] = res.product.rows;
          setProducts(products);
        })
        .catch(() => {
          setProducts(sellContentsErr);
        });
    }

    //구매상품
    if (value === 2) {
      await axios
        .post(
          `${serverUrl}/mypurchase${loca.search}`,
          {},
          { withCredentials: true }
        )
        .then((data: AxiosResponse) => {
          const res: IProductRes = data.data;
          const products: IProduct[] = res.product.rows;
          setProducts(products);
        })
        .catch(() => {
          setProducts(buyContentsErr);
        });
    }
  };

  const moveToProductWrite = () => {
    navigate("/sell");
  };

  //mount
  useEffect(() => {
    console.log("벨류 : ", value);
    getData(value);
  }, [value]);

  return (
    <div className={`mt-4 w-[100%] h-[90%]`}>
      <Count text="상품" number={products.length}></Count>
      <div className={`p-3 grid justify-items-end`}>
        <div className="flex">
          {value === 1 && (
            <div
              onClick={moveToProductWrite}
              className={`${outborder} ${center} p-1 pl-4 pr-4`}
            >
              상품 등록
            </div>
          )}
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
