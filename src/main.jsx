import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Country } from "./components";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App className="font-sans" />} />
        <Route path={"/:country"} element={<Country />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
