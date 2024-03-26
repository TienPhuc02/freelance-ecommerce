import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "../layouts/layout.main";
import PageHome from "../pages/Home/page.home";

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
    ],
  },
]);
export default router;
