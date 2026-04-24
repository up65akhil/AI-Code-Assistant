import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
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
