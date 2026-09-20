import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden bg-bg-primary"
    >
      {/* Normal Background Image (Original First Image) */}
      <img 
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop"
        alt="Movie Explorer Background"
        fetchpriority="high"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center"
      />
      
      {/* Classic dark theme gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-bg-primary/30 z-10"></div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-6 text-white drop-shadow-2xl">
            Discover Unlimited <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movies & TV Shows
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed drop-shadow-lg">
            Explore and discover your favorite movies and series from around the world.
            Dive into endless entertainment and stay updated with the latest releases.
          </p>
          <div className="flex gap-4">
            <Link to="/movies" className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] px-8 py-4 text-lg hover:-translate-y-1 transition-all duration-300">
              <Play size={20} fill="currentColor" />
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
