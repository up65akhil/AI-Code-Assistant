import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.417 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const Sidebar = () => {
  const { theme, setTheme, user, setToken } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="fixed top-3 left-3 w-8 h-8 cursor-pointer md:hidden z-50 not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
          alt="open menu"
        />
      )}
      <div
        className={`
          flex flex-col h-screen min-w-64 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#0609f]/30 backdrop-blur-3xl
          transition-all duration-500
          md:relative md:translate-x-0 md:z-10
          max-md:fixed max-md:top-0 max-md:left-0 max-md:h-full max-md:z-40
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ width: '22rem' }}
      >
        <img
          src={theme === 'dark' ? assets.new_logo_dark : assets.new_logo}
          alt="Logo"
          className="w-full h-32 mx-w-48 "
        />

        <div className="mt-auto">
          {user && (
            <div className="p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Contact with Developer
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="https://github.com/up65akhil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-dark:invert text-white dark:text-white hover:opacity-80 transition-opacity"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/up65akhil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-dark:invert text-white dark:text-white hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://up65akhil-ai.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-dark:invert text-white dark:text-white hover:opacity-80 transition-opacity"
                  aria-label="Portfolio"
                >
                  <GlobeIcon />
                </a>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer">
            <div className="flex items-center gap-2 text-sm">
              <img
                src={assets.theme_icon}
                className="w-4.5 not-dark:invert"
                alt="theme"
              />
              <p className="text-sm">Dark Mode</p>
            </div>
            <label className="relative inline-flex  cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                readOnly
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
              <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full  transition-transform peer-checked:traslate-x-4"></span>
            </label>
          </div>
          <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
            <img
              className="w-7 rounded-full not-dark:invert"
              src={assets.user_icon}
              alt="gallery"
            />
            <p className="flex-1 text-sm dark:text-primary truncate">
              {user ? user.name : 'Login your account'}
            </p>
            {user && (
              <img
                src={assets.logout_icon}
                className="h-5 not-dark:invert cursor-pointer hidden group-hover:block"
                alt="logout"
                onClick={() => {
                  logout();
                  // navigate('/login');
                }}
              />
            )}
          </div>
        </div>
        <img
          onClick={() => setIsMenuOpen(false)}
          src={assets.close_icon}
          className="md:hidden absolute top-3 right-3 w-5 h-5 cursor-pointer not-dark:invert"
          alt="close"
        />
      </div>
    </>
  );
};

export default Sidebar;

