import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useRecoilState, useRecoilValue } from "recoil";
import { MapId, Modal } from "../../../Context/Modal";
import Report from "../Report/Report";
import Buy from "../Buy/Buy";
import NMap from "../../Map/NMap";
import { center, outborder } from "../../../lib/styles";
import { useEffect, useMemo } from "react";
import { SetterOrUpdater } from "recoil";

interface IProps {}

const modal = {
  mobilemenu: <Menu />,
  mobilesearch: <Search />,
  report: <Report />,
  buy: <Buy />,
  showMap: (id: number | undefined) => {
    return <NMap id={id} />;
  },
  // reviewWhite: <ReviewWrite />,
};

const MobileModal = ({}: IProps): JSX.Element => {
  //custom
  const { ismobile, isdesktop } = useBreakPoint();
  const [modalContent, setmodal] = useRecoilState(Modal);

  const mapId = useRecoilValue(MapId);

  //func
  const close = () => {
    setmodal(undefined);
  };

  //hook
  const modalValue = useMemo(() => {
    return modalContent;
  }, [modalContent]);

  const mapIdValue = useMemo(() => {
    return mapId;
  }, [mapId]);

  return (
    <div
      className={`absolute z-[100] ${
        ismobile && "top-[6rem] h-[50rem] w-[100%]"
      } ${
        isdesktop && "top-[15rem] start-[20%] h-[50rem] w-[60%]"
      } bg-gray-100 overflow-scroll scrollbar-hide`}
    >
      <div className="flex justify-end">
        <div onClick={close}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      {/* 콘텐츠 */}

      <div className={`${center}`}>
        {modalValue === "mobilemenu" && modal.mobilemenu}
        {modalValue === "mobilesearch" && modal.mobilesearch}
        {modalValue === "report" && modal.report}
        {modalValue === "buy" && modal.buy}
        {/* {modalContent[0] == "reviewWhite" && modal.reviewWhite} */}
        {modalValue === "showMap" && (
          <div className={`h-[740px] w-[500px] ${center}`}>
            {" "}
            {modal.showMap(mapIdValue)}
          </div>
        )}
      </div>

      {/*  */}
    </div>
  );
};

export default MobileModal;
