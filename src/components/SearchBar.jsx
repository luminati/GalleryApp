import './SearchBar.css';

function SearchBar({ value, onChange, onTogglePersonalized, showPersonalizedOnly }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search parameters..."
        className="search-input"
      />
      <button 
        className={`toggle-button ${showPersonalizedOnly ? 'active' : ''}`}
        onClick={onTogglePersonalized}
      >
        Show Personalized Only
      </button>
    </div>
  );
}

export default SearchBar; 