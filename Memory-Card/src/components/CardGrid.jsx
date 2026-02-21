import MemoryCard from "./MemoryCard";

function CardGrid({ cards, onCardClick }) {
  return (
    <ul className="card-grid" aria-label="Pokemon card grid">
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} onCardClick={onCardClick} />
      ))}
    </ul>
  );
}

export default CardGrid;
