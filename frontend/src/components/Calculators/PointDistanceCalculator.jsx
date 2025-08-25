import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { BlockMath } from "react-katex";
import { toast } from "react-toastify";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";

import PointInputForm from "../Forms/PointInputForm";
import PointDistanceInfoModal from "../Modals/PointDistanceInfoModal";
import FullscreenModal from "../Modals/FullscreenModal";
import PointDistanceVisualizer from "../Visuals/PointDistanceVisualizer";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";

import { calculateDistanceBetweenPoints } from "../../services/geometryService";
import { extractSteps } from "../../services/extractSteps";
import "../../css/geometry.css";

export default function PointDistanceCalculator() {
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
    setVisibleSteps([]);

    const hasCoords1 = [point1.x, point1.y, point1.z].some((v) => v !== undefined);
    const hasCoords2 = [point2.x, point2.y, point2.z].some((v) => v !== undefined);

    if (!hasCoords1 || !hasCoords2) {
      toast.error("Obje točke moraju imati unesene koordinate.");
      return;
    }

    try {
      const response = await calculateDistanceBetweenPoints(point1, point2);
      setResult(response);
    } catch (err) {
      toast.error("Greška: " + err.message);
    }
  };

  const renderPoint = (label, x, y, z) => {
    return <BlockMath math={`${label}(${x}, ${y}, ${z})`} />;
  };

  return (
    <>
      <MathBackgroundCalculator />
      <div className="geometry-wrapper">
        <Link to="/home" className="geometry-back">
          <FaArrowLeft />
        </Link>
        <h2 className="geometry-title">
          Udaljenost između dviju točaka
          <FaInfoCircle className="geometry-info" onClick={() => setShowInfo(true)} />
        </h2>

        <PointDistanceInfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />

        <div className="geometry-forms">
          <PointInputForm point={point1} setPoint={setPoint1} label="Točka 1" />
          <PointInputForm point={point2} setPoint={setPoint2} label="Točka 2" />
        </div>

        <div className="geometry-actions">
          <button className="calculate-button" onClick={handleSubmit}>
            Izračunaj udaljenost
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
                <h3>Točke:</h3>
                {renderPoint("T₁", point1.x || 0, point1.y || 0, point1.z || 0)}
                {renderPoint("T₂", point2.x || 0, point2.y || 0, point2.z || 0)}

                <h3 style={{ marginTop: "20px" }}>
                  Rezultat: <span>{result.result?.toFixed(4)}</span>
                </h3>
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
                <p>
                  Kliknite na <strong>Izračunaj udaljenost</strong> kako biste prikazali korake.
                </p>
              </div>
            </>
          )}
        </div>

        <FullscreenModal
          isOpen={showVisualizer}
          onClose={() => setShowVisualizer(false)}
        >
          <PointDistanceVisualizer point1={point1} point2={point2} />
        </FullscreenModal>
      </div>
    </>
  );
}
