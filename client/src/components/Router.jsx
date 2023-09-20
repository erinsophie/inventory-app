import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Categories from "../pages/Categories";
import MovieDetails from "../pages/MovieDetails";
import CategoryDetails from "../pages/CategoryDetails";
import MovieForm from "../pages/MovieForm";
import CategoryForm from "../pages/CategoryForm";
import Error from "../components/Error";

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
          path: "/add-movie",
          element: <MovieForm />,
        },
        {
          path: "/edit-movie/:id",
          element: <MovieForm />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:id",
          element: <CategoryDetails />,
        },
        {
          path: "/add-category",
          element: <CategoryForm />,
        },
        {
          path: "/edit-category/:id",
          element: <CategoryForm />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
