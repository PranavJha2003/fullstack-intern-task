const API_URL = "http://localhost:5000/api/favorites";

function getToken() {
  return localStorage.getItem("token");
}

async function favoriteRequest(url, options = {}) {
  const token = getToken();

  if (!token) {
    throw new Error("Please log in to manage your favorites.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Favorite request failed.");
  }

  return data;
}

export function getFavorites() {
  return favoriteRequest(API_URL);
}

export function addFavorite(templateId) {
  return favoriteRequest(`${API_URL}/${templateId}`, {
    method: "POST",
  });
}

export function removeFavorite(templateId) {
  return favoriteRequest(`${API_URL}/${templateId}`, {
    method: "DELETE",
  });
}