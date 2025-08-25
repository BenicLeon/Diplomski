import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import RobotoFont from "../../assets/Roboto-Black.ttf";

const sketch = (p5) => {
  let point1, point2;
  let angleX = 0;
  let angleY = 0;
  let zoom = 10;
  let dragging = false;
  let lastX, lastY;
  let font;
  let isMobile = false;

  p5.preload = () => {
    font = p5.loadFont(RobotoFont);
  };

  p5.updateWithProps = (props) => {
    if (props.point1 && props.point2) {
      point1 = parsePoint(props.point1);
      point2 = parsePoint(props.point2);
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    canvas.parent("visualizer-canvas");
    p5.textFont(font);

    isMobile = window.innerWidth <= 768;

    // Početne vrijednosti za mobilne uređaje
    zoom = isMobile ? 9 : 10;
    angleX = isMobile ? 0.6 : 0;
    angleY = isMobile ? 1 : 0;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
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
      drawLine(p5, point1, point2);
      drawPoint(p5, point1, "T1");
      drawPoint(p5, point2, "T2");
    }
  };

  function parsePoint({ x, y, z }) {
    return {
      x: parseFloat(x),
      y: parseFloat(y),
      z: parseFloat(z),
    };
  }

  function drawLine(p5, p1, p2) {
    p5.push();
    p5.strokeWeight(2);
    p5.stroke(0, 0, 255);
    p5.line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    p5.pop();
  }

  function drawPoint(p5, pt, label) {
    p5.push();
    p5.translate(pt.x, pt.y, pt.z);
    p5.fill(0);
    p5.noStroke();
    p5.sphere(1);
    p5.pop();
  }
};

const LineFromPointsVisualizer = ({ point1, point2 }) => {
  if (!point1 || !point2) return null;

  return (
    <div id="visualizer-canvas" style={{ width: "100%", height: "100vh" }}>
      <ReactP5Wrapper sketch={sketch} point1={point1} point2={point2} />
    </div>
  );
};

export default LineFromPointsVisualizer;
