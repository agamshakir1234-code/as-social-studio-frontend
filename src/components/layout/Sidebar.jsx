import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, Target,
  BarChart3, Settings, Zap, LogOut,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getInitials } from '@/utils/helpers'

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clients',   icon: Users,           label: 'Clients'   },
  { to: '/posts',     icon: FileText,        label: 'Posts'     },
  { to: '/leads',     icon: Target,          label: 'Leads'     },
  { to: '/kpis',      icon: BarChart3,       label: 'KPIs'      },
  { to: '/settings',  icon: Settings,        label: 'Settings'  },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 shrink-0 bg-bg-card border-r border-bg-border flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-bg-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white tracking-wide leading-none">AS Social</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Studio</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <p className="px-3 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">
          Main Menu
        </p>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-bg-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-brand-400">{getInitials(user?.name)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
          </div>
          <button onClick={logout} className="text-slate-600 hover:text-red-400 transition-colors">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
