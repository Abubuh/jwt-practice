import { useAuth } from '../routes/AuthContext';

const Navbar = ({ handleLogout }) => {
  const { username } = useAuth();
  const initial = username?.charAt(0).toUpperCase() || '?';

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className='flex w-7xl py-3 items-center justify-between'>

        <span className="font-mono text-blue-600 font-semibold text-base tracking-wide">Taskflow.</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{username}</span>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {initial}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition"
            >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;