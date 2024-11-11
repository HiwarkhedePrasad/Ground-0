import React, { useState, useCallback } from 'react';
import { Globe } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { DeveloperCard } from './components/DeveloperCard';
import { searchUsers, getUserDetails } from './services/github';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Home Page (Search page)
function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (query, location) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    setUsers([]);
    
    try {
      const searchResults = await searchUsers({ query, location });
      
      if (searchResults.total_count === 0) {
        setError('No developers found matching your criteria. Try adjusting your search terms.');
        return;
      }

      const userDetails = await Promise.all(
        searchResults.items.slice(0, 6).map(user => getUserDetails(user.login))
      );
      setUsers(userDetails);
    } catch (err) {
      setError('Error fetching developers. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Connect with Amazing Developers
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Find and collaborate with developers in your area
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Status Messages */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Searching for developers...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Developer Grid */}
      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {users.map((user) => (
            <DeveloperCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {!loading && !error && users.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-gray-600">
            Search for developers to see results here
          </p>
        </div>
      )}
    </div>
  );
}

// Profile Page
function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails(userId);
        setUser(userDetails);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
    
    fetchUserDetails();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold">{user.name}</h2>
      <p className="text-lg text-gray-600">{user.bio}</p>
      {/* Display other user details */}
      <Link to="/" className="text-blue-500 hover:underline">Back to Search</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">DevConnect</h1>
              </div>
              <nav className="flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">Explore</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">Events</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">Messages</Link>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
