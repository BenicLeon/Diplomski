import { FaTimes } from "react-icons/fa";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PlaneDistanceInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h3>Informacije o udaljenosti između ravnina</h3>
        <p>Udaljenost je definirana <strong>samo ako su ravnine paralelne</strong>.</p>
        <p>Ravnine su paralelne ako imaju proporcionalne koeficijente:</p>
        <BlockMath math="A_1/A_2 = B_1/B_2 = C_1/C_2" />
        <p><strong>Primjer:</strong></p>
        <BlockMath math="4x + 2y - z + 5 = 0" />
        <BlockMath math="8x + 4y - 2z - 3 = 0" />
        <p>Primjer nepodudarnosti (nisu paralelne):</p>
        <BlockMath math="2x + y - z + 3 = 0" />
        <BlockMath math="2x + 1.5y - z + 5 = 0" />
      </div>
    </div>
  );
}
