import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../layouts/LayoutMain";
import PageHome from "../pages/Home/PageHome";
import MainFilterProduct from "../pages/QueryParamsProducts/PageFilterProduct";
import DetailProductPage from "../pages/DetailProduct/PageDetailProduct";
import PageViewOrder from "../pages/ViewOrder/PageViewOrder";
import LoginPage from "../pages/Login/PageLogin";
import SignUpPage from "../pages/SignUp/PageSignup";
import { PrivateRoute } from "./Private.route";
import LayoutAdmin from "../layouts/LayoutAdmin";
import AdminDashBoard from "../Components/Admin/DashBoard/admin.dashboard";
import AdminOrder from "../Components/Admin/Order/admin.order";
import AdminProduct from "../Components/Admin/Product/admin.product";
import AdminUser from "../Components/Admin/User/AdminUser";
import CheckOutPage from "../pages/CheckOut/CheckOut";
import MeOrder from "../pages/MeOrder/MeOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LayoutMain />
      </>
    ),
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: "/:slug",
        element: (
          <>
            <MainFilterProduct />
          </>
        ),
      },
      {
        path: "/product/:slug",
        element: (
          <>
            <DetailProductPage />
          </>
        ),
      },
      {
        path: "/view-order",
        element: (
          <>
            <PageViewOrder />
          </>
        ),
      },
      {
        path: "/me/orders",
        element: <MeOrder />,
      },
      {
        path: "check-out",
        element: (
          <>
            <CheckOutPage />
          </>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "order",
        element: <AdminOrder />,
      },
      {
        path: "product",
        element: <AdminProduct />,
      },
      {
        path: "user",
        element: <AdminUser />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);
export default router;
