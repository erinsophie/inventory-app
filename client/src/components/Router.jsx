import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Categories from "../pages/Categories";
import MovieDetails from "../pages/MovieDetails";
import CategoryDetails from "../pages/CategoryDetails";

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
          path: "/movies/:id",
          element: <MovieDetails />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:id",
          element: <CategoryDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
