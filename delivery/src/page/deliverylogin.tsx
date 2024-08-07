import React, { useState } from "react";
import axios from "axios";

import { box } from "../lib/styles";
import { LargeButton } from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { Modalcontent, Modalstate } from "../Context/Modal/Modal";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

interface IProps {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeliveryLoginPage = ({ setUserLogin }: IProps): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !(password.length < 8 || password.length > 30) &&
      pwReg.test(password) &&
      password !== "" &&
      email !== "" &&
      emailReg.test(email)
    ) {
      try {
        const response = await axios.post(
          `${serverUrl}/deliverylogin`,
          {
            email: email,
            pw: password,
          },
          { withCredentials: true }
        );

        const result = response.data;

        if (response.status === 200) {
          setLoginCheck(false);
          setUserLogin(true);
          console.log("로그인성공, 이메일주소:" + result.email);
          navigate("/");
        } else {
          setLoginCheck(true);
        }
      } catch (error) {
        console.error("오류 발생:", error);
        setLoginCheck(true);
        setModalcontent("not login");
        setsystemonoff(true);
      }
    }
  };

  const emailReg = /^[a-z0-9가-힣]+@[a-z]+\.[a-z]{2,3}$/;
  const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;

  return (
    <div>
      <div className={` ${box}  h-[38.5rem]`}>
        <div className="rounded-lg  w-full m">
          <h2 className="text-2xl font-bold text-center text-blue-500 mt-10">
            햄스터 마켓
          </h2>
          <h2 className="text-2xl font-bold text-center mb-10">
            배송파트너 로그인
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일주소"
              />
              {email !== "" && emailReg.test(email) === false && (
                <div className="text-red-500">
                  이메일 형식에 맞추어 입력해 주세요
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
              {password !== "" &&
                pwReg.test(password) === false &&
                (password.length < 8 || password.length > 30 ? (
                  <div className="text-red-500">
                    "비밀번호는 8글자 이상, 30글자 이하로 작성하세요"
                  </div>
                ) : (
                  <div className="text-red-500">
                    "비밀번호는 영어, 특수문자, 숫자를 포함하세요"
                  </div>
                ))}
            </div>
            <p className="mb-4 flex justify-between"></p>

            {loginCheck && (
              <label style={{ color: "red" }}>
                이메일 혹은 비밀번호가 틀렸습니다.
              </label>
            )}
            <div className="mt-[13rem]" onClick={handleLogin}>
              <LargeButton
                btn={new Button("로그인", "bg-blue-300 w-auto")}
              ></LargeButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DeliveryLoginPage;
