import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './searchInput.css';
import useDebounce from '../hooks/UseDebounce';

const SearchInput = ({ placeholder, variant, onSearch }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const debouncedValue = useDebounce(value, 400); // Debounce delay

  useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/') {
        inputRef.current.focus();
      }
      if (event.key === 'Enter') {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const className = `searchInput ${variant} ${isFocused
    ? 'searchInput--active' : value ? 'searchInput--filled' : ''}`;

  return (
    <div className={className}>
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
};

export default SearchInput;
