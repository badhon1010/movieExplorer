import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { fetchShows, searchShows } from '../services/api';
import { Loader2 } from 'lucide-react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(24);

  const loadInitialShows = async () => {
    setDisplayLimit(24);
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchShows();
      setMovies(data);
    } catch (err) {
      setError('Failed to load shows. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialShows();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setDisplayLimit(24);
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchShows(query);
      setMovies(results);
      if (results.length === 0) {
        setError(`No results found for "${query}"`);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    loadInitialShows();
  };

  return (
    <div className="py-12 container mx-auto px-4 md:px-8 max-w-7xl min-h-screen flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Movies & Shows</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Browse through our extensive collection or search for a specific title.
        </p>
      </div>
      
      <SearchBar onSearch={handleSearch} />

      {searchQuery && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl text-slate-300">
            Search results for: <span className="text-white font-semibold">{searchQuery}</span>
          </h2>
          <button onClick={clearSearch} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            Clear Search
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="text-indigo-500 animate-spin mb-4" />
          <p className="text-slate-400">Loading amazing content...</p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Oops!</h3>
          <p className="text-slate-400 mb-6">{error}</p>
          {searchQuery && (
            <button onClick={clearSearch} className="btn btn-primary">
              View All Shows
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.slice(0, displayLimit).map(movie => (
              <MovieCard 
                key={movie.id} 
                show={movie} 
                onSelect={setSelectedMovie} 
              />
            ))}
          </div>
          
          {movies.length > displayLimit && (
            <div className="flex justify-center mt-12 mb-4">
              <button 
                className="btn btn-primary px-8"
                onClick={() => setDisplayLimit(prev => prev + 24)}
              >
                Load More Movies
              </button>
            </div>
          )}
        </>
      )}

      <MovieModal 
        show={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
};

export default Movies;
