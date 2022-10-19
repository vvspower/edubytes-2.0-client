import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./screens/Home/Home";
import Login from "./screens/Auth/Login/Login";
import MainPost from "./components/MainPost/MainPost";
import Notifications from "./screens/Notifications/Notifications";
import UserProfile from "./screens/UserProfile/UserProfile";
import SideBar from "./components/SideBar/SideBar";
import MainPage from "./screens/Main/MainPage";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" ? <NavBar /> : null}
      {/* {location.pathname === "/home" || location.pathname === "/" ? <SideBar /> : null} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/u/:username" element={<UserProfile />} />
        <Route path="/post" element={<MainPost />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </div>
  );
}

export default App;
