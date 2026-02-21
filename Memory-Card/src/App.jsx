import { useEffect, useState } from "react";
import "./App.css";
import CardGrid from "./components/CardGrid";
import Scoreboard from "./components/Scoreboard";
import { fetchPokemonCards } from "./lib/pokemonApi";
import { shuffleArray } from "./utils/shuffle";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState(
    "Pick a card. Don't click the same one twice!",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const randomizeCards = (cardsToShuffle) => shuffleArray(cardsToShuffle);

  useEffect(() => {
    let isMounted = true;

    const loadCards = async () => {
      setCards((previousCards) => randomizeCards(previousCards));
      setIsLoading(true);
      setError("");

      try {
        const pokemonCards = await fetchPokemonCards(12);

        if (!isMounted) {
          return;
        }

        setCards(randomizeCards(pokemonCards));
      } catch {
        if (!isMounted) {
          return;
        }

        setError(
          "Could not load cards from the API. Please refresh and try again.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCards();

    return () => {
      isMounted = false;
    };
  }, []);

  const resetRound = () => {
    setCurrentScore(0);
    setClickedCards([]);
  };

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      setStatus("Already picked! Round reset — try to beat your best score.");
      resetRound();
      setCards((previousCards) => randomizeCards(previousCards));
      return;
    }

    const nextScore = currentScore + 1;
    const nextClickedCards = [...clickedCards, cardId];

    setClickedCards(nextClickedCards);
    setCurrentScore(nextScore);
    setBestScore((previousBest) => Math.max(previousBest, nextScore));

    if (nextClickedCards.length === cards.length && cards.length > 0) {
      setStatus("Perfect memory! You cleared all cards. Starting a new round.");
      resetRound();
    } else {
      setStatus("Great pick! Keep going.");
    }

    setCards((previousCards) => randomizeCards(previousCards));
  };

  return (
    <main className="app">
      <header className="top-bar">
        <div>
          <p className="eyebrow">The Odin Project</p>
          <h1>Memory Card Showdown</h1>
          <p className="status">{status}</p>
        </div>
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      </header>

      {isLoading && <p className="info">Loading cards from PokéAPI…</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && (
        <CardGrid cards={cards} onCardClick={handleCardClick} />
      )}
      <footer className="footer-note">
        Card data and images provided by PokéAPI.
      </footer>
    </main>
  );
}

export default App;
