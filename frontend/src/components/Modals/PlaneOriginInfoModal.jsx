import { FaTimes } from "react-icons/fa";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PlaneOriginInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h2>Prolazak ravnine kroz ishodište</h2>
        <p>Opći oblik ravnine:</p>
        <BlockMath math="Ax + By + Cz + D = 0" />
        <p>Uvrštavanjem točke (0, 0, 0):</p>
        <BlockMath math="D = 0" />
        <p>Ako je <strong>D = 0</strong>, ravnina prolazi kroz ishodište.</p>
        <BlockMath math="2x + y - 3z + 0 = 0 \Rightarrow \text{DA}" />
        <BlockMath math="x - 2y + 5 = 0 \Rightarrow \text{NE}" />
      </div>
    </div>
  );
}
