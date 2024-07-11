import NMap from "./components/NMap";
import { Routes, Route, Link } from "react-router-dom";
import { NaverOAuth, NaverCallback } from "./components/NaverOAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NaverOAuth />}></Route>
      <Route path="/NaverLoding" element={<NaverCallback />}></Route>
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
