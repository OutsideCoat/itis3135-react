import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import Introduction from "./pages/introduction.jsx";
import Contract from "./pages/contract.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/itis3135-react">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="contract" element={<Contract />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
