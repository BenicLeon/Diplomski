import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

const parsePlane = ({ A, B, C, D }) => ({
  A: parseFloat(A),
  B: parseFloat(B),
  C: parseFloat(C),
  D: parseFloat(D),
});

const parseLine = ({ a, b, c }) => ({
  a: parseFloat(a),
  b: parseFloat(b),
  c: parseFloat(c),
});

const sketch = (p5) => {
  let plane, line;
  let angleX = -0.6;
  let angleY = 0.5;
  let zoom = 1;
  let dragging = false;
  let lastX, lastY;

  p5.updateWithProps = (props) => {
    if (props.plane && props.line) {
      plane = parsePlane(props.plane);
      line = parseLine(props.line);
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    canvas.parent("visualizer-canvas");
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

    if (plane) drawPlane(p5, plane, [255, 0, 0, 80], "π");

    if (line) drawLine(p5, line, [0, 0, 255], "l");
  };

  function drawPlane(p5, plane, color, labelText) {
    const size = 220;
    const normal = p5.createVector(plane.A, plane.B, plane.C).normalize();
    const point = findPointOnPlane(plane);

    let u = normal.copy().cross(p5.createVector(0, 0, 1));
    if (u.mag() === 0) u = p5.createVector(1, 0, 0);
    u.normalize().mult(size);
    const v = normal.copy().cross(u).normalize().mult(size);

    p5.push();
    p5.translate(point.x, point.y, point.z);
    p5.fill(...color);
    p5.stroke(...color);
    p5.beginShape();
    p5.vertex(-u.x - v.x, -u.y - v.y, -u.z - v.z);
    p5.vertex(u.x - v.x, u.y - v.y, u.z - v.z);
    p5.vertex(u.x + v.x, u.y + v.y, u.z + v.z);
    p5.vertex(-u.x + v.x, -u.y + v.y, -u.z + v.z);
    p5.endShape(p5.CLOSE);
    label(p5, labelText, 0, 0, 0, 18);
    p5.pop();
  }

  function drawLine(p5, line, color, labelText) {
    const dir = p5.createVector(line.a, line.b, line.c).normalize().mult(300);
    const p1 = p5.createVector(0, 0, 0);
    const p2 = p5.createVector(dir.x, dir.y, dir.z);

    p5.push();
    p5.stroke(...color);
    p5.strokeWeight(2);
    p5.line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    p5.pop();

    label(p5, labelText, p2.x, p2.y, p2.z, 18);
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

  function findPointOnPlane({ A, B, C, D }) {
    if (C !== 0) return p5.createVector(0, 0, -D / C);
    if (B !== 0) return p5.createVector(0, -D / B, 0);
    if (A !== 0) return p5.createVector(-D / A, 0, 0);
    return p5.createVector(0, 0, 0);
  }
};

const PlaneLineAngleVisualizer = ({ plane, line }) => {
  if (!plane || !line) return null;

  return (
    <div id="visualizer-canvas" style={{ width: "100%", height: "100vh" }}>
      <ReactP5Wrapper sketch={sketch} plane={plane} line={line} />
    </div>
  );
};

export default PlaneLineAngleVisualizer;
