import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./screens/Home/Home";
import Login from "./screens/Auth/Login/Login";
import MainPost from "./components/MainPost/MainPost";
import Notifications from "./screens/Notifications/Notifications";
import UserProfile from "./screens/UserProfile/UserProfile";
import Resource from "./screens/ResourcePage/Resource/Resource";
import MainPage from "./screens/Main/MainPage";
import ViewResource from "./screens/ResourcePage/Resource/ViewResource/ViewResource";
import Calendar from "./screens/Calendar/Calendar";

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
        <Route path="/resources" element={<Resource />} />
        <Route path="/resources/view/:id" element={<ViewResource />} />
        <Route path="/calendar" element={<Calendar />} />


      </Routes>
    </div>
  );
}

export default App;
