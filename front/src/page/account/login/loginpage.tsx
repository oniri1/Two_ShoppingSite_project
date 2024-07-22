import { center } from "../../../lib/styles";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LargeButton from "../../../Component/Button/Button";
import { Button } from "../../../lib/Button/Button";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";

interface IProps {}

const LoginPage = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });

      const result = response.data;

      if (response.status === 200) {
        setLoginCheck(false);
        // Store token in local storage
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("email", result.email); // 여기서 email을 저장합니다.
        console.log("로그인성공, 이메일주소:" + result.email);
        navigate("/"); // 로그인 성공시 홈으로 이동합니다.
      } else {
        setLoginCheck(true);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      setLoginCheck(true);
    }
  };

  const emailReg = /^[a-z0-9가-힣]+@[a-z]+\.[a-z]{2,3}$/;
  const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;

  return (
    <div>
      <div className={`${ismobile && "px-4 h-[40rem]"} Box ${center}`}>
        <div className="rounded-lg  w-full m">
          <h2 className="text-2xl font-bold text-center text-orange-500 mt-10">
            햄스터 마켓
          </h2>
          <h2 className="text-2xl font-bold text-center mb-10">로그인</h2>
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
              {email !== "" && emailReg.test(email) == false && (
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
                pwReg.test(password) == false &&
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
            <p className="mb-4 flex justify-between">
              <div>
                <input type="checkbox" className="mr-2" />
                자동 로그인
              </div>
              <div className="">
                <Link to={"/findID"}>아이디찾기 /</Link>
                <Link to={"/findPW"}> 비밀번호찾기</Link>
              </div>
            </p>
            <div className="flex justify-between mb-20">
              <button
                type="button"
                className="w-1/2 bg-green-500 text-white p-2 rounded mr-2"
              >
                네이버로 로그인
              </button>
              <button
                type="button"
                className="w-1/2 bg-gray-500 text-white p-2 rounded"
              >
                카카오로 로그인
              </button>
            </div>
            {loginCheck && (
              <label style={{ color: "red" }}>
                이메일 혹은 비밀번호가 틀렸습니다.
              </label>
            )}
            <div onClick={handleLogin}>
              <LargeButton
                btn={new Button("로그인", "bg-amber-300 w-auto")}
              ></LargeButton>
            </div>
            <div className="text-center mt-4">
              햄스터 마켓 계정이 없으신가요?
            </div>
            <div className="text-center">
              지금바로{" "}
              <a href="/regist" className="text-blue-500">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
