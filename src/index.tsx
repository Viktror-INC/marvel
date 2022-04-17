import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Heroes from "./pages/heroes/Heroes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="pages/heroes/:heroesName" element={<Heroes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
