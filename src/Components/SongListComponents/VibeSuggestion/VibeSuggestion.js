import "./VibeSuggestion.css";

function VibeSuggestion({ suggestion, handleSuggestionClick }) {
  return (
    <li
      className="vibeSuggestion"
      onClick={() => handleSuggestionClick(suggestion[1])}
      title="Use Suggestion"
    >
      <h3 className="suggestionEmoji">{suggestion[0]}</h3>
      <h4 className="suggestionText">{suggestion[1]}</h4>
    </li>
  );
}

export default VibeSuggestion;
