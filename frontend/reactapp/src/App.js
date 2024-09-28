import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Homepage from "../src/Pages/homepage/homepage";
import Loginpage from "./Pages/Loginpage/Loginpage";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/footer/footer";
import Userpage from "./Pages/Userpage/Userpage";
import Errorpage from "./Pages/Errorpage/Errorpage";
import "./designs/css/App.css";

export default function App() {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="Login" element={<Loginpage />} />
        <Route
          path="Userpage"
          element={isConnected ? <Userpage /> : <Navigate to="/Login" />}
        />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      <Footer />
    </div>
  );
}