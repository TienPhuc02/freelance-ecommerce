import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound from "../Components/ResultAntDesign/NotFound";
import { useDispatch } from "react-redux";
import { getAccountRedux } from "../redux/features/account/accountSlice";
import { APIAccount } from "../services/api";

interface ProtectedRouteProps {
  children: ReactNode;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
  const user = useSelector((state: any) => state.account);
  console.log(user);
  return <>{user ? <div>{children}</div> : <Navigate to={"/login"} />}</>;
};

export const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
  const role = useSelector((state: any) => state.account.role);
  return <>{role === "admin" ? <div>{children}</div> : <NotFound />}</>;
};
