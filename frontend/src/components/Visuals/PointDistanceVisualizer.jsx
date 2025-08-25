import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import fontFile from "../../assets/Roboto-Black.ttf";

const sketch = (p5) => {
  let point1, point2, font;
  let angleX = 0;
  let angleY = 0;
  let zoom = 10;
  let dragging = false;
  let lastX, lastY;

  p5.preload = () => {
    font = p5.loadFont(fontFile);
  };

  p5.updateWithProps = (props) => {
    point1 = props.point1 ? parsePoint(props.point1) : null;
    point2 = props.point2 ? parsePoint(props.point2) : null;
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    canvas.parent("visualizer-canvas");
    p5.textFont(font);
  };

  p5.mouseWheel = (event) => {
    zoom += event.delta > 0 ? -0.05 : 0.05;
    zoom = p5.constrain(zoom, 0.2, 3);
  };

  p5.mousePressed = () => {
    dragging = true;
    lastX = p5.mouseX;
    lastY = p5.mouseY;
  };

  p5.mouseReleased = () => {
    dragging = false;
  };

  p5.draw = () => {
    p5.background(255);
    p5.scale(zoom);
    p5.rotateX(angleX);
    p5.rotateY(angleY);

    if (dragging) {
      angleY += (p5.mouseX - lastX) * 0.01;
      angleX += (p5.mouseY - lastY) * 0.01;
      lastX = p5.mouseX;
      lastY = p5.mouseY;
    }

    if (point1 && point2) {

      drawPoint(p5, point1, "T1");
      drawPoint(p5, point2, "T2");
    }
  };

  function drawPoint(p5, pt, label) {
    p5.push();
    p5.translate(pt.x, pt.y, pt.z);
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.sphere(2);
    p5.rotateX(-angleX);
    p5.rotateY(-angleY);
    p5.fill(0);
    p5.textSize(3);
    p5.textAlign(p5.CENTER, p5.BOTTOM);
    p5.text(`${label}`,5, -5);
    p5.pop();
  }

  function parsePoint(p) {
    return p5.createVector(
      parseFloat(p.x || 0),
      parseFloat(p.y || 0),
      parseFloat(p.z || 0)
    );
  }
};

const PointDistanceVisualizer = ({ point1, point2 }) => {
  if (!point1 || !point2) return null;

  return (
    <div id="visualizer-canvas" style={{ width: "100%", height: "100%" }}>
      <ReactP5Wrapper sketch={sketch} point1={point1} point2={point2} />
    </div>
  );
};

export default PointDistanceVisualizer;
