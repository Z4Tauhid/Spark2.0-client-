import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const NAV_LINKS = [
  { to: '/about',               label: 'About' },
  { to: '/for-trainees',        label: 'For Trainees' },
  { to: '/for-organizations',   label: 'For Organizations' },
  { to: '/leadership-training', label: 'Leadership Training' },
  { to: '/news',                label: 'News' },
  { to: '/contact',             label: 'Contact Us' },
];

const SparkLogo = ({ onClick }) => (
  <Link to="/" onClick={onClick} className="flex items-center group">
    
    <img
      src="https://sparktraineeships.com/wp-content/uploads/2025/05/Main-Logo.svg"
      alt="Spark Logo"
      className="h-20 w-auto object-contain"
    />
    
  </Link>
);

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on any navigation */
  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    close();
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 w-9/11
        ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_16px_rgba(0,0,0,0.08)]'
          : 'bg-white border-b border-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] ">

          {/* ── Logo ── */}
          <SparkLogo onClick={close} />

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5 ">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-lg text-[13.5px] font-medium font-body transition-colors duration-150
                   ${isActive
                     ? 'text-[#E85D26]'
                     : 'text-gray-600 hover:text-[#1a2744] hover:bg-gray-50'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-[#E85D26]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── Desktop auth ── */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-[13.5px] font-medium font-body text-[#1a2744] hover:text-[#E85D26] transition-colors"
                >
                  Hi, {user?.firstName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full border-2 border-[#1a2744] text-[#1a2744] text-[13px] font-semibold font-body hover:bg-[#1a2744] hover:text-white transition-all duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-[13.5px] font-medium font-body text-gray-600 hover:text-[#1a2744] transition-colors"
                >
                  Sign In
                </Link>
                {/* <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-full bg-[#E85D26] text-white text-[13px] font-semibold font-body hover:bg-[#c44d1c] hover:shadow-md hover:-translate-y-px transition-all duration-200"
                >
                  Get Started
                </Link> */}
              </>
            )}
          </div>

          {/* Get Started Button */}

          <div className="flex justify-center sm:justify-start mr-2 md:mr-0">
              <Link
                to="/register"
                className="
                  inline-flex items-center justify-center
                  bg-[#E85D26]
                  text-[#0F1A4A]
                  font-bold font-body
                  text-[11px] sm:text-[13px] md:text-[15px]
                  pr-2 py-2
                  sm:pr-5 sm:py-2.5
                  md:pr-6 md:py-3
                  min-w-[120px]
                  sm:min-w-[140px]
                  transition-all duration-200
                  hover:brightness-95
                  whitespace-nowrap
                "
                style={{
                  clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
                }}
              >
                Get Started
              </Link>
            </div>
  

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 rounded-lg text-[#1a2744] hover:bg-gray-100 transition-colors"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-0.5">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-[14px] font-medium font-body transition-colors
                 ${isActive ? 'bg-orange-50 text-[#E85D26]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#1a2744]'}`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={close}
                  className="block text-center py-3 px-4 rounded-full border-2 border-[#1a2744] text-[#1a2744] text-[14px] font-semibold font-body hover:bg-[#1a2744] hover:text-white transition-all">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="py-3 px-4 rounded-full bg-[#E85D26] text-white text-[14px] font-semibold font-body hover:bg-[#c44d1c] transition-all">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={close}
                  className="block text-center py-3 px-4 rounded-full border-2 border-[#1a2744] text-[#1a2744] text-[14px] font-semibold font-body hover:bg-[#1a2744] hover:text-white transition-all">
                  Sign In
                </Link>
                
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
