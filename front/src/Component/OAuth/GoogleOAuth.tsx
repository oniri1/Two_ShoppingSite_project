import { NavigateFunction, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import axios from "axios";

const callBackUrl: string = `${process.env.REACT_APP_BASE_OAUTH_URL}/GoogleLoding`;

const serverOAuthCallbackUrl = process.env.REACT_APP_SERVER_OAUTH_CALLBACK_URL;

//구글 OAuth로 로그인하는 버튼을 만드는 Component
export const GoogleOAuth = (): JSX.Element => {
  //구글 클라이언트에서 발급받은 클라이언트 아이디
  const googleClientId: string | undefined = process.env.REACT_APP_G_CLIENT_ID;

  //여기서 URL을 생성, 단순하게 href용임
  const googleOAuthUrl: string = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${callBackUrl}`;

  //URL로 이동시키는 펑션
  const loginHandler = () => {
    window.location.href = googleOAuthUrl;
  };

  //구글 버튼
  return (
    <div
      onClick={loginHandler}
      className={`cursor-pointer flex items-center justify-center p-2 bg-white border rounded shadow hover:bg-gray-100 w-[100%]`}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className={`w-6 h-6 mr-2`}
      />
      <span className={`text-gray-700 font-medium`}>Google 로그인</span>
    </div>
  );
};

interface IGCProp {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

//구글 콜백용 페이지
export const GoogleCallback = ({ setUserLogin }: IGCProp): JSX.Element => {
  //리액트 라우터 돔에서 제공해주는 url 변경용 훅
  const navigate: NavigateFunction = useNavigate();
  //네이버 OAuth 콜백시 주소로 데이터가 넘어오기 때문에 주소에서 데이터를 뽑아 사용해줄거다.

  //구글 서버에서 받아온 1회용 코드
  const code: string | null = useMemo(() => {
    return new URL(window.location.href).searchParams.get("code");
  }, []);

  //네이버 콜백시 서버에서 res를 받아오는 코드
  const google = useCallback(async () => {
    //우리의 서버(express)로 보내기 (난 8001포트)
    await axios
      .post(
        `${serverOAuthCallbackUrl}/GoogleCallback?code=${code}`, //서버로 보내는 데이터, 보디에 넣어 처리해도 되긴 함(서버 만드는 사람 마음대로 해도 됌)
        { callbackUrl: callBackUrl }, //서버에서 콜백 url이 필요해서 넣어줌
        {
          withCredentials: true, //쿠키, 증명서 이런거 받아오겠다.
        }
      )
      .then(() => {
        //성공시 콜백
        setUserLogin(true);
        //성공시 URL
        navigate("/");
      })
      .catch(() => {
        //실패시 URL

        //실패시 URL
        navigate("/");
      });
  }, [code, navigate, setUserLogin]);

  //컴포넌트 생성시 google 실행
  useEffect(() => {
    google();
  }, [google]);

  return <div>loding</div>;
};
