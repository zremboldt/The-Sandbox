import { useState } from "react";
import "./billing-toggle.css";

const OPTIONS = [
  { key: "monthly", label: "Monthly" },
  { key: "6mo", label: "6 Months (Save $124+)" },
];

export function BillingToggle() {
  const [selected, setSelected] = useState("monthly");

  return (
    <div className="billing-toggle">
      <div
        className={`billing-toggle__pill ${
          selected === "6mo" ? "billing-toggle__pill--right" : ""
        }`}
      />

      {OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          className={`billing-toggle__option ${
            selected === opt.key ? "billing-toggle__option--active" : ""
          }`}
          onClick={() => setSelected(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
