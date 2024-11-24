import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import RequireAuth from "./features/auth/RequireAuth";
import LoadingPage from "./pages/loadingPage/LoadingPage";
// Lazy-loaded components for code-splitting
const Login = lazy(() => import("./features/auth/Login"));
const Register = lazy(() => import("./features/auth/Register"));
const Home = lazy(() => import("./pages/home/Home"));
const CreateRecipe = lazy(() => import("./pages/createRecipe/CreateRecipe"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const UserRecipes = lazy(() => import("./pages/userRecipes/UserRecipes"));
const Recipe = lazy(() => import("./pages/recipe/Recipe"));
const FavoriteRecipes = lazy(() => import("./pages/favoriteRecipes/FavoriteRecipes"));
const LikedRecipes = lazy(() => import("./pages/likedRecipes/LikedRecipes"));
const AllRecipes = lazy(() => import("./pages/allRecipes/AllRecipes"));
const UserPage = lazy(() => import("./pages/user/UserPage"));
const UpdateRecipe = lazy(() => import("./pages/updateRecipe/UpdateRecipe"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Home />
          </Suspense>
        ),
      },
      // auth routes
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Register />
          </Suspense>
        ),
      },
      // recipe routes
      {
        path: "recipes/create",
        element: <RequireAuth />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<LoadingPage />}>
                <CreateRecipe />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "recipes/:id/update",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <UpdateRecipe />
          </Suspense>
        ),
      },
      {
        path: "recipes/:id",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Recipe />
          </Suspense>
        ),
      },
      {
        path: "recipes",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <AllRecipes />
          </Suspense>
        ),
      },
      // dashboard routes
      {
        path: "current",
        element: <RequireAuth />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<LoadingPage />}>
                <Dashboard />
              </Suspense>
            ),
            // user related routes
            children: [
              {
                path: "recipes",
                element: <UserRecipes />,
              },
              {
                path: "liked/recipes",
                element: <LikedRecipes />, // You can lazy load here if this becomes dynamic content
              },
              {
                path: "favorite/recipes",
                element: <FavoriteRecipes />, // Same as above
              },
            ],
          },
        ],
      },
      {
        path: "users/:id",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <UserPage />
          </Suspense>
        ),
      },
    ],
  },
]);
