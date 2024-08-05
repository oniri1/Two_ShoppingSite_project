import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { box, mobilebox } from "../../lib/styles";

import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { IList } from "../../Component/List/ListItem";

interface IProps {
  list: IList[];
  mainDataGet: (i: number) => void;
  obToggleValue: boolean;
  idxValue: number;
}

export interface IData {
  Category: { name: string };
  categoryId: number;
  createdAt: Date;
  discription: string;
  id: number;
  image: [string];
  img: string;
  itemState: string;
  price: number;
  title: string;
}

const Main = ({ idxValue, list, mainDataGet, obToggleValue }: IProps): JSX.Element => {
  const [cookies] = useCookies(["Product"]);
  const { ismobile, isdesktop } = useBreakPoint();
  const [, setrecent] = useState<IList[]>([]);

  // console.log(cookies);

  const procookie = useMemo(() => {
    if (cookies.Product) {
      const products = cookies.Product?.product;

      const recentproduct = products
        .split("+")
        .filter((item: string) => item !== "")
        .filter((item: String, idx: number) => {
          return (
            products
              .split("+")
              .filter((item: string) => item !== "")
              .indexOf(item) === idx
          );
        });
      const data: number[] = recentproduct.map((item: string) => {
        return Number(item);
      });
      return data;
    }
  }, []);

  const getrecent = useMutation({
    mutationKey: ["recentitems"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/recent`,
        { productlist: procookie },
        { withCredentials: true }
      );

      const products = data;
      console.log(products);

      const product = products.productlist;
      const lastdata = product.map((item: IData) => {
        const listdata = {
          id: item.id,
          title: item.title,
          img: item.image
            ? `${process.env.REACT_APP_SERVER_URL}/imgs/${item.image[0]}`
            : "/imgs/hamster.png",
          price: item.price,
          createdAt: Math.floor(
            (+new Date() - +new Date(item.createdAt || new Date() + "")) / (1000 * 60 * 60 * 24)
          ),
        };
        return listdata;
      });
      return lastdata;
    },
  });

  useEffect(() => {
    mainDataGet(idxValue);
    // console.log("?");
  }, []);

  useEffect(() => {
    if (procookie) {
      getrecent.mutate();
      setrecent(getrecent.data);
    }
  }, [procookie]);

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && `${box}`} ${ismobile && mobilebox}`}>
        {getrecent?.data && (
          <div>
            <div className="p-[2rem] text-[1.7rem] font-bold">최근 본 상품</div>
            <List list={getrecent.data} />
          </div>
        )}
        <div>
          <div className="p-[2rem] text-[1.7rem] font-bold">오늘의 추천상품</div>
          <List list={list} func={mainDataGet} funcValue={idxValue} toggleValue={obToggleValue} />
        </div>
      </div>
    </div>
  );
};

export default Main;
