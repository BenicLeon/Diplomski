import { getAuthHeaders, handleApiResponse } from './authHeader';

const API_URL = 'https://localhost:7142/api/geometry';

export function transformToGeneralForm(input) {
  const parseOrZero = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  return {
    A: parseOrZero(input.A),
    B: parseOrZero(input.B),
    C: parseOrZero(input.C),
    D: parseOrZero(input.D),
  };
}

export async function calculateDistancePlanes(planes) {
  const payload = { first: planes[0], second: planes[1] };
  const res = await fetch(`${API_URL}/distance-between-planes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function calculateAnglePlanes(planes) {
  const payload = { first: planes[0], second: planes[1] };
  const res = await fetch(`${API_URL}/angle-between-planes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function calculateAnglePlaneLine(plane, line) {
  const payload = {
    plane: { a: plane.A, b: plane.B, c: plane.C, d: plane.D },
    line: {
      x: parseFloat(line.a) || 0,
      y: parseFloat(line.b) || 0,
      z: parseFloat(line.c) || 0,
    },
  };
  const res = await fetch(`${API_URL}/angle-between-plane-line`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function checkPointBelongingToPlane(plane, point) {
  const payload = {
    plane: {
      a: parseFloat(plane.A) || 0,
      b: parseFloat(plane.B) || 0,
      c: parseFloat(plane.C) || 0,
      d: parseFloat(plane.D) || 0,
    },
    point: {
      x: parseFloat(point.x) || 0,
      y: parseFloat(point.y) || 0,
      z: parseFloat(point.z) || 0,
    },
  };
  const res = await fetch(`${API_URL}/point-belonging-check`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function checkPlanePassesThroughOrigin(plane) {
  const payload = {
    a: parseFloat(plane.A) || 0,
    b: parseFloat(plane.B) || 0,
    c: parseFloat(plane.C) || 0,
    d: parseFloat(plane.D) || 0,
  };
  const res = await fetch(`${API_URL}/plane-origin-check`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function calculateDistanceFromPointToPlane(plane, point) {
  const payload = {
    plane: {
      a: parseFloat(plane.A) || 0,
      b: parseFloat(plane.B) || 0,
      c: parseFloat(plane.C) || 0,
      d: parseFloat(plane.D) || 0,
    },
    point: {
      x: parseFloat(point.x) || 0,
      y: parseFloat(point.y) || 0,
      z: parseFloat(point.z) || 0,
    },
  };
  const res = await fetch(`${API_URL}/distance-between-plane-point`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function calculateDistanceBetweenPoints(p1, p2) {
  const payload = {
    pointFirst: {
      x: parseFloat(p1.x) || 0,
      y: parseFloat(p1.y) || 0,
      z: parseFloat(p1.z) || 0,
    },
    pointSecond: {
      x: parseFloat(p2.x) || 0,
      y: parseFloat(p2.y) || 0,
      z: parseFloat(p2.z) || 0,
    },
  };
  const res = await fetch(`${API_URL}/points-distance`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function calculateLineFromPoints(p1, p2) {
  const payload = {
    point1: {
      x: parseFloat(p1.x) || 0,
      y: parseFloat(p1.y) || 0,
      z: parseFloat(p1.z) || 0,
    },
    point2: {
      x: parseFloat(p2.x) || 0,
      y: parseFloat(p2.y) || 0,
      z: parseFloat(p2.z) || 0,
    },
  };
  const res = await fetch(`${API_URL}/line-from-points`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export async function calculatePlaneFromThreePoints(p1, p2, p3) {
  const payload = {
    point1: {
      x: parseFloat(p1.x) || 0,
      y: parseFloat(p1.y) || 0,
      z: parseFloat(p1.z) || 0,
    },
    point2: {
      x: parseFloat(p2.x) || 0,
      y: parseFloat(p2.y) || 0,
      z: parseFloat(p2.z) || 0,
    },
    point3: {
      x: parseFloat(p3.x) || 0,
      y: parseFloat(p3.y) || 0,
      z: parseFloat(p3.z) || 0,
    },
  };
  const res = await fetch(`${API_URL}/plane-from-three-points`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return await handleApiResponse(res);
}

export function formatPlaneEquation(plane) {
  const A = parseFloat(plane.A) || 0;
  const B = parseFloat(plane.B) || 0;
  const C = parseFloat(plane.C) || 0;
  const D = parseFloat(plane.D) || 0;

  const format = (coef, variable, isFirst = false) => {
    if (coef === 0) return "";
    const sign = coef > 0 ? (isFirst ? "" : " + ") : " - ";
    return `${sign}${Math.abs(coef)}${variable}`;
  };

  const result =
    format(A, "x", true) +
    format(B, "y") +
    format(C, "z") +
    (D === 0 ? "" : (D > 0 ? " + " : " - ") + Math.abs(D));

  return result.trim() + " = 0";
}
