import React from "react";
import { FaTimes } from "react-icons/fa";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PlaneAngleInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>Informacije o kutu između ravnina</h2>

        <p>
          Kut između dviju ravnina određen je kutom između njihovih <strong>normala</strong>. Za
          ravnine zadane općim oblikom:
        </p>

        <div className="formula-modal">
          <BlockMath math="A_1x + B_1y + C_1z + D_1 = 0" />
          <BlockMath math="A_2x + B_2y + C_2z + D_2 = 0" />
        </div>

        <p>Njihove normale su:</p>

        <div className="formula-modal">
          <BlockMath math="\vec{n}_1 = (A_1, B_1, C_1), \quad \vec{n}_2 = (A_2, B_2, C_2)" />
        </div>

        <p>Kut \theta između normala (a time i između ravnina) računa se kao:</p>

        <div className="formula-modal">
          <BlockMath math="\cos\theta = \frac{\vec{n}_1 \cdot \vec{n}_2}{\|\vec{n}_1\| \cdot \|\vec{n}_2\|}" />
        </div>

        <p>Konačno, kut se izražava kao:</p>

        <div className="formula-modal">
          <BlockMath math="\theta = \arccos\left(\frac{A_1A_2 + B_1B_2 + C_1C_2}{\sqrt{A_1^2 + B_1^2 + C_1^2} \cdot \sqrt{A_2^2 + B_2^2 + C_2^2}}\right)" />
        </div>
      </div>
    </div>
  );
}