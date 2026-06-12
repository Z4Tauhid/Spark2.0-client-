import { useRef, useState, useEffect } from 'react';
import { CgOrganisation } from 'react-icons/cg';
import { FaEnvelope, FaGraduationCap } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function PageHero({ label, title, subtitle }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  return (
    <section className="relative bg-[#1a2744] pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#E85D26] opacity-[0.07] blur-[90px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E85D26]" />
            <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">{label}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">{title}</h1>
          <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

const CONTACT_INFO = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    title: 'Office',
    lines: ['Spark Traineeships Oy', 'Lahti, Päijät-Häme', 'Finland'],
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    title: 'Email',
    lines: ['info@sparktraineeships.fi'],
    href: 'mailto:info@sparktraineeships.fi',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    title: 'Phone',
    lines: ['+358 40 123 4567'],
    href: 'tel:+358401234567',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Office Hours',
    lines: ['Mon – Fri: 09:00 – 17:00', 'Sat – Sun: Closed'],
  },
];

const FAQS = [
  { q: 'Is Spark Traineeships free for trainees?',       a: 'Yes — completely free for trainees. We are compensated by the organisations we partner with, never by the candidates.' },
  { q: 'How long does the matching process take?',       a: 'Our average time-to-match is 4 days from registration. Complex or specialist placements may take slightly longer.' },
  { q: 'What regions do you operate in?',               a: 'We are based in Päijät-Häme and currently operate primarily across the region. Expansion to other Finnish regions is planned.' },
  { q: 'Can international candidates apply?',           a: 'Absolutely. We actively work with multilingual candidates and have a growing network of Finnish employers open to international talent.' },
  { q: 'What is included in the Leadership Program?',   a: 'One-on-one coaching sessions focused on self-awareness, resilience, critical thinking, and Finnish work culture readiness — included with every traineeship placement.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-body font-semibold text-[#1a2744] text-sm leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#E85D26] rotate-45' : 'bg-gray-100'}`}>
          <svg className={`w-3 h-3 ${open ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}>
        <p className="font-body text-gray-500 text-sm leading-relaxed px-5 pb-4">{a}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [formRef, formInView]   = useInView();
  const [infoRef, infoInView]   = useInView();
  const [faqRef, faqInView]     = useInView();

  const [form, setForm]         = useState({ name: '', email: '', role: 'trainee', subject: '', message: '' });
  const [status, setStatus]     = useState('idle'); // idle | sending | sent | error
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    /* TODO: wire to POST /api/contact */
    await new Promise(r => setTimeout(r, 1200));
    setStatus('sent');
  };

  return (
    <div className="overflow-x-hidden">
      <PageHero
        label="Contact Us"
        title="Let's Start a Conversation"
        subtitle="Have a question, want to partner, or ready to join? We're a small team — we read every message and respond quickly."
      />

      {/* ── Form + Info grid ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* ── Contact Form (3/5) ── */}
            <div className="lg:col-span-3" ref={formRef}>
              <div className={`transition-all duration-700 ease-out ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Send a Message</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a2744] mb-7">We'd Love to Hear From You</h2>

                {status === 'sent' ? (
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1a2744] mb-2">Message Sent!</h3>
                    <p className="font-body text-gray-500 text-sm">We'll get back to you within one business day.</p>
                    <button onClick={() => { setStatus('idle'); setForm({ name:'', email:'', role:'trainee', subject:'', message:'' }); }}
                      className="mt-6 font-body text-sm text-[#E85D26] font-semibold hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Full Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/25 focus:border-[#E85D26] transition-colors bg-white" />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/25 focus:border-[#E85D26] transition-colors bg-white" />
                      </div>
                    </div>

                    {/* I am a */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">I am a...</label>
                      <div className="flex flex-col md:flex-row gap-3 items-start md:items-stretch">
                        {[
                          { value: 'trainee',      label: (<div className='flex justify-center items-center gap-2 text-lg'><FaGraduationCap size={25}/> <span>Trainee</span></div>) },
                          { value: 'organization', label: (<div className='flex justify-center items-center gap-2 text-lg'><CgOrganisation size={25}/> <span>Organization</span></div>) },
                          { value: 'other',        label: (<div className='flex justify-center items-center gap-2 text-lg'><FaEnvelope size={25}/> <span>Other</span></div>) },
                        ].map(opt => (
                          <button type="button" key={opt.value}
                            onClick={() => setForm(p => ({ ...p, role: opt.value }))}
                            className={`h-30 w-30 py-3 px-3 rounded-xl border-2 font-body text-xs font-semibold transition-all duration-150
                              ${form.role === opt.value ? 'border-[#E85D26] bg-[#E85D26]/5 text-[#E85D26]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Subject *</label>
                      <input type="text" name="subject" value={form.subject} onChange={handleChange} required
                        placeholder="What is this about?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/25 focus:border-[#E85D26] transition-colors bg-white" />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us more..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/25 focus:border-[#E85D26] transition-colors bg-white resize-none" />
                    </div>

                    <button type="submit" disabled={status === 'sending'}
                      className="w-full py-3.5 bg-[#E85D26] text-white font-semibold font-body text-sm rounded-full hover:bg-[#c44d1c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {status === 'sending' ? (
                        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Info cards (2/5) ── */}
            <div className="lg:col-span-2" ref={infoRef}>
              <div className={`space-y-4 transition-all duration-700 delay-200 ease-out ${infoInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
                {CONTACT_INFO.map(info => (
                  <div key={info.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#1a2744] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {info.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="font-body font-semibold text-[#1a2744] text-sm mb-1">{info.title}</p>
                        {info.href ? (
                          <a href={info.href} className="font-body text-sm text-gray-500 hover:text-[#E85D26] transition-colors leading-relaxed">
                            {info.lines[0]}
                          </a>
                        ) : (
                          info.lines.map(l => (
                            <p key={l} className="font-body text-sm text-gray-500 leading-relaxed">{l}</p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Social links */}
                <div className="bg-[#1a2744] rounded-2xl p-5">
                  <p className="font-body font-semibold text-white text-sm mb-4">Follow Spark</p>
                  <div className="flex gap-2">
                    {[
                      { label: 'Facebook',  abbr: 'fb', href: 'https://facebook.com' },
                      { label: 'Instagram', abbr: 'ig', href: 'https://instagram.com' },
                      { label: 'LinkedIn',  abbr: 'in', href: 'https://linkedin.com' },
                      { label: 'TikTok',    abbr: 'tt', href: 'https://tiktok.com' },
                    ].map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E85D26] transition-colors duration-200 flex items-center justify-center">
                        <span className="font-body text-[11px] font-bold text-white uppercase">{s.abbr}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={faqRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Common Questions</h2>
            <p className="font-body text-gray-500 text-base">Can't find your answer? Send us a message above.</p>
          </div>
          <div className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
