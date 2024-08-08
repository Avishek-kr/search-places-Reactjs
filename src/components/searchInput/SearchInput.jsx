import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './searchInput.css';

const SearchInput = ({ placeholder, variant, onSearch, isLoading }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/') {
        inputRef.current.focus();
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearch(value); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [value, onSearch]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const className = `searchInput ${variant} ${isFocused
    ? 'searchInput--active' : value ? 'searchInput--filled' : ''}`;

  return (
    <div className={className} disabled={isLoading}>
      <input
        type="text"
        aria-label={placeholder}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        ref={inputRef}
      />
      <div className="searchInput__control" aria-hidden="true">Ctrl + /</div>
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.string,
};

export default SearchInput;
