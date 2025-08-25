import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import RobotoFont from "../../assets/Roboto-Black.ttf";

const parsePlane = ({ A, B, C, D }) => ({
  A: parseFloat(A),
  B: parseFloat(B),
  C: parseFloat(C),
  D: parseFloat(D),
});

const parsePoint = ({ x, y, z }) => ({
  x: parseFloat(x),
  y: parseFloat(y),
  z: parseFloat(z),
});

const sketch = (p5) => {
  let plane, point;
  let angleX = 0;
  let angleY = 0;
  let zoom = 1;
  let dragging = false;
  let lastX, lastY;
  let font;
  let isMobile = false;

  p5.preload = () => {
    font = p5.loadFont(RobotoFont);
  };

  p5.updateWithProps = (props) => {
    if (props.plane && props.point) {
      plane = parsePlane(props.plane);
      point = parsePoint(props.point);
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    canvas.parent("visualizer-canvas");
    p5.textFont(font);

    isMobile = window.innerWidth <= 768;

    zoom = isMobile ? 1.2 : 1;
    angleX = isMobile ? -0.7 : 0;
    angleY = isMobile ? 0.7 : 0;
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

    if (plane) drawPlane(p5, plane, [0, 100, 255, 60]);

    if (point) {
      drawPoint(p5, point, "T");
    }
  };

  function drawPlane(p5, plane, color) {
    const size = isMobile ? 150 : 200;
    const normal = p5.createVector(plane.A, plane.B, plane.C).normalize();
    const center = findPointOnPlane(plane);
    const u = normal.copy().cross(p5.createVector(0, 1, 0)).normalize().mult(size);
    const v = normal.copy().cross(u).normalize().mult(size);

    p5.push();
    p5.translate(center.x, center.y, center.z);
    p5.fill(...color);
    p5.stroke(...color);
    p5.beginShape();
    p5.vertex(-u.x - v.x, -u.y - v.y, -u.z - v.z);
    p5.vertex(u.x - v.x, u.y - v.y, u.z - v.z);
    p5.vertex(u.x + v.x, u.y + v.y, u.z + v.z);
    p5.vertex(-u.x + v.x, -u.y + v.y, -u.z + v.z);
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  function drawPoint(p5, pt, labelText) {
    p5.push();
    p5.translate(pt.x, pt.y, pt.z);
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.sphere(3);

    p5.rotateX(-angleX);
    p5.rotateY(-angleY);
    p5.textFont(font);
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(20);
    p5.text(`${labelText} (${pt.x}, ${pt.y}, ${pt.z})`, 20, -50);
    p5.pop();
  }

  function findPointOnPlane({ A, B, C, D }) {
    if (C !== 0) return p5.createVector(0, 0, -D / C);
    if (B !== 0) return p5.createVector(0, -D / B, 0);
    if (A !== 0) return p5.createVector(-D / A, 0, 0);
    return p5.createVector(0, 0, 0);
  }
};

const PointBelongingVisualizer = ({ plane, point }) => {
  if (!plane || !point) return null;

  return (
    <div id="visualizer-canvas" style={{ width: "100%", height: "100vh" }}>
      <ReactP5Wrapper sketch={sketch} plane={plane} point={point} />
    </div>
  );
};

export default PointBelongingVisualizer;
