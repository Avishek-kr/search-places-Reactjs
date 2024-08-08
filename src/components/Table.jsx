import PropTypes from 'prop-types';
import '../styles/table.css';

const Table = ({ data, searchQuery, currentPage, itemsPerPage }) => {
  const startingIndex = (currentPage - 1) * itemsPerPage;

  // Early return for empty search query
  if (searchQuery === '') {
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="start-searching">Start searching...</td>
          </tr>
        </tbody>
      </table>
    );
  }

  // Early return for no data
  if (data.length === 0) {
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="no-results">No results found</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody aria-live="polite">
        {data.map((city, index) => (
          <tr key={city.id}>
            <td>{startingIndex + index + 1}</td>
            <td>{city.city}</td>
            <td>
              <img
                src={`https://flagsapi.com/${city.countryCode}/flat/32.png`}
                alt={`${city.country} flag`}
                className="flag"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'path_to_fallback_image.png'; // Fallback image URL
                }}
              />
              {city.country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default Table;
