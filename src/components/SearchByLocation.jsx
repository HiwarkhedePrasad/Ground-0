import React, { useState, useCallback } from 'react';
import { DeveloperCard } from './DeveloperCard';
import { searchUsers, getUserDetails } from './services/github';

export function SearchByLocation() {
  const [location, setLocation] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!location.trim()) return; // Prevent empty search

    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const searchResults = await searchUsers({ location });

      if (!searchResults?.items?.length) {
        setError(`No developers found in "${location}".`);
        return;
      }

      const userDetails = await Promise.all(
        searchResults.items.slice(0, 6).map((user) => getUserDetails(user.login))
      );
      setUsers(userDetails);
    } catch (err) {
      setError('Error fetching developers. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Search Developers by Location
        </h2>
        <p className="text-base sm:text-xl text-gray-600 mb-6">
          Enter a location to find developers near you.
        </p>
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Searching for developers...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {users.map((user) => (
            <DeveloperCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No developers found. Try a different location.</p>
        </div>
      )}
    </div>
  );
}
