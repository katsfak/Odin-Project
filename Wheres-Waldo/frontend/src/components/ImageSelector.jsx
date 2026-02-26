import React, { useEffect, useState } from "react";
import { fetchImages } from "../utils/api";
import "./ImageSelector.css";

function ImageSelector({ onSelectImage }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await fetchImages();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) return <div className="loading">Loading images...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (images.length === 0)
    return <div className="info">No images available</div>;

  return (
    <div className="image-selector">
      <h2>Select an Image to Play</h2>
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-card"
            onClick={() => onSelectImage(image)}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="card-image"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="card-content">
              <h3>{image.title}</h3>
              {image.description && <p>{image.description}</p>}
              <p className="character-count">
                Find {image.characters?.length || 0} characters
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSelector;
