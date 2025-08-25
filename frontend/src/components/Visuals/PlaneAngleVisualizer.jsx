import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

const parsePlane = ({ A, B, C, D }) => ({
  A: parseFloat(A),
  B: parseFloat(B),
  C: parseFloat(C),
  D: parseFloat(D),
});

const sketch = (p5) => {
  let plane1, plane2;
  let angleX = 0;
  let angleY = 0;
  let zoom = 1;
  let dragging = false;
  let lastX, lastY;
  let isMobile = false;

  p5.updateWithProps = (props) => {
    if (props.plane1 && props.plane2) {
      plane1 = parsePlane(props.plane1);
      plane2 = parsePlane(props.plane2);
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    canvas.parent("visualizer-canvas");

    isMobile = window.innerWidth <= 768;

    
    zoom = isMobile ? 0.7 : 1;
    angleX = isMobile ? -0.8 : -0.6;
    angleY = isMobile ? 0.7 : 0.5;
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

    if (plane1) drawPlane(p5, plane1, [255, 0, 0, 90], "π₁");
    if (plane2) drawPlane(p5, plane2, [0, 0, 255, 90], "π₂");
  };

  function drawPlane(p5, plane, color, labelText) {
    const size = isMobile ? 180 : 220;
    const normal = p5.createVector(plane.A, plane.B, plane.C).normalize();
    const point = findPointOnPlane(plane);

    let u = normal.copy().cross(p5.createVector(0, 0, 1));
    if (u.mag() === 0) u = p5.createVector(1, 0, 0);
    u.normalize().mult(size);
    const v = normal.copy().cross(u).normalize().mult(size);

    p5.push();
    p5.translate(point.x, point.y, point.z);
    p5.stroke(...color);
    p5.fill(...color);
    p5.beginShape();
    p5.vertex(-u.x - v.x, -u.y - v.y, -u.z - v.z);
    p5.vertex(u.x - v.x, u.y - v.y, u.z - v.z);
    p5.vertex(u.x + v.x, u.y + v.y, u.z + v.z);
    p5.vertex(-u.x + v.x, -u.y + v.y, -u.z + v.z);
    p5.endShape(p5.CLOSE);

    label(p5, labelText, 0, 0, 0, 16);
    p5.pop();
  }

  function findPointOnPlane({ A, B, C, D }) {
    if (C !== 0) return p5.createVector(0, 0, -D / C);
    if (B !== 0) return p5.createVector(0, -D / B, 0);
    if (A !== 0) return p5.createVector(-D / A, 0, 0);
    return p5.createVector(0, 0, 0);
  }

  function label(p5, text, x, y, z, size = 12) {
    p5.push();
    p5.translate(x, y, z);
    p5.rotateX(-angleX);
    p5.rotateY(-angleY);
    p5.fill(0);
    p5.noStroke();
    p5.textSize(size);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(text, 0, 0);
    p5.pop();
  }
};

const PlaneAngleVisualizer = ({ plane1, plane2 }) => {
  if (!plane1 || !plane2) return null;

  return (
    <div id="visualizer-canvas" style={{ width: "100%", height: "100vh" }}>
      <ReactP5Wrapper sketch={sketch} plane1={plane1} plane2={plane2} />
    </div>
  );
};

export default PlaneAngleVisualizer;
