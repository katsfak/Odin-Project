/**
 * Coordinate utilities for handling different screen sizes
 */

/**
 * Calculate distance between two points
 */
export function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Check if a click is within tolerance of a character's position
 * @param {number} clickX - Click X coordinate (in image pixels)
 * @param {number} clickY - Click Y coordinate (in image pixels)
 * @param {number} characterX - Character X coordinate (in image pixels)
 * @param {number} characterY - Character Y coordinate (in image pixels)
 * @param {number} radius - Tolerance radius in pixels
 * @returns {boolean} True if click is within tolerance
 */
export function isClickValid(clickX, clickY, characterX, characterY, radius) {
  const distance = calculateDistance(clickX, clickY, characterX, characterY);
  return distance <= radius;
}

/**
 * Normalize coordinates from different screen sizes to image coordinates
 * This handles the case where the image is displayed at different sizes
 *
 * @param {number} screenX - Click X coordinate on screen
 * @param {number} screenY - Click Y coordinate on screen
 * @param {DOMRect} imageBounds - The bounding rectangle of the image element
 * @param {number} imageNaturalWidth - The actual width of the image in pixels
 * @param {number} imageNaturalHeight - The actual height of the image in pixels
 * @returns {object} Normalized coordinates {x, y} in image pixel space
 */
export function normalizeCoordinates(
  screenX,
  screenY,
  imageBounds,
  imageNaturalWidth,
  imageNaturalHeight,
) {
  // Calculate the position relative to the image element
  const relativeX = screenX - imageBounds.left;
  const relativeY = screenY - imageBounds.top;

  // Calculate the scaling factor
  const scaleX = imageNaturalWidth / imageBounds.width;
  const scaleY = imageNaturalHeight / imageBounds.height;

  // Convert to image coordinates
  const imageX = relativeX * scaleX;
  const imageY = relativeY * scaleY;

  return {
    x: Math.round(imageX),
    y: Math.round(imageY),
  };
}

/**
 * Convert mouse event to image coordinates
 * @param {MouseEvent} event - The mouse event
 * @param {HTMLImageElement} imageElement - The image element
 * @returns {object} Normalized coordinates {x, y}
 */
export function getImageCoordinatesFromEvent(event, imageElement) {
  const imageBounds = imageElement.getBoundingClientRect();

  return normalizeCoordinates(
    event.clientX,
    event.clientY,
    imageBounds,
    imageElement.naturalWidth,
    imageElement.naturalHeight,
  );
}
