import { useState } from "react"
import { Search, Instagram, Facebook, Youtube, MoreHorizontal } from "lucide-react"

const MOCK_CLIENTS = [
  {
    id: 1,
    name: "Urban Fit Studio",
    industry: "Fitness",
    status: "Active",
    platforms: ["Instagram", "Facebook"],
    monthlyBudget: "$1,800",
  },
  {
    id: 2,
    name: "GreenLeaf Organics",
    industry: "Food & Wellness",
    status: "Onboarding",
    platforms: ["Instagram"],
    monthlyBudget: "$1,200",
  },
  {
    id: 3,
    name: "Nova Tech",
    industry: "Tech",
    status: "Paused",
    platforms: ["Instagram", "YouTube"],
    monthlyBudget: "$2,500",
  },
]

function StatusBadge({ status }) {
  const map = {
    Active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    Onboarding: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    Paused: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  }
  return (
    <span className={`badge border ${map[status] || "bg-slate-500/10 text-slate-300 border-slate-500/30"}`}>
      {status}
    </span>
  )
}

function PlatformIcons({ platforms }) {
  return (
    <div className="flex items-center gap-1 text-slate-400">
      {platforms.includes("Instagram") && <Instagram size={16} />}
      {platforms.includes("Facebook") && <Facebook size={16} />}
      {platforms.includes("YouTube") && <Youtube size={16} />}
    </div>
  )
}

export default function Clients() {
  const [query, setQuery] = useState("")

  const filtered = MOCK_CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Clients</h1>
          <p className="text-sm text-slate-400">
            Manage all brands and businesses connected to Social Engine.
          </p>
        </div>

        <button className="btn-primary">
          + Add client
        </button>
      </header>

      <div className="card p-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            className="input pl-9"
            placeholder="Search clients by name or industry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-row bg-bg-hover/40">
              <th className="table-head">Client</th>
              <th className="table-head">Industry</th>
              <th className="table-head">Status</th>
              <th className="table-head">Platforms</th>
              <th className="table-head">Monthly budget</th>
              <th className="table-head text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr key={client.id} className="table-row">
                <td className="table-cell font-medium text-slate-100">
                  {client.name}
                </td>
                <td className="table-cell text-slate-400">
                  {client.industry}
                </td>
                <td className="table-cell">
                  <StatusBadge status={client.status} />
                </td>
                <td className="table-cell">
                  <PlatformIcons platforms={client.platforms} />
                </td>
                <td className="table-cell">
                  {client.monthlyBudget}
                </td>
                <td className="table-cell text-right">
                  <button className="text-slate-500 hover:text-slate-300">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="table-cell text-center text-slate-500 py-6" colSpan={6}>
                  No clients found. Try a different search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
