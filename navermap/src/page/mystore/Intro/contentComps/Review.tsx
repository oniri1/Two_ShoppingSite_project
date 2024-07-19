import Star from "../../../../Component/Star/Star";
import { center, outborder, rowfont, weightfont } from "../../../../lib/styles";
import Count from "../../../../Component/jabs/Count";
import ReviewOne from "./ReviewOne";

import { IReviewOne, IReviewRes } from "../../../../lib/interFace";
import { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

const Review = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const loca = useLocation();

  const reviewUrl = `${serverUrl}/review${loca.search}`;

  const [reviews, setReviews] = useState<IReviewOne[]>([]);
  const [reviewRes, setReviewRes] = useState<IReviewRes>();

  const errNum = 3.5;

  //func
  const getReviews = async () => {
    await axios
      .post(reviewUrl, {}, {})
      .then((data: AxiosResponse) => {
        const reviewRes: IReviewRes = data.data;
        setReviewRes(reviewRes);
      })
      .catch(() => {
        const errRes: IReviewRes = {
          reviewlist: [
            {
              star: errNum,
              reviewContent: "오류가 뜨면 찾아오는 따봉스터",
              Store: {
                nick: "따봉스터",
                img: "./imgs/good.png",
              },
              Product: {
                title: "따봉스터를 봤다면 코드를 버려라",
              },
            },
            {
              star: errNum,
              reviewContent: "오류가 뜨면 찾아오는 따봉스터",
              Store: {
                nick: "따봉스터",
                img: "./imgs/good.png",
              },
              Product: {
                title: "따봉스터를 봤다면 코드를 버려라",
              },
            },
          ],
        };
        setReviewRes(errRes);
      });
  };

  //   useEffect(() => {}, [reviews]);

  useEffect(() => {
    if (reviewRes) setReviews(reviewRes.reviewlist);
  }, [reviewRes]);

  //mount
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className={`mt-4 w-[100%] h-[90%]`}>
      <Count text="리뷰" number={reviewRes?.reviewCount || 0}></Count>
      {/* 리뷰 평균 */}
      <div
        className={`border-2 border-[#e5e7eb] rounded-xl ${center} w-[100%] h-[80px] p-[10px]`}
      >
        {/* 별 */}
        <div className="w-[50%] border-r-2">
          <div className={`${center} ${weightfont}`}>
            {reviewRes?.reviewAverage?.star || errNum}
          </div>
          <Star
            storeStar={reviewRes?.reviewAverage?.star || errNum}
            textActive={false}
          ></Star>
        </div>
        {/* 퍼센트 */}
        <div className="w-[50%]">
          <div className={`${center} ${weightfont}`}>
            <span>{reviewRes?.reviewPercent || 100}</span>
            <span>%</span>
          </div>
          <div className={`${center} ${rowfont} font-bold text-stone-400`}>
            만족후기
          </div>
        </div>
      </div>
      {/* 리뷰들 */}
      <div
        className={`mt-4 h-[450px] overflow-scroll`}
        style={{ scrollbarWidth: "none" }}
      >
        {/* 리뷰하나 */}
        {reviews.map((data: IReviewOne, idx: number) => {
          return <ReviewOne key={idx} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Review;
