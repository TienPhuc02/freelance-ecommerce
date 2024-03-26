import React from "react";
import HeaderComponent from "../Components/Header/app.header";
import FooterComponent from "../Components/Footer/app.footer";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  return (
    <div className="h-ful w-full">
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default LayoutMain;
