import React from "react";
import "./TargetBox.css";

function TargetBox({ position, imageRef }) {
  if (!imageRef.current) return null;

  const imageBounds = imageRef.current.getBoundingClientRect();
  const scaleX = imageBounds.width / imageRef.current.naturalWidth;
  const scaleY = imageBounds.height / imageRef.current.naturalHeight;

  // Convert image coordinates back to screen coordinates for display
  const screenX = imageBounds.left + position.x * scaleX;
  const screenY = imageBounds.top + position.y * scaleY;

  const boxSize = 60;

  return (
    <div
      className="target-box"
      style={{
        left: `${screenX - boxSize / 2}px`,
        top: `${screenY - boxSize / 2}px`,
        width: `${boxSize}px`,
        height: `${boxSize}px`,
      }}
    />
  );
}

export default TargetBox;
