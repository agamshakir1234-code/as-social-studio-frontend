import { Outlet, NavLink } from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Layout() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-bg-base text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-bg-border p-5 flex flex-col gap-6 bg-bg-card">
        <h1 className="text-xl font-bold">AS Social Studio</h1>

        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
          <NavLink to="/clients" className="nav-item">Clients</NavLink>
          <NavLink to="/posts" className="nav-item">Posts</NavLink>
          <NavLink to="/leads" className="nav-item">Leads</NavLink>
          <NavLink to="/kpis" className="nav-item">KPIs</NavLink>
          <NavLink to="/settings" className="nav-item">Settings</NavLink>
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
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="flex items-center gap-3">
            {/* 🔥 כאן מופיע ה-ThemeToggle */}
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
