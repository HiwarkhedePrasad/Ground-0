import React, { useEffect, useState } from 'react';
import { MapPin, Github, Code2, Star, GitFork } from 'lucide-react';
import { getUserRepositories } from '../services/github';

export function DeveloperCard({ user }) {
  const [repos, setRepos] = useState([]); // Repositories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const reposPerPage = 5; // Number of repositories per page
  const [totalCount, setTotalCount] = useState(0); // Total repositories count

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const { repos, totalCount } = await getUserRepositories(user.login);
        setRepos(repos);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setError('Failed to load repositories.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [user.login]);

  const totalPages = Math.ceil(totalCount / reposPerPage);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white object-cover"
        />
      </div>
      <div className="pt-16 p-6">
        <h3 className="text-xl font-bold text-center text-gray-900">
          {user.name || user.login}
        </h3>
        {user.company && (
          <p className="text-gray-600 text-center mt-1">{user.company}</p>
        )}
        {user.location && (
          <div className="flex items-center justify-center mt-3 text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{user.location}</span>
          </div>
        )}
        {user.bio && (
          <p className="mt-4 text-gray-600 text-sm text-center">{user.bio}</p>
        )}

        {loading && <p className="text-center mt-4 text-gray-600">Loading repositories...</p>}
        {error && <p className="text-center mt-4 text-red-600">{error}</p>}

        {!loading && !error && repos.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700">Top Repositories</h4>
            <div className="space-y-3">
              {currentRepos.map((repo) => (
                <div key={repo.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {repo.name}
                    </a>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="flex items-center text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center text-xs">
                        <GitFork className="w-3 h-3 mr-1" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-gray-600 mt-1">{repo.description}</p>
                  )}
                  {repo.language && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {repo.language}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {repos.length === 0 && !loading && !error && (
          <p className="text-center mt-4 text-gray-600">No repositories available.</p>
        )}

        {repos.length > 0 && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
