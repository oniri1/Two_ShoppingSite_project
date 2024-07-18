import { useEffect, useState } from "react";

const SCbuttons = ({ text }: { text: string }) => {
  const [colorChange, setColorChange] = useState<boolean>(false);

  // mount
  useEffect(() => {
    if (text !== "배송현황") {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  }, [text]);

  return (
    <div
      className={`p-2 px-4 ${
        colorChange ? "bg-sky-200" : "bg-yellow-500 opacity-50"
      }`}
    >
      <span className="font-medium text-white">{text}</span>
    </div>
  );
};

export default SCbuttons;
