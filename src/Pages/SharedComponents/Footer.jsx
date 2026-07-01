import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/',                    label: 'Home' },
  { to: '/about',               label: 'About Us' },
  { to: '/for-trainees',        label: 'For Trainees' },
  { to: '/for-organizations',   label: 'For Organizations' },
  { to: '/news',                label: 'News' },
  { to: '/contact',             label: 'Contact Us' },
];

const PROGRAMS = [
  { to: '/for-trainees',        label: 'Traineeships' },
  // { to: '/for-trainees',        label: 'Internships' },
  // { to: '/for-trainees',        label: 'Thesis Placements' },
  { to: '/leadership-training', label: 'Leadership Training' },
  { to: '/for-organizations',   label: 'Pilot Program' },
  { to: '/for-organizations',   label: 'EOR Services' },
];

const SOCIALS = [
  { label: 'Facebook',  abbr: 'fb', href: 'https://facebook.com' },
  { label: 'Instagram', abbr: 'ig', href: 'https://instagram.com' },
  { label: 'LinkedIn',  abbr: 'in', href: 'https://linkedin.com' },
  { label: 'TikTok',    abbr: 'tt', href: 'https://tiktok.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-5">
              <img
                    src="https://sparktraineeships.com/wp-content/uploads/2025/05/Main-Logo.svg"
                    alt="Spark Logo"
                    className="h-20 w-auto object-contain"
              />
              
            </div>
            <p className="font-body text-sm text-[#1a2744] font-medium leading-relaxed mb-6 max-w-xs">
              Connecting skilled young professionals with meaningful opportunities across Päijät-Häme and beyond.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-[#ff8000] hover:bg-black transition-colors duration-200 flex items-center justify-center">
                  <span className="font-body text-[11px] font-bold text-white uppercase tracking-wide">{s.abbr}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-[#1a2744] uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(l => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="font-body text-sm text-[#1a2744] hover:text-white transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-black uppercase tracking-widest mb-5">Programs</h4>
            <ul className="space-y-2.5">
              {PROGRAMS.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="font-body text-sm text-[#1a2744] hover:text-white transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-[#ff8000] uppercase tracking-widest mb-5">Get In Touch</h4>
            <address className="not-italic space-y-2.5">
              <p className="font-body text-sm text-[#1a2744]">Spark Traineeships Oy</p>
              <p className="font-body text-sm text-[#1a2744]">Lahti, Finland</p>
              <a href="tel:+358401234567"
                className="block font-body text-sm text-[#1a2744] hover:text-[#ff8000] transition-colors duration-150">
                +358 40 123 4567
              </a>
              <a href="mailto:info@sparktraineeships.fi"
                className="block font-body text-sm text-[#1a2744] hover:text-[#ff8000] transition-colors duration-150 break-all">
                info@sparktraineeships.fi
              </a>
              <p className="font-body text-sm text-[#1a2744]">Y-tunnus: 3520898-7</p>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="font-body text-xs text-gray-500 order-2 sm:order-1">
            © {year} Spark Traineeships Oy. All rights reserved.
          </p>
          <div className="flex gap-5 order-1 sm:order-2">
            <Link to="/privacy" className="font-body text-xs text-gray-500 hover:text-white transition-colors duration-150">Privacy Policy</Link>
            <Link to="/terms"   className="font-body text-xs text-gray-500 hover:text-white transition-colors duration-150">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
