import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "./Logo.jsx";
import TextSizeControl from "./TextSizeControl.jsx";
import { orgTypes } from "../data/orgTypes.js";

function OrgNavLinks({ onNavigate }) {
  return orgTypes.map((org) => (
    <NavLink
      key={org.slug}
      to={`/${org.slug}`}
      onClick={onNavigate}
      className="group relative py-2 font-medium text-ink-soft hover:text-ink aria-[current=page]:text-ink"
    >
      {org.name}
      {/* Colored underline in this org's color: shows on hover, stays on the current page */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-1 scale-x-0 rounded-full transition-transform group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
        style={{ background: org.colors.accent }}
      />
    </NavLink>
  ));
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the page changes
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Logo />

        <nav aria-label="Care types" className="hidden items-center gap-7 md:flex">
          <OrgNavLinks />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <TextSizeControl />
          <button
            type="button"
            className="rounded-full bg-ink px-5 py-2.5 font-bold text-paper hover:bg-ink/90"
            title="Sign in is coming soon"
          >
            Sign in
          </button>
        </div>

        <button
          type="button"
          className="rounded-lg border border-line px-3 py-2 font-bold md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line px-5 pb-6 md:hidden">
          <nav aria-label="Care types" className="flex flex-col gap-1 pt-3 text-lg">
            <OrgNavLinks onNavigate={() => setMenuOpen(false)} />
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <TextSizeControl />
            <button type="button" className="rounded-full bg-ink px-5 py-2.5 font-bold text-paper">
              Sign in
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
