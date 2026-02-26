/**
 * Coordinate utilities for the frontend
 */

/**
 * Normalize coordinates from different screen sizes to image coordinates
 * @param {number} screenX - Click X coordinate on screen
 * @param {number} screenY - Click Y coordinate on screen
 * @param {HTMLImageElement} imageElement - The image element
 * @returns {object} Normalized coordinates {x, y} in image pixel space
 */
export function getImageCoordinatesFromEvent(event, imageElement) {
  const imageBounds = imageElement.getBoundingClientRect();

  // Calculate the position relative to the image element
  const relativeX = event.clientX - imageBounds.left;
  const relativeY = event.clientY - imageBounds.top;

  // Calculate the scaling factor
  const scaleX = imageElement.naturalWidth / imageBounds.width;
  const scaleY = imageElement.naturalHeight / imageBounds.height;

  // Convert to image coordinates
  const imageX = relativeX * scaleX;
  const imageY = relativeY * scaleY;

  return {
    x: Math.round(imageX),
    y: Math.round(imageY),
  };
}

/**
 * Format time in seconds to a readable format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}
