import 'isomorphic-fetch';

export const create = async (form) => {
  const body = JSON.stringify(form);
  const res = await fetch('/decks/import', {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await res.json();
  if (res.status >= 400 || json.error) {
    throw new Error(json.message);
  }
  return json;
};

export const myDecks = async ({ token }) => {
  const { API_URL } = process.env;
  const res = await fetch(`${API_URL}/decks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  if (res.status >= 400 || json.error) {
    throw new Error(json.message);
  }
  return json;
};

export const getDeck = async ({ token, deckId }) => {
  const { API_URL } = process.env;
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}/decks/${deckId}`, { headers });
  const json = await res.json();
  if (res.status >= 400 || json.error) {
    throw new Error(json.message);
  }
  return json;
};
