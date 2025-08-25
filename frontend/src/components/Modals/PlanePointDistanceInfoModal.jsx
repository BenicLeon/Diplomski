import { FaTimes } from "react-icons/fa";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PlanePointDistanceInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h3>Udaljenost točke od ravnine</h3>
        <p>Za ravninu <InlineMath math="Ax + By + Cz + D = 0" /> i točku P(x, y, z):</p>
        <BlockMath math="d = \frac{|Ax + By + Cz + D|}{\sqrt{A^2 + B^2 + C^2}}" />
        <p>Primjer:</p>
        <BlockMath math="\text{Ravnina: } 2x + 3y - z + 5 = 0" />
        <BlockMath math="\text{Točka: } (1, 0, 2)" />
      </div>
    </div>
  );
}
