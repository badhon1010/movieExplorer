import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { searchShows } from '../services/api';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchShows(query.trim());
        setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
        setShowDropdown(true);
      } catch (error) {
        console.error("Failed to fetch suggestions");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (show) => {
    setQuery(show.name);
    setShowDropdown(false);
    onSearch(show.name);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors z-10">
          <Search size={20} className="drop-shadow-none" />
        </div>
        <input
          type="text"
          className="w-full bg-bg-secondary border border-white/10 rounded-full py-4 pl-12 pr-32 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 shadow-lg relative z-0"
          placeholder="Search for a movie or TV show..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
        />
        <button 
          type="submit" 
          className="absolute right-2 top-2 bottom-2 btn-primary px-6 rounded-full text-sm font-semibold hover:shadow-lg transition-all z-10 cursor-pointer"
        >
          Search
        </button>
      </form>
      
      {/* Suggestions Dropdown */}
      {showDropdown && (query.trim().length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 glass">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center text-slate-400">
              <Loader2 size={20} className="animate-spin mr-2" />
              Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((show) => (
                <li key={show.id}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors cursor-pointer"
                    onClick={() => handleSuggestionClick(show)}
                  >
                    <img 
                      src={show.image?.medium || 'https://via.placeholder.com/40x60?text=NA'} 
                      alt={show.name} 
                      className="w-10 h-14 object-cover rounded bg-bg-primary shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">{show.name}</p>
                      <p className="text-xs text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis">
                        {show.premiered ? show.premiered.substring(0,4) : 'N/A'} {show.genres?.length > 0 && `• ${show.genres.join(', ')}`}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-slate-400 text-center text-sm">
              No suggestions found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
