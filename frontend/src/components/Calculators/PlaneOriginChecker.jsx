import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { BlockMath } from "react-katex";
import { toast } from "react-toastify";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";

import PlaneInputForm from "../Forms/PlaneInputForm";
import PlaneOriginInfoModal from "../Modals/PlaneOriginInfoModal";
import FullscreenModal from "../Modals/FullscreenModal";
import PlaneOriginVisualizer from "../Visuals/PlaneOriginVisualizer";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";

import { checkPlanePassesThroughOrigin } from "../../services/geometryService";
import "../../css/geometry.css";

export default function PlaneOriginChecker() {
  const [plane, setPlane] = useState({});
  const [result, setResult] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleSubmit = async () => {
    setResult(null);

    const { A, B, C, D } = plane;
    const a = parseFloat(A) || 0;
    const b = parseFloat(B) || 0;
    const c = parseFloat(C) || 0;
    const d = parseFloat(D) || 0;

    if (a === 0 && b === 0 && c === 0 && d === 0) {
      toast.error("Koeficijenti A, B, C i D ne mogu svi biti 0.");
      return;
    }

    try {
      const data = await checkPlanePassesThroughOrigin({ A: a, B: b, C: c, D: d });
      setResult(data);
    } catch (err) {
      toast.error("Greška: " + err.message);
    }
  };

  const renderPlaneEquation = (A, B, C, D) => {
    const terms = [];

    const formatTerm = (coef, variable, isFirst = false) => {
      if (coef === 0) return "";
      const sign = coef > 0 ? (isFirst ? "" : "+") : "-";
      const abs = Math.abs(coef);
      return ` ${sign} ${abs === 1 ? "" : abs}${variable}`;
    };

    terms.push(formatTerm(A, "x", true));
    terms.push(formatTerm(B, "y"));
    terms.push(formatTerm(C, "z"));
    if (D !== 0) {
      const sign = D > 0 ? "+" : "-";
      terms.push(` ${sign} ${Math.abs(D)}`);
    }

    return <BlockMath math={terms.join(" ") + " = 0"} />;
  };

  return (
    <>
      <MathBackgroundCalculator />
      <div className="geometry-wrapper">
        <Link to="/home" className="geometry-back">
          <FaArrowLeft />
        </Link>
        <h2 className="geometry-title">
          Prolazi li ravnina kroz ishodište?
          <FaInfoCircle
            className="geometry-info"
            onClick={() => setShowInfo(true)}
          />
        </h2>

        <PlaneOriginInfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />

        <div className="geometry-forms">
          <PlaneInputForm plane={plane} setPlane={setPlane} />
        </div>

        <div className="geometry-actions">
          <button className="calculate-button" onClick={handleSubmit}>
            Provjeri
          </button>

          {result !== null && (
            <button
              className="calculate-button"
              onClick={() => setShowVisualizer(true)}
            >
              Prikaži vizualizaciju
            </button>
          )}
        </div>

        {result !== null && (
          <div className="geometry-floating-result">
            <div className="geometry-result">
              <h3>Jednadžba ravnine:</h3>
              {renderPlaneEquation(
                parseFloat(plane.A) || 0,
                parseFloat(plane.B) || 0,
                parseFloat(plane.C) || 0,
                parseFloat(plane.D) || 0
              )}
              <h3 style={{ marginTop: "20px" }}>
                Rezultat:{" "}
                <span>
                  {result
                    ? "Ravnina prolazi kroz ishodište"
                    : "Ravnina ne prolazi kroz ishodište"}
                </span>
              </h3>
            </div>
            <div className="geometry-steps-right">
              <p>
                Ravnina prolazi kroz ishodište ako vrijedi:{" "}
                <BlockMath math="Ax + By + Cz + D = 0 \Rightarrow D = 0" />
              </p>
            </div>
          </div>
        )}

        <FullscreenModal
          isOpen={showVisualizer}
          onClose={() => setShowVisualizer(false)}
        >
          <PlaneOriginVisualizer plane={plane} />
        </FullscreenModal>
      </div>
    </>
  );
}
