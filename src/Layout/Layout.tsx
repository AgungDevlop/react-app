import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menutup menu ketika mengklik di luar pop-up
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.popup-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-visible">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-no-repeat bg-cover opacity-20 z-10" style={{
          backgroundImage: `url('https://path-to-your-futuristic-background-image.jpg')`,
          filter: 'blur(8px)',
        }}></div>

      <header className="bg-gray-800 shadow-md z-30 fixed top-0 left-0 w-full">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white font-montserrat">AgungDev Portfolio</h1>

          {/* Hamburger Button */}
          <div className="relative md:hidden z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-white focus:outline-none transform transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
            >
              {isMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>

            {/* Pop-up Menu with Higher z-index */}
            {isMenuOpen && (
              <div className="popup-menu absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out">
                <Link to="/react-app/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-home mr-2"></i> Home
                </Link>
                <Link to="/react-app/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-envelope mr-2"></i> Contact
                </Link>
                <Link to="/react-app/privacy-policy" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-user-secret mr-2"></i> Privacy Policy
                </Link>
              </div>
            )}
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link to="/react-app/" className="text-gray-100 hover:text-blue-400 flex items-center">
              <i className="fas fa-home mr-2"></i> Home
            </Link>
            <Link to="/react-app/contact" className="text-gray-100 hover:text-blue-400 flex items-center">
              <i className="fas fa-envelope mr-2"></i> Contact
            </Link>
            <Link to="/react-app/privacy-policy" className="text-gray-100 hover:text-blue-400 flex items-center">
              <i className="fas fa-user-secret mr-2"></i> Privacy Policy
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-20 relative z-20"> {/* Added padding-top to avoid overlap */}
        {children}
      </main>

      <footer className="bg-gray-800 shadow-md mt-auto z-20">
        <div className="container mx-auto px-6 py-4 text-center text-white">
          © 2024 AgungDev Portfolio. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
