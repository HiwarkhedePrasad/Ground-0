import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [starred, setStarred] = useState([]);
  const [gists, setGists] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Start loading
      try {
        const [
          userData,
          followersData,
          reposData,
          starredData,
          gistsData,
          organizationsData,
        ] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/followers`),
          axios.get(`https://api.github.com/users/${username}/repos`),
          axios.get(`https://api.github.com/users/${username}/starred`),
          axios.get(`https://api.github.com/users/${username}/gists`),
          axios.get(`https://api.github.com/users/${username}/orgs`),
        ]);

        setUser(userData.data);
        setFollowers(followersData.data);
        setRepos(reposData.data);
        setStarred(starredData.data);
        setGists(gistsData.data);
        setOrganizations(organizationsData.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  useEffect(() => {
    if (user) {
      document.title = `Developer | ${user.name || user.login}`;
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{user.login}'s Profile</h1>
      <div className="flex items-center mb-4">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-32 h-32 rounded-full mr-4"
        />
        <div>
          <p>
            <strong>Name:</strong> {user.name || "Not available"}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || "Not available"}
          </p>
          <p>
            <strong>Public Repos:</strong> {user.public_repos}
          </p>
          <p>
            <strong>Followers:</strong> {user.followers}
          </p>
          <p>
            <strong>Following:</strong> {user.following}
          </p>
          <p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View GitHub Profile
            </a>
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Followers</h2>
      <ul>
        {followers.length > 0 ? (
          followers.map((follower) => (
            <li key={follower.id}>
              <a
                href={follower.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {follower.login}
              </a>
            </li>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Repositories</h2>
      <ul>
        {repos.length > 0 ? (
          repos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          <p>No repositories found.</p>
        )}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Starred Repositories</h2>
      <ul>
        {starred.length > 0 ? (
          starred.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          <p>No starred repositories found.</p>
        )}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Gists</h2>
      <ul>
        {gists.length > 0 ? (
          gists.map((gist) => (
            <li key={gist.id}>
              <a
                href={gist.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {gist.description || "Untitled Gist"}
              </a>
            </li>
          ))
        ) : (
          <p>No gists found.</p>
        )}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Organizations</h2>
      <ul>
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <li key={org.id}>
              <a
                href={org.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {org.login}
              </a>
            </li>
          ))
        ) : (
          <p>No organizations found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
