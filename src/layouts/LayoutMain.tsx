import { Outlet } from "react-router-dom";
import HeaderComponent from "../Components/Header/AppHeader";
import FooterComponent from "../Components/Footer/AppFooter";
import { useEffect } from "react";
import { APIAccount } from "../services/api";
import { useDispatch } from "react-redux";
import { getAccountRedux } from "../redux/features/account/accountSlice";

const LayoutMain = () => {
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await APIAccount();
    console.log("res account ", res);
    if (res && res.data) {
      dispatch(getAccountRedux(res.data.user));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);
  return (
    <div className="h-ful w-full">
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default LayoutMain;
