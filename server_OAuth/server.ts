import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import axios from "axios";

const app: Express = express();

dotenv.config();

app.set("port", 8001);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

const client_id: string | undefined = process.env.CLIENT_ID;
const client_secret: string | undefined = process.env.CLIENT_SECRET;

app.post("/NaverCallback", async (req: Request, res: Response) => {
  console.log("유저 접속 콜백!");
  console.log(req.query);
  const code = req.query.code;
  const state = req.query.state;
  const redirectUrl = req.body.callbackUrl;

  const tokenEndpoint = "https://nid.naver.com/oauth2.0/token";

  try {
    const response = await axios.post(tokenEndpoint, null, {
      params: {
        grant_type: "authorization_code",
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirectUrl,
        code: code,
        state: state,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log(response);

    const accessToken = response.data.access_token;

    // 여기서 추가로 사용자 정보 요청
    const userInfoResponse = await axios.get(
      "https://openapi.naver.com/v1/nid/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(userInfoResponse);

    res.json(userInfoResponse.data);
  } catch (error) {
    // console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
