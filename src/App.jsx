import { useState, useEffect } from 'react';
import ImageGrid from './components/ImageGrid';
import SearchBar from './components/SearchBar';
import PromptBuilder from './components/PromptBuilder';
import { parseGalleryData } from './utils/dataParser';
import './App.css';

function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [showPersonalizedOnly, setShowPersonalizedOnly] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalShowText, setGlobalShowText] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/gallery.json');
        if (!response.ok) {
          throw new Error('Failed to load gallery data');
        }
        const data = await response.json();
        const parsed = parseGalleryData(data);
        setGalleryData(parsed);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = showPersonalizedOnly 
    ? galleryData.filter(item => item.hasPersonalization)
    : galleryData;

  if (loading) {
    return <div className="loading">Loading gallery...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <div className="floating-controls">
        <div className="controls-row">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onTogglePersonalized={() => setShowPersonalizedOnly(!showPersonalizedOnly)}
            showPersonalizedOnly={showPersonalizedOnly}
          />
          <PromptBuilder value={promptText} onChange={setPromptText} />
        </div>
        <div className="controls-row">
          <button 
            className={`global-toggle ${!globalShowText ? 'active' : ''}`}
            onClick={() => setGlobalShowText(!globalShowText)}
          >
            {globalShowText ? 'Hide All Text' : 'Show All Text'}
          </button>
        </div>
      </div>
      <ImageGrid 
        data={filteredData} 
        searchQuery={searchQuery}
        onParameterClick={(param) => {
          setPromptText(prev => `${prev} ${param}`.trim());
        }}
        globalShowText={globalShowText}
      />
    </div>
  );
}

export default App; 