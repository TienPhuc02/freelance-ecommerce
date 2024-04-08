import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../layouts/layout.main";
import PageHome from "../pages/Home/page.home";
import LoginPage from "../pages/Login/page.login";
import SignUpPage from "../pages/SignUp/page.signup";
import MainFilterProduct from "../pages/QueryParamsProducts/page.filter-product";
import DetailProductPage from "../pages/DetailProduct/page.detail-product";

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
