<aside className="w-64 border-r border-gray-200 dark:border-[#1e2a3a] 
                 p-5 flex flex-col gap-8 bg-gray-50 dark:bg-[#0d1221]">

  {/* Brand */}
  <div className="flex flex-col gap-1">
    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      Social Engine
    </h1>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {user?.role || "Standard"} account
    </p>
  </div>

  {/* Navigation */}
  <nav className="flex flex-col gap-1">
    {[
      { to: "/dashboard", label: "Dashboard", icon: "📊" },
      { to: "/clients", label: "Clients", icon: "👥" },
      { to: "/posts", label: "Posts", icon: "📝" },
      { to: "/leads", label: "Leads", icon: "🎯" },
      { to: "/kpis", label: "KPIs", icon: "📈" },
      { to: "/settings", label: "Settings", icon: "⚙️" },
    ].map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
           ${isActive
             ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
             : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-[#111827]"
           }`
        }
      >
        <span className="text-lg">{item.icon}</span>
        {item.label}
      </NavLink>
    ))}
  </nav>

  {/* Logout */}
  <button
    onClick={logout}
    className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-400"
  >
    <span>🚪</span> Logout
  </button>
</aside>
