import React from "react";
import { FaTimes } from "react-icons/fa";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PointBelongingInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Kako provjeriti pripadnost točke ravnini?</h2>

        <p>Ravnina je zadana općom jednadžbom:</p>
        <BlockMath math="Ax + By + Cz + D = 0" />

        <p>
          Točka <InlineMath math="T(x, y, z)" /> pripada ravnini ako njezine koordinate zadovoljavaju:
        </p>
        <BlockMath math="A \cdot x + B \cdot y + C \cdot z + D = 0" />

        <p>Ako je rezultat jednak 0, točka leži na ravnini. Inače ne pripada.</p>

        <p>Primjer: Za ravninu:</p>
        <BlockMath math="x + 2y - z + 3 = 0" />
        <p>i točku <InlineMath math="T(1, 1, 2)" />, uvrštavamo:</p>
        <BlockMath math="1 \cdot 1 + 2 \cdot 1 - 1 \cdot 2 + 3 = 1 + 2 - 2 + 3 = 4 \neq 0" />

        <p><strong>→ Točka ne pripada ravnini.</strong></p>
      </div>
    </div>
  );
}
