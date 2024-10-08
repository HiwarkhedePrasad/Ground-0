import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false); // New state to track if a search has been performed

  document.title = "Find Developer";

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=30`
      );
      setUsers(response.data.items);
      setTotalUsers(response.data.total_count);
      setCurrentPage(page);
      setSearchPerformed(true); // Set searchPerformed to true after search
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 h-screen flex flex-col items-center justify-center">
      <div className="text-center text-white p-6">
        <h1 className="text-5xl font-bold mb-4">
          Connect with Fellow Developers
        </h1>
        <p className="text-lg mb-6">
          Easily find and collaborate with developers who share your interests.
        </p>

        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
            className="border border-white rounded-lg px-4 py-2 bg-blue-600 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
            placeholder="Search for users..."
          />
          <button
            onClick={() => fetchUsers()}
            aria-label="Search users"
            className="bg-white text-blue-500 hover:bg-blue-100 rounded-lg font-semibold transition duration-300 w-64 px-4 py-2"
          >
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}

        <div className="mt-6 max-h-60 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.length > 0 &&
            users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg p-4 shadow-md">
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <Link
                  to={`/profile/${user.login}`}
                  className="text-blue-500 hover:underline text-center"
                >
                  {user.login}
                </Link>
              </div>
            ))}
        </div>

        {/* Show Pagination Controls only if search has been performed */}
        {searchPerformed && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => fetchUsers(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white text-blue-500 rounded-lg px-4 py-2 mx-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {Math.ceil(totalUsers / 30)}
            </span>
            <button
              onClick={() => fetchUsers(currentPage + 1)}
              disabled={totalUsers / 30 <= currentPage}
              className="bg-white text-blue-500 rounded-lg px-4 py-2 mx-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
