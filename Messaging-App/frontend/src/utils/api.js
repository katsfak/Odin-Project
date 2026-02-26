const API_BASE_URL = "/api";

// Auth
export async function register(username, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(response);
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function getCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function logout(token) {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

// Users
export async function getUsers(token) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function searchUsers(query, token) {
  const response = await fetch(
    `${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return handleResponse(response);
}

export async function getUserProfile(userId, token) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function updateProfile(userId, data, token) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// Messages
export async function sendMessage(recipientId, content, imageUrl, token) {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipientId, content, imageUrl }),
  });
  return handleResponse(response);
}

export async function getConversations(token) {
  const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function getConversation(userId, token) {
  const response = await fetch(`${API_BASE_URL}/messages/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function deleteMessage(messageId, token) {
  const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

// Friendships
export async function addFriend(friendId, token) {
  const response = await fetch(`${API_BASE_URL}/friendships`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friendId }),
  });
  return handleResponse(response);
}

export async function getFriends(token) {
  const response = await fetch(`${API_BASE_URL}/friendships`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function getOnlineFriends(token) {
  const response = await fetch(`${API_BASE_URL}/friendships/online`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function getPendingRequests(token) {
  const response = await fetch(`${API_BASE_URL}/friendships/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function acceptFriend(friendshipId, token) {
  const response = await fetch(`${API_BASE_URL}/friendships/${friendshipId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

export async function removeFriend(friendshipId, token) {
  const response = await fetch(`${API_BASE_URL}/friendships/${friendshipId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

// Utility
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }
  return data;
}
