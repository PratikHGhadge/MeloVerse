import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import UnavilablePage from "./components/UnavilablePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/search",
    element: <UnavilablePage />,
  },
  {
    path: "/activity",
    element: <UnavilablePage />,
  },
  {
    path: "/create-post",
    element: <UnavilablePage />,
  },
  {
    path: "/communities",
    element: <UnavilablePage />,
  },
  {
    path: "/profile",
    element: <UnavilablePage />,
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);
