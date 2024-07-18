import { rowfont, center, outborder, nanoBtn } from "../../../lib/styles";
import SellComp from "./contentComps/sellComp";

const Content = ({ loginCheck }: { loginCheck: boolean }): JSX.Element => {
  //comp
  return (
    <div className={`${outborder} w-[90%] h-[781px] flex flex-wrap pt-5`}>
      <div className={`p-10 w-[100%]`}>
        <div className={`${outborder} w-[100%] h-[54px] flex flex-wrap`}></div>
        {/* 바뀌는 부분 */}
        <SellComp></SellComp>
      </div>
    </div>
  );
};

export default Content;
