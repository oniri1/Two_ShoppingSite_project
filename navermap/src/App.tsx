import NMap from "./Component/Map/NMap";
import { Routes, Route, Link } from "react-router-dom";
import { NaverOAuth, NaverCallback } from "./Component/OAuth/NaverOAuth";
import { GoogleOAuth, GoogleCallback } from "./Component/OAuth/GoogleOAuth";
import MyStore from "./page/mystore/mystore";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <GoogleOAuth />
            <NaverOAuth />
          </div>
        }
      ></Route>
      <Route path="/GoogleLoding" element={<GoogleCallback />}></Route>
      <Route path="/NaverLoding" element={<NaverCallback />}></Route>

      <Route path="/mystore" element={<MyStore />}></Route>
      <Route
        path="/map"
        element={
          <div className="w-[800px] h-[800px]">
            <NMap></NMap>
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
