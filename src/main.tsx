import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

const style = "font-size: 16px; font-weight: 500;"
const style2 = "font-size: 32px; color: red;"
{ console.log("%cSTOP!", style2) }
{ console.log("%cThis is a browser feature intended for developers. Do not paste any code here or share your auth token. it is a scam and will give them access to your Edubytes account.", style) }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />

    </Provider>
  </BrowserRouter>
);
