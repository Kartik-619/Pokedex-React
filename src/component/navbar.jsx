export default function NavBar() {
    return (
      <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Branding / Logo */}
          <div className="text-xl font-bold">PokéDex</div>
  
          {/* Navigation Links */}
          <div className="space-x-6 hidden md:flex">
            <a href="/" className="hover:text-red-400">Home</a>
            <a href="/explore" className="hover:text-red-400">Explore</a>
            <a href="/about" className="hover:text-red-400">About</a>
          </div>
  
          {/* Optional Mobile Menu Toggle (if using later) */}
          <div className="md:hidden">
            <button className="text-white hover:text-red-400">
              ☰
            </button>
          </div>
        </div>
      </nav>
    );
  }
  