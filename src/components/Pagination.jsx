import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../styles/pagination.css';
import useDebounce from './hooks/UseDebounce';

const Pagination = ({ currentPage, totalPages, onPageChange, onItemsPerPageChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const debouncedItemsPerPage = useDebounce(itemsPerPage, 300);

  useEffect(() => {
    onItemsPerPageChange(debouncedItemsPerPage);
  }, [debouncedItemsPerPage, onItemsPerPageChange]);

  const handleItemsPerPageChange = (e) => {
    let value = Math.max(1, Math.min(parseInt(e.target.value, 10), 10));
    setItemsPerPage(value);
  };

  if (totalPages === 0) return null;
  return (
    <div className="pagination-container">
    {isFinite(totalPages) ?
      <div className="pagination">
      <button
      onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
        &#10148;
        </button>
        <span><b>{currentPage}</b> of {totalPages}</span>
        <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        >
        &#10148;
        </button>
        </div> : null
      }
      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items per page: </label>
        <input
          type="number"
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          min="1"
          max="10"
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;
