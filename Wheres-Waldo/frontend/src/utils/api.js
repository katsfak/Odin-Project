const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Get all images
 */
export async function fetchImages() {
  const response = await fetch(`${API_BASE_URL}/images`);
  if (!response.ok) throw new Error("Failed to fetch images");
  return response.json();
}

/**
 * Get a specific image
 */
export async function fetchImage(id) {
  const response = await fetch(`${API_BASE_URL}/images/${id}`);
  if (!response.ok) throw new Error("Failed to fetch image");
  return response.json();
}

/**
 * Get characters for an image
 */
export async function fetchCharacters(imageId) {
  const response = await fetch(`${API_BASE_URL}/characters/image/${imageId}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
}

/**
 * Validate a click against a character location
 */
export async function validateClick(characterId, clickX, clickY) {
  const response = await fetch(`${API_BASE_URL}/validate/click`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      characterId,
      clickX,
      clickY,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Validation failed");
  }

  return response.json();
}

/**
 * Get high scores for an image
 */
export async function fetchHighScores(imageId, limit = 10) {
  const response = await fetch(
    `${API_BASE_URL}/high-scores/image/${imageId}?limit=${limit}`,
  );
  if (!response.ok) throw new Error("Failed to fetch high scores");
  return response.json();
}

/**
 * Submit a new high score
 */
export async function submitHighScore(imageId, playerName, timeInSeconds) {
  const response = await fetch(`${API_BASE_URL}/high-scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageId,
      playerName,
      timeInSeconds,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to submit high score");
  }

  return response.json();
}
