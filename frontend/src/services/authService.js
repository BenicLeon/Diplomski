const API_URL = 'https://localhost:7142/api/Auth';


const handleError = async (response) => {
  let message = 'Došlo je do greške.';
  try {
    const errorData = await response.json();
    if (errorData?.error) {
      message = errorData.error;
      if (errorData.details) {
        message += ` Detalji: ${errorData.details}`;
      }
    }
  } catch (err) {
    message = await response.text();
  }
  throw new Error(message);
};

export const register = async (username, email, password, confirmPassword) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });

  if (!response.ok) {
    await handleError(response);
  }

  return await response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    await handleError(response);
  }

  return await response.json();
};

export const getStoredToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || null;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (err) {
    return true;
  }
};
