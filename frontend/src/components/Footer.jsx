import { Link } from "react-router";
import Logo from "./Logo.jsx";
import { orgTypes } from "../data/orgTypes.js";

const columns = [
  {
    heading: "Care types",
    links: orgTypes.map((org) => ({ label: org.name, to: `/${org.slug}` })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Security", to: "/security" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          {/* The logo's dark-on-light wordmark is swapped to light here */}
          <div className="[&_a]:text-paper">
            <Logo />
          </div>
          <p className="max-w-xs text-paper/75">
            Attendance, daily notes and family updates for the people who care for others.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h2 className="mb-3 font-bold">{col.heading}</h2>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-paper/75 underline-offset-4 hover:text-paper hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-paper/60">
          © {new Date().getFullYear()} CareForAll.
        </p>
      </div>
    </footer>
  );
}
