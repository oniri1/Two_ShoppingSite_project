export interface IIntro {
  intro: {
    storeName: string;
    storePoint: number;
    storeIntro: string;
    storeStar: number;
    storePFImg: string;
    sellCount: number;
    loginCheck: boolean;
  };
}

export interface IMyStoreRes {
  store: {
    nick: string;
    point: number;
    Introduction: string;
    reviewId: { star: number };
    profileimg: string;
    sellCount: number;
  };
  loginuser: boolean;
}

export interface IProduct {
  id?: number;
  title: string;
  discription: string;
  price: number;
  createdAt?: string;
  state: string;
  prepayment?: boolean;
  img: string;
  deliveryCostId?: { cost: number };
  categoryId?: { name: string };
}
