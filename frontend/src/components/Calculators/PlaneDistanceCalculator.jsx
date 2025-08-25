import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PlaneDistanceInfoModal from "../Modals/PlaneDistanceInfoModal";
import PlaneInputForm from "../Forms/PlaneInputForm";
import PlaneDistanceVisualizer from "../Visuals/PlaneDistanceVisualizer";
import FullscreenModal from "../Modals/FullscreenModal";
import {
  transformToGeneralForm,
  calculateDistancePlanes,
} from "../../services/geometryService";
import { extractSteps } from "../../services/extractSteps";
import MathBackgroundCalculator from "../Helpers/MathBackgroundCalculator";
import "../../css/geometry.css";

export default function PlaneDistanceCalculator() {
  const [plane1, setPlane1] = useState({});
  const [plane2, setPlane2] = useState({});
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
    try {
      const transformed = [
        transformToGeneralForm(plane1),
        transformToGeneralForm(plane2),
      ];

      const allZero = transformed.some(
        (p) => p.A === 0 && p.B === 0 && p.C === 0
      );
      if (allZero) {
        toast.error("Ravnina mora imati barem jedan koeficijent A, B ili C različit od 0.");
        return;
      }

      const response = await calculateDistancePlanes(transformed);
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
          Udaljenost između dviju ravnina
          <FaInfoCircle
            onClick={() => setShowInfo(true)}
            className="geometry-info"
          />
        </h2>

        <PlaneDistanceInfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />

        <div className="geometry-forms">
          <PlaneInputForm plane={plane1} setPlane={setPlane1} />
          <PlaneInputForm plane={plane2} setPlane={setPlane2} />
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
              Prikaži ravnine
            </button>
          )}
        </div>

        <div className="geometry-floating-result">
          {result ? (
            <>
              <h3>Rezultat: <span>{result.result}</span></h3>
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
          <PlaneDistanceVisualizer
            plane1={plane1}
            plane2={plane2}
            distance={result?.result}
          />
        </FullscreenModal>
      </div>
    </>
  );
}
