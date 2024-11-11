import React, { useState, useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(query.trim(), location.trim());
  }, [query, location, onSearch]);

  const handleQueryFocus = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleQueryBlur = useCallback(() => {
    if (!location) {
      setIsExpanded(false);
    }
  }, [location]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex flex-col md:flex-row gap-3 transition-all duration-300 ${isExpanded ? 'scale-105' : ''}`}>
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleQueryFocus}
              onBlur={handleQueryBlur}
              placeholder="Search developers by username, skills, or company..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
              required
            />
          </div>

          {/* Location Input */}
          <div className={`relative transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-20' : 'md:opacity-100 md:max-h-20 opacity-0 max-h-0 md:w-64'}`}>
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (optional)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className={`px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl
              ${isExpanded ? 'opacity-100 max-h-20' : 'md:opacity-100 md:max-h-20 opacity-0 max-h-0'}`}
          >
            Search
          </button>
        </div>

        {/* Search Tips */}
        <div className={`mt-3 text-sm text-gray-500 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <p>Try searching by: username, programming language, or company name</p>
        </div>
      </form>
    </div>
  );
}