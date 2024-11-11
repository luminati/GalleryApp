import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './ImageCard.css';

function ImageCard({ images = [], parameters = [], onParameterClick, searchQuery, globalShowText }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localShowText, setLocalShowText] = useState(false);

  // Reset local text state when global state changes
  useEffect(() => {
    setLocalShowText(false);
  }, [globalShowText]);

  // Auto-show text if it matches search
  useEffect(() => {
    if (searchQuery && images[currentIndex]?.fullText?.toLowerCase().includes(searchQuery.toLowerCase())) {
      setLocalShowText(true);
    }
  }, [searchQuery, currentIndex, images]);

  if (!images.length) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i}>{part}</mark> 
        : part
    );
  };

  const toggleText = () => {
    setLocalShowText(prev => !prev);
  };

  const showText = globalShowText && localShowText;

  return (
    <div className="image-card">
      <div className="image-container">
        <LazyLoadImage
          src={currentImage?.thumbnail}
          effect="opacity"
          alt="Gallery item"
        />
        {images.length > 1 && (
          <>
            <button className="nav-button prev" onClick={prevImage}>&lt;</button>
            <button className="nav-button next" onClick={nextImage}>&gt;</button>
            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      <div className="parameters">
        {parameters.map((param, index) => (
          <button
            key={index}
            className="parameter-button"
            onClick={() => onParameterClick(param)}
          >
            {highlightText(param, searchQuery)}
          </button>
        ))}
        <button 
          className={`text-toggle-button ${showText ? 'active' : ''}`}
          onClick={toggleText}
          title={showText ? 'Hide text' : 'Show text'}
        >
          {showText ? '▼ Text' : '▶ Text'}
        </button>
      </div>
      {showText && currentImage?.fullText && (
        <div className="full-text">
          {highlightText(currentImage.fullText, searchQuery)}
        </div>
      )}
    </div>
  );
}

export default ImageCard; 