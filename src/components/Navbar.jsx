import { Link } from 'react-router-dom';
import { Film, Compass } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 py-4 border-b border-white/10 glass">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          <Film className="text-indigo-500" />
          <span>MovieExplorer</span>
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-slate-400 font-medium hover:text-white transition-colors duration-150">Home</Link>
          <Link to="/movies" className="text-slate-400 font-medium hover:text-white transition-colors duration-150">Movies</Link>
        </nav>
        
        <div>
          <Link to="/movies" className="btn btn-primary px-4 py-2 text-sm">
            <Compass size={18} />
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
