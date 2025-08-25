import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "katex/dist/katex.min.css";

import PlaneInputForm from "../Forms/PlaneInputForm";
import LineInputForm from "../Forms/LineInputForm";
import PlaneLineAngleInfoModal from "../Modals/PlaneLineAngleInfoModal";
import PlaneLineAngleVisualizer from "../Visuals/PlaneLineAngleVisualizer";
import FullscreenModal from "../Modals/FullscreenModal";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";

import { extractSteps } from "../../services/extractSteps";
import {
  transformToGeneralForm,
  calculateAnglePlaneLine,
} from "../../services/geometryService";

import "../../css/geometry.css";

export default function PlaneLineAngleCalculator() {
  const [plane, setPlane] = useState({});
  const [line, setLine] = useState({});
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

    const hasDirection = [line.a, line.b, line.c].some(
      (val) => parseFloat(val) !== 0
    );

    if (!hasDirection) {
      toast.error("Pravac mora imati barem jedan nenulti koeficijent a, b ili c.");
      return;
    }

    try {
      const response = await calculateAnglePlaneLine(transformedPlane, line);
      setResult(response);
    } catch (err) {
      toast.error("Greška: " + err.message);
    }
  };

  return (
    <>
      <MathBackgroundCalculator />
      <div className="geometry-wrapper">
        <Link to="/home" className="geometry-back">
          <FaArrowLeft />
        </Link>
        <h2 className="geometry-title">
          Kut između ravnine i pravca
          <FaInfoCircle
            className="geometry-info"
            onClick={() => setShowInfo(true)}
          />
        </h2>

        <PlaneLineAngleInfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />

        <div className="geometry-forms">
          <PlaneInputForm plane={plane} setPlane={setPlane} />
          <LineInputForm line={line} setLine={setLine} />
        </div>

        <div className="geometry-actions">
          <button className="calculate-button" onClick={handleSubmit}>
            Izračunaj
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
              <h3>Rezultat: <span>{result.result}°</span></h3>
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
                  Kliknite na <strong>Izračunaj</strong> kako biste prikazali korake.
                </p>
              </div>
            </>
          )}
        </div>

        <FullscreenModal
          isOpen={showVisualizer}
          onClose={() => setShowVisualizer(false)}
        >
          <PlaneLineAngleVisualizer plane={plane} line={line} />
        </FullscreenModal>
      </div>
    </>
  );
}
