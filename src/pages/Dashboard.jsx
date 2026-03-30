{/* Welcome bar */}
<div className="card p-5 flex items-center justify-between bg-gradient-to-r from-brand-500/10 to-transparent border-brand-500/20">
  <div>
    <p className="font-display text-xl font-bold text-white">
      {greeting()}, {user?.email?.split('@')[0]} 👋
    </p>
    <p className="text-sm text-slate-400 mt-0.5">
      Here's what's happening in your studio today.
    </p>
  </div>

  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
    <Calendar size={13} />
    {new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}
  </div>
</div>


