import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ show, onSelect }) => {
  const { image, name, rating, premiered, summary } = show;
  
  // Use a placeholder if image is not available
  const posterUrl = image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
  const year = premiered ? premiered.split('-')[0] : 'N/A';
  const showRating = rating?.average || 'N/A';
  
  const cleanSummary = summary ? summary.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : 'No overview available.';

  return (
    <div 
      className="glass-card flex flex-col h-full group cursor-pointer hover:ring-2 hover:ring-indigo-500/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300"
      onClick={() => onSelect(show)}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-bg-primary">
        <img 
          src={posterUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60" 
          loading="lazy" 
        />
        
        {/* Dynamic Overlay that slides up on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
          <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="text-sm text-slate-300 mb-4 line-clamp-3 leading-relaxed hidden sm:block">
              {cleanSummary}
            </p>
            <button 
              className="btn btn-primary w-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(show);
              }}
            >
              See Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow bg-gradient-to-t from-bg-secondary to-bg-primary/50 relative z-10">
        <h3 className="text-lg font-semibold text-white mb-2 whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-indigo-400 transition-colors duration-300" title={name}>
          {name}
        </h3>
        <div className="flex items-center gap-3 text-slate-400 text-sm mt-auto">
          <span className="flex items-center gap-1 group-hover:text-amber-400 transition-colors duration-300">
            <Star size={14} className="text-amber-400" fill="currentColor" />
            <span className="font-medium text-white group-hover:text-amber-400">{showRating}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 group-hover:text-slate-200 transition-colors duration-300">
            <Calendar size={14} />
            {year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
