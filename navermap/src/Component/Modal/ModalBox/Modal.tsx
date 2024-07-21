import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal } from "../../../Context/Modal";
import Report from "../Report/Report";
import Buy from "../Buy/Buy";
import NMap from "../../Map/NMap";
import { center, outborder } from "../../../lib/styles";
import { useEffect, useMemo } from "react";

interface IProps {}

const modal = {
  mobilemenu: <Menu />,
  mobilesearch: <Search />,
  report: <Report />,
  buy: <Buy />,
  showMap: <NMap />,
  // reviewWhite: <ReviewWrite />,
};

const MobileModal = ({}: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const modalContent = useRecoilState(Modal);
  const setmodal = useSetRecoilState(Modal);
  const close = () => {
    setmodal(undefined);
  };

  //hook
  const modalValue = useMemo(() => {
    return modalContent[0];
  }, [modalContent[0]]);

  return (
    <div
      className={`absolute z-[100] ${
        ismobile && "top-[6rem] h-[50rem] w-[100%]"
      } ${
        isdesktop && "top-[15rem] start-[20%] h-[50rem] w-[60%]"
      }   bg-gray-100 overflow-scroll scrollbar-hide`}
    >
      <div className="flex justify-end">
        <div onClick={close}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      {/* 콘텐츠 */}
      {modalValue !== "showMap" && (
        <div className={`${outborder} min-w-[50%] min-h-[50%]`}>
          {modalValue === "mobilemenu" && modal.mobilemenu}
          {modalValue === "mobilesearch" && modal.mobilesearch}
          {modalValue === "report" && modal.report}
          {modalValue === "buy" && modal.buy}
          {/* {modalContent[0] == "reviewWhite" && modal.reviewWhite} */}
        </div>
      )}
      {modalValue === "showMap" && (
        <div className="h-[95%] w-[100%]">{modal.showMap}</div>
      )}
    </div>
  );
};

export default MobileModal;
