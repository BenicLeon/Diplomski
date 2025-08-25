import { FaTimes } from "react-icons/fa";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PointDistanceInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h3>Udaljenost između dviju točaka</h3>
        <p>Za točke P₁(x₁, y₁, z₁) i P₂(x₂, y₂, z₂):</p>
        <BlockMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}" />
        <BlockMath math="\text{Primjer: } P_1 = (1, 2, 3), P_2 = (4, 6, 3)" />
        <BlockMath math="d = \sqrt{9 + 16 + 0} = \sqrt{25} = 5" />
      </div>
    </div>
  );
}
