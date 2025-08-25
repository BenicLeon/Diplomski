import React from "react";
import { formatPlaneEquation } from "../../services/geometryService";
import "../../css/geometry.css";

export default function PlaneInputForm({ plane, setPlane }) {
  const sanitize = (val) => val.replace(/[^\d.-]/g, "").replace(/(?!^)-/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitize(value);
    setPlane((prev) => ({ ...prev, [name]: sanitized }));
  };

  return (
    <div className="plane-form">
      <h3>Ravnina (Ax + By + Cz + D = 0)</h3>
      <div className="input-row">
        {["A", "B", "C", "D"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            onChange={handleChange}
            value={plane[key] || ""}
            inputMode="decimal"
            className="plane-input"
          />
        ))}
      </div>
      {(plane.A || plane.B || plane.C || plane.D) && (
        <p className="equation-preview">
          Jednadžba: {formatPlaneEquation(plane)}
        </p>
      )}
    </div>
  );
}
