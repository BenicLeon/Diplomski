import { FaTimes } from "react-icons/fa";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function LineFromPointsInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h3>Kako se računa pravac kroz dvije točke?</h3>
        <p>
          Za točke T₁ = <InlineMath math="(x_1, y_1, z_1)" /> i T₂ = <InlineMath math="(x_2, y_2, z_2)" />, vektor smjera je:
        </p>
        <BlockMath math="s = (dx, dy, dz) = (x_2 - x_1, y_2 - y_1, z_2 - z_1)" />

        <p><strong>Parametarski oblik:</strong></p>
        <BlockMath math="x = x_0 + dx \cdot t" />
        <BlockMath math="y = y_0 + dy \cdot t" />
        <BlockMath math="z = z_0 + dz \cdot t" />

        <p><strong>Kanonski oblik:</strong></p>
        <BlockMath math="\frac{x - x_0}{dx} = \frac{y - y_0}{dy} = \frac{z - z_0}{dz}" />
        <p>Podjela se izostavlja ako je neki <InlineMath math="dx/dy/dz" /> jednak 0.</p>
      </div>
    </div>
  );
}
