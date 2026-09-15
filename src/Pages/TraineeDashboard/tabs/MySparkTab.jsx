const GDPR_ITEMS = [
  'Your Match Vector data is stored securely on EU servers.',
  'Your profile is never shared with clients without your explicit consent.',
  'You can request a full data export or deletion at any time.',
  'Contact privacy@spark.fi for any data rights enquiries.',
];

function ContactCard() {
  return (
    <div className="bg-[#131319] border border-white/8 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff8000] to-[#c44d1c] flex items-center justify-center text-white font-body font-bold text-lg flex-shrink-0">AK</div>
        <div className="min-w-0">
          <p className="font-body font-bold text-white text-base">Ada Korhonen</p>
          <p className="font-body text-white/40 text-xs mt-0.5">Talent Success Manager</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['Finnish', 'English', 'Swedish'].map(l => (
              <span key={l} className="font-body text-[10px] text-white/60 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">{l}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
        <p className="font-body text-green-400 text-[10px] font-semibold tracking-widest uppercase mb-1">Next Available</p>
        <p className="font-body text-white text-sm font-semibold">Tomorrow, 10:00–11:30</p>
      </div>

      <button className="btn-primary w-full justify-center mb-3">Book a call with Ada</button>
      <button className="btn-outline-white w-full justify-center mb-4">Send a message</button>
      <p className="font-body text-white/30 text-xs text-center">ada.korhonen@spark.fi</p>
    </div>
  );
}

function GdprCard() {
  return (
    <div className="bg-[#131319] border border-white/8 rounded-2xl p-6">
      <p className="font-body text-purple-400 text-[11px] font-semibold tracking-widest uppercase mb-4">Your Data Rights (GDPR)</p>
      <ul className="space-y-2.5">
        {GDPR_ITEMS.map(item => (
          <li key={item} className="font-body text-white/55 text-sm leading-relaxed flex gap-2">
            <span className="text-white/30 flex-shrink-0">&middot;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MySparkTab() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <h1 className="font-body text-2xl sm:text-3xl font-bold text-white mb-2">My Spark</h1>
      <p className="font-body text-white/50 text-sm mb-8">Your dedicated human contact at Spark Traineeships.</p>

      <div className="space-y-6">
        <ContactCard />
        <GdprCard />
      </div>
    </div>
  );
}
