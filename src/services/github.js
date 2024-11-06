import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const searchUsers = async ({ query, location, page = 1, per_page = 30 }) => {
  let searchQuery = query;
  
  if (location) {
    searchQuery = `${query} location:"${location}"`;
  }

  const response = await api.get(`/search/users`, {
    params: {
      q: searchQuery,
      page,
      per_page,
    },
  });
  return response.data;
};

export const getUserDetails = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const getUserRepositories = async (username) => {
  const response = await api.get(`/users/${username}/repos`, {
    params: {
      sort: 'stars',
      per_page: 5,
    },
  });
  return response.data;
};