import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { BlockMath } from "react-katex";
import { toast } from "react-toastify";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";

import PointInputForm from "../Forms/PointInputForm";
import LineFromPointsInfoModal from "../Modals/LineFromPointsInfoModal";
import { extractSteps } from "../../services/extractSteps";
import { calculateLineFromPoints } from "../../services/geometryService";
import FullscreenModal from "../Modals/FullscreenModal";
import LineFromPointsVisualizer from "../Visuals/LineFromPointsVisualizer";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";
import "../../css/geometry.css";

export default function LineFromPointsCalculator() {
  const [point1, setPoint1] = useState({});
  const [point2, setPoint2] = useState({});
  const [result, setResult] = useState(null);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);

  useEffect(() => {
    if (result?.steps) {
      const stepList = extractSteps(result.steps);
      let i = -1;
      setVisibleSteps([]);
      const interval = setInterval(() => {
        if (i < stepList.length - 1) {
          setVisibleSteps((prev) => [...prev, stepList[++i]]);
        } else {
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [result]);

  const handleSubmit = async () => {
    setResult(null);
    try {
      const response = await calculateLineFromPoints(point1, point2);
      setResult(response);
    } catch (err) {
      toast.error(`Greška: ${err.message}`);
    }
  };

  const renderParametric = (p, d) => {
    const format = (coord, delta) => {
      if (delta === 0) return `${coord}`;
      if (delta === 1) return `${coord} + t`;
      if (delta === -1) return `${coord} - t`;
      if (delta > 0) return `${coord} + ${delta}t`;
      return `${coord} - ${Math.abs(delta)}t`;
    };

    return (
      <BlockMath
        math={`\\begin{cases}
x = ${format(p.x, d.x)} \\\\
y = ${format(p.y, d.y)} \\\\
z = ${format(p.z, d.z)}
\\end{cases}`}
      />
    );
  };

  const renderCanonical = (p, d) => {
    const parts = [];
    if (d.x !== 0) parts.push(`\\frac{x - ${p.x}}{${d.x}}`);
    if (d.y !== 0) parts.push(`\\frac{y - ${p.y}}{${d.y}}`);
    if (d.z !== 0) parts.push(`\\frac{z - ${p.z}}{${d.z}}`);

    return parts.length > 0 ? (
      <BlockMath math={parts.join(" = ")} />
    ) : (
      <p>Nije moguće prikazati kanonski oblik (sve komponente vektora su 0).</p>
    );
  };

  return (
    <>
      <MathBackgroundCalculator />
      <div className="geometry-wrapper">
        <Link to="/home" className="geometry-back">
          <FaArrowLeft />
        </Link>
        <h2 className="geometry-title">
          Pravac kroz dvije točke
          <FaInfoCircle className="geometry-info" onClick={() => setShowInfo(true)} />
        </h2>

        <LineFromPointsInfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />

        <div className="geometry-forms">
          <PointInputForm point={point1} setPoint={setPoint1} label="Točka 1" />
          <PointInputForm point={point2} setPoint={setPoint2} label="Točka 2" />
        </div>

        <div className="geometry-actions">
          <button className="calculate-button" onClick={handleSubmit}>
            Izračunaj pravac
          </button>
          {result && (
            <button
              className="calculate-button"
              onClick={() => setShowVisualizer(true)}
            >
              Prikaži vizualizaciju
            </button>
          )}
        </div>

        <div className="geometry-floating-result">
          {result ? (
            <>
              <div className="geometry-result">
                <h3>Parametarski oblik:</h3>
                {renderParametric(result.startPoint, result.directionVector)}

                <h3>Kanonski oblik:</h3>
                {renderCanonical(result.startPoint, result.directionVector)}
              </div>

              <div className="geometry-steps-right">
                {visibleSteps.length > 0 ? (
                  visibleSteps.map((step, index) => (
                    <p key={index}>
                      <strong>{index + 1}.</strong> {step?.trim?.() ?? ""}
                    </p>
                  ))
                ) : (
                  <p>Koraci se prikazuju...</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h3>Koraci</h3>
              <div className="geometry-steps-right">
                <p>Kliknite na <strong>Izračunaj</strong> kako biste prikazali korake.</p>
              </div>
            </>
          )}
        </div>

        <FullscreenModal
          isOpen={showVisualizer}
          onClose={() => setShowVisualizer(false)}
        >
          <LineFromPointsVisualizer point1={point1} point2={point2} />
        </FullscreenModal>
      </div>
    </>
  );
}
