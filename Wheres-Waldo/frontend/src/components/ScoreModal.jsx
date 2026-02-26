import React, { useState } from "react";
import { formatTime } from "../utils/coordinates";
import "./ScoreModal.css";

function ScoreModal({ time, imageName, onSubmit, onClose }) {
  const [playerName, setPlayerName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      setSubmitting(true);
      await onSubmit(playerName);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🎉 Congratulations! 🎉</h2>
        </div>

        <div className="modal-content">
          <p className="image-title">
            You found all characters in "{imageName}"!
          </p>

          <div className="score-display">
            <div className="time-label">Your Time:</div>
            <div className="time-value">{formatTime(time)}</div>
          </div>

          <form onSubmit={handleSubmit} className="score-form">
            <label htmlFor="playerName">
              Enter your name for the high scores:
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              disabled={submitting}
              autoFocus
              maxLength={50}
            />
            <div className="button-group">
              <button
                type="submit"
                disabled={!playerName.trim() || submitting}
                className="submit-button"
              >
                {submitting ? "Submitting..." : "Submit Score"}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="skip-button"
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScoreModal;
