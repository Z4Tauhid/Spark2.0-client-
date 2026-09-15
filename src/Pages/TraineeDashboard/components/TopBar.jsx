import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronDown, FiLogOut } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';

const TABS = [
  { key: 'match-vector', label: 'My Match Vector' },
  { key: 'opportunities', label: 'Opportunities' },
  { key: 'growth-path', label: 'Growth Path' },
  { key: 'my-spark', label: 'My Spark' },
];

function TabButton({ tab, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-body font-semibold transition-colors flex-shrink-0 border ${
        active
          ? 'bg-[#ff8000]/10 text-[#ff8000] border-[#ff8000]/30'
          : 'text-white/50 hover:text-white/80 border-transparent hover:bg-white/5'
      }`}
    >
      {tab.label}
    </button>
  );
}

function AvatarMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-1.5 sm:px-2 py-1.5 rounded-full hover:bg-white/5 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-[#ff8000] flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0">
          {user?.firstName?.[0]?.toUpperCase() || '?'}
        </div>
        <span className="font-body text-sm text-white/90 hidden sm:inline">{user?.firstName}</span>
        <FiChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform duration-150 hidden sm:block ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 mt-2 w-52 rounded-xl bg-[#14141c] border border-white/10 shadow-xl overflow-hidden origin-top-right transition-all duration-150 z-50 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="px-4 py-3 border-b border-white/10">
          <p className="font-body text-sm font-semibold text-white truncate">{user?.firstName} {user?.lastName}</p>
          <p className="font-body text-xs text-white/40 truncate">{user?.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-sm font-body text-white/80 hover:bg-white/5 hover:text-[#ff8000] transition-colors"
        >
          <FiLogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
}

export default function TopBar({ activeTab, onTabChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0e14]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-3 md:py-0 md:h-16">
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-1 text-white/60 hover:text-white text-sm font-body font-medium transition-colors flex-shrink-0">
              <FiChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portals</span>
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="text-[#ff8000] text-lg leading-none">&#9733;</span>
              <span className="font-body font-bold text-white text-base sm:text-lg">Spark</span>
              <span className="font-body text-[9px] sm:text-[10px] font-bold tracking-widest text-white/50 border border-white/15 rounded px-1.5 py-0.5">TALENT</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center overflow-x-auto">
            {TABS.map(tab => (
              <TabButton key={tab.key} tab={tab} active={activeTab === tab.key} onClick={() => onTabChange(tab.key)} />
            ))}
          </nav>

          <AvatarMenu user={user} onLogout={handleLogout} />
        </div>

        <nav className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-3">
          {TABS.map(tab => (
            <TabButton key={tab.key} tab={tab} active={activeTab === tab.key} onClick={() => onTabChange(tab.key)} />
          ))}
        </nav>
      </div>
    </header>
  );
}
