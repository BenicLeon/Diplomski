import { getAuthHeaders } from './authHeader';

const API_URL = 'https://localhost:7142/api/User';

const handleError = async (response, fallbackMessage) => {
  try {
    const err = await response.json();
    throw new Error(`${err.error}${err.details ? ` - ${err.details}` : ''}`);
  } catch {
    throw new Error(fallbackMessage);
  }
};


export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    await handleError(response, 'Neuspješno dohvaćanje korisnika.');
  }

  return await response.json();
};


export const createUser = async (form) => {
  const response = await fetch(`${API_URL}/addUser`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    await handleError(response, 'Kreiranje korisnika nije uspjelo.');
  }

  return await response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/edit/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    await handleError(response, 'Ažuriranje korisnika nije uspjelo.');
  }

  return await response.json();
};


export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(false)
  });

  if (!response.ok) {
    await handleError(response, 'Brisanje korisnika nije uspjelo.');
  }

  return true;
};
