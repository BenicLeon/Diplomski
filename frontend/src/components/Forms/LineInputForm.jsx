import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/geometry.css";

export default function LineInputForm({ line, setLine }) {
  const sanitize = (val) => val.replace(/[^\d.-]/g, "").replace(/(?!^)-/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitize(value);
    setLine((prev) => ({ ...prev, [name]: sanitized }));
  };

  const simplify = (val, label) => {
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) return label;
    if (num === 1) return label + " - t";
    if (num === -1) return label + " + t";
    return `${label} - (${num})`;
  };

  const formula = `\\frac{${simplify(line.x0, "x")}}{${line.a || 1}} = \\frac{${simplify(line.y0, "y")}}{${line.b || 1}} = \\frac{${simplify(line.z0, "z")}}{${line.c || 1}}`;

  return (
    <div className="plane-form">
      <h3>Pravac (kanonski oblik)</h3>
      <div className="input-row">
        {["x0", "y0", "z0", "a", "b", "c"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            onChange={handleChange}
            value={line[key] || ""}
            inputMode="decimal"
            className="plane-input"
          />
        ))}
      </div>
      {(line.x0 || line.y0 || line.z0 || line.a || line.b || line.c) && (
        <div className="equation-preview">
          Pravac: <BlockMath math={formula} />
        </div>
      )}
    </div>
  );
}
