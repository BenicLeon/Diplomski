import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import RobotoFont from "../../assets/Roboto-Black.ttf";

const sketch = (p5) => {
  let font;
  let points = [];
  let angleX = 0;
  let angleY = 0;
  let zoom = 1;
  let dragging = false;
  let lastX, lastY;
  let isMobile = false;

  p5.preload = () => {
    font = p5.loadFont(RobotoFont);
  };

  p5.updateWithProps = (props) => {
    if (props.points) {
      points = props.points.map((p) => p5.createVector(p.x, p.y, p.z));
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    canvas.parent("visualizer-canvas");
    p5.textFont(font);

    isMobile = window.innerWidth <= 768;

    zoom = isMobile ? 1.1 : 1;
    angleX = isMobile ? -0.9 : 0;
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

    if (points.length === 3) {
      drawPlane(p5, points);
      points.forEach((pt, i) => drawPoint(p5, pt, `T${i + 1}`));
    }
  };

  function drawPlane(p5, [p1, p2, p3]) {
    const v1 = p5.createVector(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    const v2 = p5.createVector(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);

    const size = isMobile ? 130 : 150;
    const u = v1.copy().normalize().mult(size);
    const v = v2.copy().normalize().mult(size);

    p5.push();
    p5.translate(p1.x, p1.y, p1.z);
    p5.fill(255, 0, 0, 100);
    p5.stroke(255, 0, 0, 150);
    p5.beginShape();
    p5.vertex(-u.x - v.x, -u.y - v.y, -u.z - v.z);
    p5.vertex(u.x - v.x, u.y - v.y, u.z - v.z);
    p5.vertex(u.x + v.x, u.y + v.y, u.z + v.z);
    p5.vertex(-u.x + v.x, -u.y + v.y, -u.z + v.z);
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  function drawPoint(p5, pt, label) {
    p5.push();
    p5.translate(pt.x, pt.y, pt.z);
    p5.fill(0);
    p5.noStroke();
    p5.sphere(6);

    p5.rotateX(-angleX);
    p5.rotateY(-angleY);
    p5.textFont(font);
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(20);
    p5.text(label, 0, -20);
    p5.pop();
  }
};

const PlaneFromThreePointsVisualizer = ({ points }) => {
  if (!points || points.length !== 3) return null;

  return (
    <div id="visualizer-canvas" style={{ width: "100%", height: "100vh" }}>
      <ReactP5Wrapper sketch={sketch} points={points} />
    </div>
  );
};

export default PlaneFromThreePointsVisualizer;
