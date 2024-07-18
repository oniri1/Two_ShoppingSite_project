import { useState } from "react";
import { rowfont, center, outborder, nanoBtn } from "../../../../lib/styles";
import SellContent from "./sellContents";
import { IProduct } from "../../../../lib/interFace";

const SellComp = () => {
  const [product, setProduct] = useState<IProduct[]>([
    {
      title: "오류시 나오는 전설의 따봉스터",
      discription: "따봉스터도 나오지 않는 전설의 오류",
      price: 123456789,
      state: "판매 완료", //배송중 - 배송현황,판매 완료 - 배송 완료,판매중 - 정보 수정
      img: "/imgs/good.png",
    },
  ]);

  return (
    <div className={`mt-4 w-[100%] h-[90%]`}>
      <div className={`flex pt-5 pb-5 justify-between`}>
        <div className={`pl-1 flex`}>
          <span className={`font-normal text-lg`}>상품 </span>
          <span className={`${center} pl-1`}>
            <span className="text-red-500">{product.length}</span>
            <span>개</span>
          </span>
        </div>
      </div>
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
        {product.map((data: IProduct, idx: number) => {
          return <SellContent key={idx} data={data} />;
        })}
      </div>
    </div>
  );
};

export default SellComp;
