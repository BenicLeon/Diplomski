import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { BlockMath } from "react-katex";
import { toast } from "react-toastify";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";

import PointInputForm from "../Forms/PointInputForm";
import PlaneFromThreePointsInfoModal from "../Modals/PlaneFromThreePointsInfoModal";
import FullscreenModal from "../Modals/FullscreenModal";
import PlaneFromThreePointsVisualizer from "../Visuals/PlaneFromThreePointsVisualizer";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";

import { extractSteps } from "../../services/extractSteps";
import { calculatePlaneFromThreePoints } from "../../services/geometryService";
import "../../css/geometry.css";

export default function PlaneFromThreePointsCalculator() {
  const [point1, setPoint1] = useState({});
  const [point2, setPoint2] = useState({});
  const [point3, setPoint3] = useState({});
  const [result, setResult] = useState(null);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);

  useEffect(() => {
    if (result?.steps) {
      const stepsArray = extractSteps(result.steps);
      let i = -1;
      setVisibleSteps([]);
      const interval = setInterval(() => {
        if (i < stepsArray.length - 1) {
          setVisibleSteps((prev) => [...prev, stepsArray[++i]]);
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

    try {
      const response = await calculatePlaneFromThreePoints(point1, point2, point3);
      setResult(response);
    } catch (err) {
      toast.error("Greška: " + err.message);
    }
  };

  const renderPlaneEquation = (a, b, c, d) => {
    const terms = [];

    const formatTerm = (coef, variable, isFirst = false) => {
      if (coef === 0) return "";
      const sign = coef > 0 ? (isFirst ? "" : "+") : "-";
      const abs = Math.abs(coef);
      return ` ${sign} ${abs === 1 ? "" : abs}${variable}`;
    };

    terms.push(formatTerm(a, "x", true));
    terms.push(formatTerm(b, "y"));
    terms.push(formatTerm(c, "z"));
    if (d !== 0) {
      const sign = d > 0 ? "+" : "-";
      terms.push(` ${sign} ${Math.abs(d)}`);
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
          Ravnina kroz tri točke
          <FaInfoCircle className="geometry-info" onClick={() => setShowInfo(true)} />
        </h2>

        <PlaneFromThreePointsInfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />

        <div className="geometry-forms">
          <PointInputForm point={point1} setPoint={setPoint1} label="Točka 1" />
          <PointInputForm point={point2} setPoint={setPoint2} label="Točka 2" />
          <PointInputForm point={point3} setPoint={setPoint3} label="Točka 3" />
        </div>

        <div className="geometry-actions">
          <button className="calculate-button" onClick={handleSubmit}>
            Izračunaj ravninu
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
                <h3>Jednadžba ravnine:</h3>
                {renderPlaneEquation(result.a, result.b, result.c, result.d)}
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

        <FullscreenModal isOpen={showVisualizer} onClose={() => setShowVisualizer(false)}>
          <PlaneFromThreePointsVisualizer
            points={[
              { x: Number(point1.x), y: Number(point1.y), z: Number(point1.z) },
              { x: Number(point2.x), y: Number(point2.y), z: Number(point2.z) },
              { x: Number(point3.x), y: Number(point3.y), z: Number(point3.z) },
            ]}
          />
        </FullscreenModal>
      </div>
    </>
  );
}
