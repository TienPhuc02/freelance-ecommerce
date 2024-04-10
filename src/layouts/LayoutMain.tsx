
import { Outlet } from "react-router-dom";
import HeaderComponent from "../Components/Header/AppHeader";
import FooterComponent from "../Components/Footer/AppFooter";

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
