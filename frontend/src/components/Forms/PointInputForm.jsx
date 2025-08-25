import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/geometry.css";

export default function PointInputForm({ point, setPoint }) {
  const sanitize = (val) => val.replace(/[^\d.-]/g, "").replace(/(?!^)-/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitize(value);
    setPoint((prev) => ({ ...prev, [name]: sanitized }));
  };

  const { x = "", y = "", z = "" } = point;
  const showPreview = x || y || z;
  const formula = `T(${x || "x"}, ${y || "y"}, ${z || "z"})`;

  return (
    <div className="plane-form">
      <p className="input-info">Unesite koordinate točke T(x, y, z)</p>
      <div className="input-row">
        {["x", "y", "z"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            onChange={handleChange}
            value={point[key] || ""}
            inputMode="decimal"
            className="plane-input"
          />
        ))}
      </div>
      {showPreview && (
        <div className="equation-preview">
          <BlockMath math={formula} />
        </div>
      )}
    </div>
  );
}
