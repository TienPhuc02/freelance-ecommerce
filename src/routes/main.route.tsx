import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../layouts/LayoutMain";
import PageHome from "../pages/Home/PageHome";
import MainFilterProduct from "../pages/QueryParamsProducts/PageFilterProduct";
import DetailProductPage from "../pages/DetailProduct/PageDetailProduct";
import PageViewOrder from "../pages/ViewOrder/PageViewOrder";
import LoginPage from "../pages/Login/PageLogin";
import SignUpPage from "../pages/SignUp/PageSignup";

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
