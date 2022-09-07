import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import MainPost from "./components/MainPost/MainPost";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" ? <NavBar /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<MainPost />} />
      </Routes>
    </div>
  );
}

export default App;
