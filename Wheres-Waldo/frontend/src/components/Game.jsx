import React, { useEffect, useRef, useState } from "react";
import {
    fetchCharacters,
    fetchHighScores,
    submitHighScore,
    validateClick,
} from "../utils/api";
import { formatTime, getImageCoordinatesFromEvent } from "../utils/coordinates";
import CharacterDropdown from "./CharacterDropdown";
import "./Game.css";
import ScoreModal from "./ScoreModal";
import TargetBox from "./TargetBox";

function Game({ imageId, imageName, onGameEnd }) {
  const imageRef = useRef(null);

  // Game state
  const [imageUrl, setImageUrl] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [clickPosition, setClickPosition] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [validating, setValidating] = useState(false);
  const [message, setMessage] = useState("");
  const [gameComplete, setGameComplete] = useState(false);

  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const timerRef = useRef(null);

  // Load game data
  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacters(imageId);
        setCharacters(data);

        // Get image URL from API
        const response = await fetch(`/api/images/${imageId}`);
        const imageData = await response.json();
        setImageUrl(imageData.imageUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, [imageId]);

  // Timer
  useEffect(() => {
    if (!gameComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime((t) => t + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameComplete]);

  // Handle image click
  const handleImageClick = (e) => {
    if (!imageRef.current) return;

    const coords = getImageCoordinatesFromEvent(e, imageRef.current);
    setClickPosition(coords);
    setShowDropdown(true);
    setMessage("");
  };

  // Handle character selection from dropdown
  const handleSelectCharacter = async (character) => {
    if (!clickPosition) return;

    try {
      setValidating(true);
      setMessage("Checking...");

      const result = await validateClick(
        character.id,
        clickPosition.x,
        clickPosition.y,
      );

      if (result.correct) {
        setFoundCharacters((prev) => new Set([...prev, character.id]));
        setMessage(`✓ Found ${character.name}!`);

        // Check if game is complete
        const newFound = new Set([...foundCharacters, character.id]);
        if (newFound.size === characters.length) {
          setGameComplete(true);
          setShowScoreModal(true);
        }
      } else {
        setMessage("✗ Not quite, try again!");
      }
    } catch (err) {
      setMessage("Error validating click");
    } finally {
      setValidating(false);
      setShowDropdown(false);
    }
  };

  // Handle clicking outside the dropdown
  const handleClickOutside = (e) => {
    if (e.target !== imageRef.current && !e.target.closest(".dropdown")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdown]);

  if (loading) return <div className="loading">Loading game...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const remainingCharacters = characters.filter(
    (c) => !foundCharacters.has(c.id),
  );

  return (
    <div className="game">
      <div className="game-header">
        <div className="header-info">
          <h2>{imageName}</h2>
          <p className="timer">{formatTime(elapsedTime)}</p>
        </div>
        <div className="character-list">
          <h3>
            Find: {foundCharacters.size}/{characters.length}
          </h3>
          <ul>
            {characters.map((char) => (
              <li
                key={char.id}
                className={foundCharacters.has(char.id) ? "found" : ""}
              >
                <span className="character-name">{char.name}</span>
                {foundCharacters.has(char.id) && (
                  <span className="checkmark">✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="image-container">
        <img
          ref={imageRef}
          src={imageUrl}
          alt={imageName}
          className="game-image"
          onClick={handleImageClick}
        />

        {/* Target box */}
        {clickPosition && (
          <TargetBox position={clickPosition} imageRef={imageRef} />
        )}

        {/* Character dropdown */}
        {showDropdown && clickPosition && (
          <CharacterDropdown
            position={clickPosition}
            characters={remainingCharacters}
            onSelect={handleSelectCharacter}
            validating={validating}
            imageRef={imageRef}
          />
        )}

        {/* Message feedback */}
        {message && (
          <div
            className={`message ${message.includes("✓") ? "success" : "error"}`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Score modal */}
      {showScoreModal && (
        <ScoreModal
          time={elapsedTime}
          imageName={imageName}
          onSubmit={(playerName) => {
            submitHighScore(imageId, playerName, elapsedTime);
            setShowScoreModal(false);
            onGameEnd();
          }}
          onClose={() => {
            setShowScoreModal(false);
            onGameEnd();
          }}
        />
      )}
    </div>
  );
}

export default Game;
