import { rowfont, center, outborder, nanoBtn } from "../../../lib/styles";
import SellComp from "./contentComps/sellComp";
import CateBtn from "./contentComps/catebutton";
import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./contentComps/Review";

const Content = ({ loginCheck }: { loginCheck: boolean }): JSX.Element => {
  const [value, setValue] = useState<string>("리뷰");
  const [isReview, setIsReview] = useState<boolean>(true);

  //func
  const valueChanger = (value: string) => {
    setValue(value);
    if (value === "리뷰") {
      setIsReview(true);
    } else {
      setIsReview(false);
    }
  };

  //comp
  return (
    <div className={`${outborder} w-[90%] h-[781px] flex flex-wrap pt-5`}>
      <div className={`p-10 w-[100%]`}>
        <div className={`${outborder} w-[100%] h-[54px] flex flex-wrap`}>
          <CateBtn text="리뷰" click={() => valueChanger("리뷰")}></CateBtn>
          {loginCheck && (
            <>
              <CateBtn
                text="판매상품"
                click={() => valueChanger("판매상품")}
              ></CateBtn>
              <CateBtn
                text="구매상품"
                click={() => valueChanger("구매상품")}
              ></CateBtn>
            </>
          )}
        </div>
        {/* 바뀌는 부분 */}
        {loginCheck && isReview ? <></> : <SellComp value={value}></SellComp>}
        {isReview ? <Review></Review> : <></>}
        {/*  */}
      </div>
    </div>
  );
};

export default Content;
