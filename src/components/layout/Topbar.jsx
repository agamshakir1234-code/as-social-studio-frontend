import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getInitials } from '@/utils/helpers'

const TITLES = {
  '/dashboard': 'Dashboard',
  '/clients':   'Clients',
  '/posts':     'Posts',
  '/leads':     'Leads',
  '/kpis':      'KPIs Overview',
  '/settings':  'Settings',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const title = TITLES[pathname] ?? 'AS Social Studio'

  return (
    <header className="h-14 bg-bg-card border-b border-bg-border flex items-center px-6 gap-4 shrink-0">
      <h1 className="font-display text-base font-bold text-white tracking-tight">{title}</h1>

      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden sm:flex items-center">
        <Search size={14} className="absolute left-3 text-slate-500" />
        <input
          className="input pl-8 w-52 h-9 text-xs"
          placeholder="Search anything…"
          readOnly
        />
      </div>

      {/* Notifications */}
      <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-hover text-slate-400 hover:text-slate-200 transition-colors">
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-ring" />
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center cursor-pointer">
        <span className="text-xs font-bold text-brand-400">{getInitials(user?.name)}</span>
      </div>
    </header>
  )
}
