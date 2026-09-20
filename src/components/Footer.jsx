const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-bg-primary border-t border-white/10 mt-auto py-6">
      <div className="container mx-auto px-4">
        <p className="text-slate-500 text-sm text-center">
          © {year} MovieExplorer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
