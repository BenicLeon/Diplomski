import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { BlockMath } from "react-katex";
import { toast } from "react-toastify";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";

import PlaneInputForm from "../Forms/PlaneInputForm";
import PointInputForm from "../Forms/PointInputForm";
import PointBelongingInfoModal from "../Modals/PointBelongingInfoModal";
import FullscreenModal from "../Modals/FullscreenModal";
import PointBelongingVisualizer from "../Visuals/PointBelongingVisualizer";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";

import {
  transformToGeneralForm,
  checkPointBelongingToPlane,
} from "../../services/geometryService";
import { extractSteps } from "../../services/extractSteps";
import "../../css/geometry.css";

export default function PointBelongingChecker() {
  const [plane, setPlane] = useState({});
  const [point, setPoint] = useState({});
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

    const transformedPlane = transformToGeneralForm(plane);

    if (
      transformedPlane.A === 0 &&
      transformedPlane.B === 0 &&
      transformedPlane.C === 0
    ) {
      toast.error("Ravnina mora imati barem jedan koeficijent A, B ili C različit od 0.");
      return;
    }

    const hasPoint = [point.x, point.y, point.z].some((v) => parseFloat(v) !== 0);
    if (!hasPoint) {
      toast.error("Točka mora imati barem jednu nenultu koordinatu.");
      return;
    }

    try {
      const response = await checkPointBelongingToPlane(transformedPlane, point);
      setResult(response);
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

  const renderPoint = (x, y, z) => {
    return <BlockMath math={`T(${x}, ${y}, ${z})`} />;
  };

  return (
    <>
      <MathBackgroundCalculator />
      <div className="geometry-wrapper">
        <Link to="/home" className="geometry-back">
          <FaArrowLeft />
        </Link>
        <h2 className="geometry-title">
          Pripadnost točke ravnini
          <FaInfoCircle className="geometry-info" onClick={() => setShowInfo(true)} />
        </h2>

        <PointBelongingInfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />

        <div className="geometry-forms">
          <PlaneInputForm plane={plane} setPlane={setPlane} />
          <PointInputForm point={point} setPoint={setPoint} />
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

              <h3 style={{ marginTop: "20px" }}>Točka:</h3>
              {renderPoint(point.x || 0, point.y || 0, point.z || 0)}

              <h3 style={{ marginTop: "20px" }}>
                Rezultat:{" "}
                <span>
                  {result
                    ? "Točka pripada ravnini"
                    : "Točka ne pripada ravnini"}
                </span>
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
                <p>
                  Točka T(x,y,z) pripada ravnini ako zadovoljava jednadžbu ravnine:{" "}
                  <BlockMath math="A*x + B*y + C*z + D = 0" />
                </p>
              )}
            </div>
          </div>
        )}

        <FullscreenModal
          isOpen={showVisualizer}
          onClose={() => setShowVisualizer(false)}
        >
          <PointBelongingVisualizer plane={plane} point={point} />
        </FullscreenModal>
      </div>
    </>
  );
}
