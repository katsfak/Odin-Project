import React from "react";
import "./CharacterDropdown.css";

function CharacterDropdown({
  position,
  characters,
  onSelect,
  validating,
  imageRef,
}) {
  if (!imageRef.current) return null;

  const imageBounds = imageRef.current.getBoundingClientRect();
  const scaleX = imageBounds.width / imageRef.current.naturalWidth;
  const scaleY = imageBounds.height / imageRef.current.naturalHeight;

  // Convert image coordinates to screen coordinates
  const screenX = imageBounds.left + position.x * scaleX;
  const screenY = imageBounds.top + position.y * scaleY;

  return (
    <div
      className="dropdown"
      style={{
        left: `${screenX}px`,
        top: `${screenY + 70}px`,
      }}
    >
      <div className="dropdown-title">Who is this?</div>
      {characters.length === 0 ? (
        <div className="no-characters">All characters found!</div>
      ) : (
        <ul className="dropdown-list">
          {characters.map((character) => (
            <li key={character.id}>
              <button
                className="dropdown-item"
                onClick={() => onSelect(character)}
                disabled={validating}
              >
                {character.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CharacterDropdown;
