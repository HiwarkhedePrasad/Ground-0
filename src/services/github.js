import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
 
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


// Example of the API call function
export async function getUserRepositories(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  const data = await response.json();
 
  // Assuming the API does not return a totalCount in the response body, but provides it in headers
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  return { repos: data, totalCount };  // Return both repos and totalCount
}
