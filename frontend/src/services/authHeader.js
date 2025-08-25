export const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))?.token || '';
  } catch {
    return '';
  }
};

export const getAuthHeaders = (isJson = true) => {
  const headers = {
    'Authorization': `Bearer ${getToken()}`
  };
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export async function handleApiResponse(response) {
  if (response.ok) {
    return await response.json();
  }

  let message = "Greška prilikom poziva API-ja.";
  try {
    const errorBody = await response.json();
    message = errorBody.error || message;
    if (errorBody.details) message += ` (${errorBody.details})`;
  } catch {
    try {
      message = await response.text();
    } catch {}
  }

  throw new Error(message);
}
