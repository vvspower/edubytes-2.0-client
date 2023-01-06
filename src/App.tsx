import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./screens/Home/Home";
import Login from "./screens/Auth/Login/Login";
import MainPost from "./components/MainPost/MainPost";
import Notifications from "./screens/Notifications/Notifications";
import UserProfile from "./screens/UserProfile/UserProfile";
import Resource from "./screens/ResourcePage/Resource/Resource";
import ViewResource from "./screens/ResourcePage/Resource/ViewResource/ViewResource";
import Calendar from "./screens/Calendar/Calendar";
import CompleteProfile from "./screens/Auth/CompleteProfile/CompleteProfile";
import Verify from "./screens/Auth/Verify/Verify";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Helmet } from 'react-helmet'

function App() {
  const logged_user = useSelector((state: RootState) => state.user.value);

  const location = useLocation();

  return (
    <div className="App">
      <Helmet>
        <title>EduBytes</title>
        <meta name="description" content="Welcome to Edubytes. v0.1.0. Alpha Testing" />
      </Helmet>



      {location.pathname !== "/login" || "/complete" || sessionStorage.getItem("token") === null ? <NavBar /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/u/:username" element={<UserProfile />} />
        <Route path="/post/:id" element={<MainPost />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/resources/view/:id" element={<ViewResource />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/complete" element={logged_user.details.completed === false ? <CompleteProfile /> : <h1 style={{ marginTop: "80px" }}>Not Allowed</h1>} />
        <Route path="/verify" element={<Verify />} />
        <Route path="*" element={<div style={{ marginTop: "100px", textAlign: "center" }}><h2>Page not found</h2><p>Please return to the home page</p></div>} />

      </Routes>

    </div>
  );
}

export default App;
