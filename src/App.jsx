import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchInput from "./components/searchInput/SearchInput";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import ErrorNotification from "./components/ErrorNotification";
import Loader from "./components/Loader";
import "./App.css";
const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCitiesCount, setTotalCitiesCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchQuery === "") {
      setData([]);
      setTotalPages(1);
      setTotalCitiesCount(0);
      return;
    }

    const fetchData = async (query, page = 1, limit = 3) => {
      setIsLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_GEODB_URI, {
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_GEODB_KEY,
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          },
          params: {
            namePrefix: query,
            offset: (page - 1) * limit,
            limit,
          },
        });
        setIsLoading(false);
        setData(response.data.data);
        setTotalCitiesCount(response.data.metadata.totalCount);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
      }
    };

    if (isNaN(itemsPerPage)) setItemsPerPage(0);
    fetchData(searchQuery, currentPage, itemsPerPage);
  }, [searchQuery, currentPage, itemsPerPage]);
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((num) => {
    setItemsPerPage(isNaN(num) ? 0 : num);
    setCurrentPage(1);
  }, []);

  return (
    <div>
      <SearchInput
        placeholder="Search places..."
        variant="default"
        onSearch={handleSearch}
      />
      {isLoading && <Loader />}
      {error && <ErrorNotification message={error} />}
      <Table
        data={data}
        searchQuery={searchQuery}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      {totalCitiesCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
};

export default App;
