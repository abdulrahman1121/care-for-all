import { Outlet, ScrollRestoration } from "react-router";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip link: hidden until a keyboard user presses Tab, then lets them jump past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Scrolls back to the top when you move to a new page */}
      <ScrollRestoration />
    </div>
  );
}
