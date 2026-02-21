function MemoryCard({ card, onCardClick }) {
  return (
    <li>
      <button
        type="button"
        className="memory-card"
        onClick={() => onCardClick(card.id)}
        aria-label={`Choose ${card.name}`}
      >
        <img src={card.image} alt={card.name} loading="lazy" />
        <div className="memory-card__text">
          <h2>{card.name}</h2>
          <p>{card.subtitle}</p>
        </div>
      </button>
    </li>
  );
}

export default MemoryCard;
