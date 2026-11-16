import { Link } from "react-router";

/* Shown for any page that doesn't exist yet (including footer links like About and Privacy). */
export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight">This page isn't built yet</h1>
      <p className="mt-4 text-lg text-ink-soft">
        It's on the list. For now, head back to the home page to explore the care types.
      </p>
      <Link to="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-bold text-paper">
        Go to the home page
      </Link>
    </section>
  );
}
