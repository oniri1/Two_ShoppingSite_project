import { useEffect, useState } from "react";
import Layout from "./lib/Layout/layout";
import { List } from "./lib/list";

import { useBreakPoint } from "./CustomHook/BreakPoint";
import axios, { AxiosResponse } from "axios";
import { title } from "process";

const App = (): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();

  interface IProduct {
    id: number;
    title: string;
    discription: string;
    price: number;
    createdAt: string;
    img: string;
    Category: {
      name: string;
    };
    image: string[];
  }

  interface IListData {
    id: number;
    title: string;
    img: string;
    price: number;
    createdAt: number;
  }

  const [main, setMain] = useState<List[]>([]);

  const [ListDatas, setListDatas] = useState<IListData[]>([]);

  const mainDataGet = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/main`,
        {},
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        console.log(data);
        const products: IProduct[] = data.data.product;
        const listDatas: IListData[] = products.map((data: IProduct) => {
          const listData: IListData = {
            id: data.id,
            title: data.title,
            img: data.image[0],
            price: data.price,
            createdAt: Math.floor(
              (+new Date() - +new Date(data.createdAt)) / (1000 * 60 * 60 * 24)
            ),
          };
          return listData;
        });
        setListDatas(listDatas);
      })
      .catch(() => {
        setListDatas([
          {
            id: 1,
            title: "자전거",
            img: "hamster.png",
            price: 3000,
            createdAt: 3,
          },
        ]);
      });
  };

  //mount

  useEffect(() => {
    if (ListDatas[0]) {
      setMain(
        ListDatas.map((data) => {
          return new List(
            data.id,
            data.title,
            data.img,
            data.price,
            data.createdAt
          );
        })
      );
    }
  }, [ListDatas]);

  useEffect(() => {
    mainDataGet();
  }, []);

  //
  const [catepage, setCatePage] = useState([
    new List(1, "자동차", "good", 3000, 3),
  ]);

  const [searchpage, setSearchPage] = useState([
    new List(1, "햄스터", "hamster", 3000, 3),
  ]);

  const [userlogin, setUserLogin] = useState<boolean>(false);

  return (
    <div>
      <div>
        <Layout
          setUserLogin={setUserLogin}
          userlogin={userlogin}
          main={main}
          catepage={catepage}
          searchpage={searchpage}
        />
      </div>
    </div>
  );
};

export default App;
