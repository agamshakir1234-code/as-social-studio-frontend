import { Outlet, NavLink } from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Layout() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-bg-base text-text-base">

      {/* Sidebar */}
      <aside className="w-64 border-r border-bg-border p-5 flex flex-col gap-6 bg-bg-card">
        <h1 className="text-xl font-bold text-text-base">AS Social Studio</h1>

        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink>
          <NavLink to="/clients" className="sidebar-link">Clients</NavLink>
          <NavLink to="/posts" className="sidebar-link">Posts</NavLink>
          <NavLink to="/leads" className="sidebar-link">Leads</NavLink>
          <NavLink to="/kpis" className="sidebar-link">KPIs</NavLink>
          <NavLink to="/settings" className="sidebar-link">Settings</NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-bg-border bg-bg-card">
          <h2 className="text-lg font-semibold text-text-base">Dashboard</h2>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
