import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const callBackUrl: string = `${process.env.REACT_APP_BASE_URL}/NaverLoding`;
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const NaverOAuth = () => {
  const clientId: string | undefined = process.env.REACT_APP_CLIENT_ID;
  const clientSecret: string | undefined = process.env.REACT_APP_CLIENT_SECRET;
  const state: string = Math.random().toString(36).substring(2);

  console.log(state);
  const naverOAuthUrl =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    clientId +
    "&redirect_uri=" +
    callBackUrl +
    "&state=" +
    state;

  const loginHandler = () => {
    window.location.href = naverOAuthUrl;
  };

  return (
    <div
      onClick={loginHandler}
      className="h-[30px] w-[30px] bg-[url('http://static.nid.naver.com/oauth/small_g_in.PNG')] bg-cover"
    ></div>
  );
};

export const NaverCallback = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  const naver = async () => {
    await axios.post(
      `${serverUrl}/NaverCallback?code=${code}&state=${state}`,
      { callbackUrl: callBackUrl },
      {
        withCredentials: true,
      }
    );
    //
  };

  useEffect(() => {
    naver();
  });

  return <div>loding</div>;
};
