import React, { useEffect, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import ImageSelector from "./components/ImageSelector";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="app">
      <header className="header">
        <h1>Where's Waldo?</h1>
        <p>Find all the hidden characters!</p>
      </header>

      <main className="main">
        {!selectedImage ? (
          <ImageSelector onSelectImage={setSelectedImage} />
        ) : (
          <>
            <button
              className="back-button"
              onClick={() => setSelectedImage(null)}
            >
              ← Back to Images
            </button>
            <Game
              imageId={selectedImage.id}
              imageName={selectedImage.title}
              onGameEnd={() => setSelectedImage(null)}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
