const API_BASE = "/api";

function getHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Auth
export async function register(username, email, password, confirmPassword) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
}

export async function getCurrentUser(token) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getHeaders(token),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

// Users
export async function getAllUsers(token, page = 1, limit = 20) {
  const res = await fetch(`${API_BASE}/users?page=${page}&limit=${limit}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUserProfile(token, userId) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(userId, token, updates) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
}

export async function searchUsers(token, query) {
  const res = await fetch(
    `${API_BASE}/users/search?q=${encodeURIComponent(query)}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

// Posts
export async function createPost(token, content, imageUrl) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ content, imageUrl }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
}

export async function getFeedPosts(token, page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE}/posts/feed?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json();
}

export async function getUserPosts(token, userId, page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE}/posts/user/${userId}?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPost(token, postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function deletePost(token, postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}

// Comments
export async function createComment(token, postId, content) {
  const res = await fetch(`${API_BASE}/comments/${postId}/comments`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
}

export async function getPostComments(token, postId, page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE}/comments/${postId}/comments?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function deleteComment(token, commentId) {
  const res = await fetch(`${API_BASE}/comments/comments/${commentId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
}

// Likes
export async function likePost(token, postId) {
  const res = await fetch(`${API_BASE}/likes/posts/${postId}/like`, {
    method: "POST",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to like post");
  return res.json();
}

export async function unlikePost(token, postId) {
  const res = await fetch(`${API_BASE}/likes/posts/${postId}/like`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to unlike post");
  return res.json();
}

export async function likeComment(token, commentId) {
  const res = await fetch(`${API_BASE}/likes/comments/${commentId}/like`, {
    method: "POST",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to like comment");
  return res.json();
}

export async function unlikeComment(token, commentId) {
  const res = await fetch(`${API_BASE}/likes/comments/${commentId}/like`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to unlike comment");
  return res.json();
}

// Follow
export async function sendFollowRequest(token, targetUserId) {
  const res = await fetch(`${API_BASE}/follow/request`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ targetUserId }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
}

export async function acceptFollowRequest(token, followId) {
  const res = await fetch(`${API_BASE}/follow/${followId}/accept`, {
    method: "PUT",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to accept request");
  return res.json();
}

export async function declineFollowRequest(token, followId) {
  const res = await fetch(`${API_BASE}/follow/${followId}/decline`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to decline request");
  return res.json();
}

export async function unfollow(token, targetUserId) {
  const res = await fetch(`${API_BASE}/follow/${targetUserId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to unfollow");
  return res.json();
}

export async function getFollowing(token, userId, page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE}/follow/user/${userId}/following?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Failed to fetch following");
  return res.json();
}

export async function getFollowers(token, userId, page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE}/follow/user/${userId}/followers?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Failed to fetch followers");
  return res.json();
}

export async function getPendingRequests(token, page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE}/follow/requests/pending?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(token),
    },
  );
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}

export async function checkFollowStatus(token, targetUserId) {
  const res = await fetch(`${API_BASE}/follow/status/${targetUserId}`, {
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to check status");
  return res.json();
}
