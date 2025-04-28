import axios from 'axios';

// Create an API client without authentication
const createApiClient = () => {
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });
};

// Initialize API client without authentication
const api = createApiClient();

// Log API requests and track rate limits
const logApiRequest = (endpoint, params) => {
  console.log(`API Request: ${endpoint}`, params);
};

// Search users with error handling
export const searchUsers = async ({ query, location, page = 1, per_page = 30 }) => {
  try {
    let searchQuery = query;
    
    if (location) {
      searchQuery = `${query} location:"${location}"`;
    }
    
    logApiRequest('/search/users', { query: searchQuery, page, per_page });
    
    const response = await api.get('/search/users', {
      params: {
        q: searchQuery,
        page,
        per_page,
      },
    });
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'searchUsers');
    throw error;
  }
};

// Get user details with error handling
export const getUserDetails = async (username) => {
  try {
    logApiRequest(`/users/${username}`, {});
    
    const response = await api.get(`/users/${username}`);
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'getUserDetails');
    throw error;
  }
};

// Get user repositories with error handling
export const getUserRepositories = async (username, page = 1, per_page = 30) => {
  try {
    logApiRequest(`/users/${username}/repos`, { page, per_page });
    
    const response = await api.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page,
        sort: 'updated',
      },
    });
    
    // Get total count from Link header if available
    const linkHeader = response.headers.link;
    let totalCount = 0;
    
    if (linkHeader) {
      const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (matches && matches[1]) {
        totalCount = parseInt(matches[1], 10) * per_page;
      }
    }
    
    return { 
      repos: response.data, 
      totalCount: totalCount || response.data.length
    };
  } catch (error) {
    handleApiError(error, 'getUserRepositories');
    throw error;
  }
};

// Handle API errors
const handleApiError = (error, functionName) => {
  if (error.response) {
    // Request was made but server responded with error
    console.error(`${functionName} Error:`, {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
    });
    
    if (error.response.status === 403) {
      const rateLimitReset = error.response.headers['x-ratelimit-reset'];
      if (rateLimitReset) {
        const resetDate = new Date(rateLimitReset * 1000);
        console.error(`Rate limit exceeded. Reset at ${resetDate.toLocaleString()}`);
      }
    }
  } else if (error.request) {
    // Request was made but no response received
    console.error(`${functionName} Error: No response received`, error.request);
  } else {
    // Error in setting up the request
    console.error(`${functionName} Error:`, error.message);
  }
};
