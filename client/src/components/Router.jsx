import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Categories from "../pages/Categories";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
