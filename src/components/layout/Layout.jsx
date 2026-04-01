import { Outlet, NavLink } from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Layout() {
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#080c14] text-gray-900 dark:text-gray-200">

      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-[#1e2a3a] 
                       p-5 flex flex-col gap-6 bg-gray-100 dark:bg-[#0d1221]">

        <h1 className="text-xl font-bold">AS Social Studio</h1>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          User Type: <span className="font-semibold text-brand-500">{user?.role || "Standard"}</span>
        </div>

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
          className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-400"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between p-4 
                           border-b border-gray-200 dark:border-[#1e2a3a]
                           bg-gray-100 dark:bg-[#0d1221]">
          <h2 className="text-lg font-semibold">Dashboard</h2>

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

