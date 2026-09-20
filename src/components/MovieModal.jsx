import { X, Star, Calendar, Clock, Film } from 'lucide-react';
import { useEffect } from 'react';

const MovieModal = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [show]);

  if (!show) return null;

  const { image, name, rating, premiered, summary, genres, runtime } = show;
  
  const posterUrl = image?.original || image?.medium || 'https://via.placeholder.com/600x900?text=No+Image';
  const year = premiered ? premiered.split('-')[0] : 'N/A';
  const showRating = rating?.average || 'N/A';
  
  // Clean HTML tags from summary (TVMaze returns HTML in summary)
  const cleanSummary = summary ? summary.replace(/<[^>]+>/g, '') : 'No overview available.';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-bg-secondary rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row animate-[slideIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Poster Side */}
        <div className="md:w-2/5 shrink-0 relative bg-bg-primary h-64 md:h-auto">
          <img 
            src={posterUrl} 
            alt={name} 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent md:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-secondary hidden md:block"></div>
        </div>

        {/* Info Side */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar relative z-10 -mt-10 md:mt-0 bg-bg-secondary md:bg-transparent rounded-t-3xl md:rounded-none border-t border-white/10 md:border-none">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{name}</h2>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
            <span className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Star size={16} className="text-amber-400" fill="currentColor" />
              <span className="font-semibold">{showRating}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar size={16} />
              {year}
            </span>
            {runtime && (
              <span className="flex items-center gap-1 text-slate-400">
                <Clock size={16} />
                {runtime} min
              </span>
            )}
          </div>
          
          {genres && genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {genres.map(genre => (
                <span key={genre} className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Film size={18} className="text-indigo-400" />
              Overview
            </h3>
            <p className="text-slate-300 leading-relaxed text-[15px]">
              {cleanSummary}
            </p>
          </div>
          
          <div className="flex justify-end mt-auto pt-6 border-t border-white/5">
            <button type="button" className="btn btn-secondary px-8 cursor-pointer relative z-50" onClick={onClose}>
              <X size={18} />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
