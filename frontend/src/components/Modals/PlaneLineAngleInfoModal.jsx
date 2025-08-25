import { FaTimes } from "react-icons/fa";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PlaneLineAngleInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h3>Informacije o kutu između ravnine i pravca</h3>
        <p>Pravac se unosi u obliku:</p>
        <BlockMath math="\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}" />
        <p>Koeficijenti <InlineMath  math="a, b, c" /> čine vektor smjera.</p>
        <p>Kut se računa pomoću kuta između normale i vektora smjera.</p>
        <p>Ako je pravac paralelan s ravninom, kut = 0°.</p>
      </div>
    </div>
  );
}
