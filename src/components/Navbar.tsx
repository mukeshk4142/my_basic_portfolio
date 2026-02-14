import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, User } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = usePortfolio();

  const navItems = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'Skill', path: '/', id: 'skills' },
    { name: 'Certificate', path: '/', id: 'certificates' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  const handleNavClick = (path: string, id?: string) => {
    if (path === '/portfolio') {
      navigate('/portfolio');
      setIsOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!profileData.resumeUrl) {
      e.preventDefault();
      alert("Resume not uploaded yet by admin.");
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">MukeshDev</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path, item.id)}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                </button>
              ))}

              <button
                onClick={() => handleNavClick('/', 'contact')}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors relative group"
              >
                 Contact
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <a
                href={profileData.resumeUrl || '#'}
                download={profileData.resumeUrl && profileData.resumeUrl.startsWith('data:') ? "Mukesh_Resume.pdf" : undefined}
                target={profileData.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200"
                onClick={handleResumeClick}
              >
                <Download size={16} />
                <span>Resume</span>
              </a>

              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path, item.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                {item.name}
              </button>
            ))}
             <button
              onClick={() => handleNavClick('/', 'contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Contact
            </button>
             <a
              href={profileData.resumeUrl || '#'}
              download={profileData.resumeUrl && profileData.resumeUrl.startsWith('data:') ? "Mukesh_Resume.pdf" : undefined}
              target={profileData.resumeUrl && !profileData.resumeUrl.startsWith('data:') ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
               onClick={(e) => {
                 handleResumeClick(e);
                 setIsOpen(false);
              }}
            >
              Download Resume
            </a>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
