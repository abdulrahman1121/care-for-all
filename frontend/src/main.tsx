import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import OrgPage from "./pages/OrgPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Account from "./pages/Account.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";

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
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/account", element: <Account /> },
      { path: "/:orgSlug", element: <OrgPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
], { basename: import.meta.env.BASE_URL });

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Could not find <div id="root"> in index.html');

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
