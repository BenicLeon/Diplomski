import { FaTimes } from "react-icons/fa";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "../../css/modal.css";

export default function PlaneFromThreePointsInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h3>Ravnina kroz tri točke</h3>
        <p>Ravninu određuju tri nekolinearne točke T₁, T₂, T₃.</p>
        <ul>
          <li>Formiraj vektore: <InlineMath math="\vec{u} = T_2 - T_1" />, <InlineMath math="\vec{v} = T_3 - T_1" /></li>
          <li>Normala: <InlineMath math="\vec{n} = \vec{u} \times \vec{v}" /></li>
          <li>Jednadžba: <BlockMath math="Ax + By + Cz + D = 0" /></li>
        </ul>
        <p>D se dobiva uvrštavanjem točke T₁ u jednadžbu.</p>
      </div>
    </div>
  );
}
