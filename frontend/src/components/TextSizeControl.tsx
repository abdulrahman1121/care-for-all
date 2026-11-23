import { useEffect, useState } from "react";

const sizes = [
  { id: "normal", label: "A", name: "Normal text" },
  { id: "large", label: "A+", name: "Large text" },
  { id: "larger", label: "A++", name: "Larger text" },
];

const STORAGE_KEY = "text-size";

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "normal";
  } catch {
    return "normal";
  }
}

/*
  Sets data-text-size on <html>. The CSS raises the root font size, and because
  Tailwind sizes are in rem (relative to the root), the whole page scales together.
*/
export default function TextSizeControl() {
  const [size, setSize] = useState(readSaved);

  useEffect(() => {
    document.documentElement.dataset.textSize = size;
    try {
      localStorage.setItem(STORAGE_KEY, size);
    } catch {
      /* storage unavailable: the choice just won't be remembered */
    }
  }, [size]);

  return (
    <div role="group" aria-label="Text size" className="flex items-center rounded-full border border-line bg-white p-0.5">
      {sizes.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => setSize(s.id)}
          aria-pressed={size === s.id}
          aria-label={s.name}
          className={`min-w-9 rounded-full px-2 py-1 font-bold leading-none ${
            size === s.id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
          }`}
          style={{ fontSize: `${0.8 + i * 0.12}rem` }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
