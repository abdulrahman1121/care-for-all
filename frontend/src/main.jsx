import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import OrgPage from "./pages/OrgPage.jsx";
import NotFound from "./pages/NotFound.jsx";

/*
  The router maps URLs to pages.
  - Layout wraps every page (header + footer), and <Outlet /> inside it shows the matched child page.
  - ":orgSlug" is a URL parameter: /childcare, /senior-care and /disability-support all use OrgPage,
    which reads the slug and looks up that org's data.
  - "*" catches any URL we haven't built yet.
*/
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:orgSlug", element: <OrgPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
], { basename: import.meta.env.BASE_URL });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
