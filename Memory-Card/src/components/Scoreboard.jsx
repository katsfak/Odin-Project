function Scoreboard({ currentScore, bestScore }) {
  return (
    <section className="scoreboard" aria-label="Scoreboard">
      <p>
        Current Score
        <span>{currentScore}</span>
      </p>
      <p>
        Best Score
        <span>{bestScore}</span>
      </p>
    </section>
  );
}

export default Scoreboard;
