const BASE_URL = 'https://api.tvmaze.com';

export const fetchShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) throw new Error('Failed to fetch shows');
    return await response.json();
  } catch (error) {
    console.error('Error fetching shows:', error);
    return [];
  }
};

export const searchShows = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search shows');
    const data = await response.json();
    // TVMaze search returns an array of { score, show } objects
    return data.map(item => item.show);
  } catch (error) {
    console.error('Error searching shows:', error);
    return [];
  }
};
