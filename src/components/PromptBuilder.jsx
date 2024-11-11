import './PromptBuilder.css';

function PromptBuilder({ value, onChange }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="prompt-builder">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Click parameters to build prompt..."
        className="prompt-input"
      />
      <button className="copy-button" onClick={copyToClipboard}>
        Copy
      </button>
      <button className="clear-button" onClick={() => onChange('')}>
        Clear
      </button>
    </div>
  );
}

export default PromptBuilder; 