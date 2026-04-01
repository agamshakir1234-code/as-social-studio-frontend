import { useState, useMemo } from "react"
import ClientCreateModal from "@/components/clients/ClientCreateModal"
import ClientEditModal from "@/components/clients/ClientEditModal"
import ClientViewModal from "@/components/clients/ClientViewModal"

import {
  Search,
  Instagram,
  Facebook,
  Youtube,
  Hash,
  MoreHorizontal,
} from "lucide-react"

const INITIAL_CLIENTS = [
  {
    id: 1,
    name: "Urban Fit Studio",
    industry: "Fitness",
    status: "Active",
    platforms: ["Instagram", "Facebook"],
    monthlyBudget: "$1,800",
    notes: "High engagement on reels.",
  },
  {
    id: 2,
    name: "GreenLeaf Organics",
    industry: "Food & Wellness",
    status: "Onboarding",
    platforms: ["Instagram"],
    monthlyBudget: "$1,200",
    notes: "Launching new vegan menu.",
  },
  {
    id: 3,
    name: "Nova Tech",
    industry: "Tech",
    status: "Paused",
    platforms: ["Instagram", "YouTube"],
    monthlyBudget: "$2,500",
    notes: "Paused due to internal restructuring.",
  },
]

function StatusBadge({ status }) {
  const map = {
    Active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    Onboarding: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    Paused: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    Lost: "bg-red-500/10 text-red-300 border-red-500/30",
  }

  return (
    <span className={`badge border ${map[status] || ""}`}>
      {status}
    </span>
  )
}

function PlatformIcons({ platforms }) {
  const icons = {
    Instagram: <Instagram size={16} />,
    Facebook: <Facebook size={16} />,
    YouTube: <Youtube size={16} />,
    TikTok: <Hash size={16} />,
  }

  return (
    <div className="flex items-center gap-1 text-slate-400">
      {platforms.map((p) => (
        <span key={p}>{icons[p]}</span>
      ))}
    </div>
  )
}

export default function Clients() {
  const [clients, setClients] = useState(INITIAL_CLIENTS)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const [selectedClient, setSelectedClient] = useState(null)

  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const addClient = (client) => {
    setClients([
      ...clients,
      {
        id: Date.now(),
        ...client,
      },
    ])
  }

  const saveClient = (updated) => {
    setClients(clients.map((c) => (c.id === updated.id ? updated : c)))
  }

  const openEdit = (client) => {
    setSelectedClient(client)
    setEditOpen(true)
  }

  const openView = (client) => {
    setSelectedClient(client)
    setViewOpen(true)
  }

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const text = `${client.name} ${client.industry} ${client.notes}`.toLowerCase()
      const matchesSearch = text.includes(search.toLowerCase())
      const matchesStatus =
        filterStatus === "All" ? true : client.status === filterStatus

      return matchesSearch && matchesStatus
    })
  }, [clients, search, filterStatus])

  return (
    <div className="space-y-5">

      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Clients</h1>
          <p className="text-sm text-slate-400">
            Manage all brands and businesses connected to Social Engine.
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="btn-primary"
        >
          + Add client
        </button>
      </header>

      {/* Filters */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Search */}
        <div className="card p-4 flex items-center gap-3">
          <Search size={16} className="text-slate-500" />
          <input
            className="input"
            placeholder="Search clients by name, industry or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <div className="card p-4 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Status
          </span>
          <div className="flex flex-wrap gap-2">
            {["All", "Active", "Onboarding", "Paused", "Lost"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors
                  ${filterStatus === s
                    ? "bg-brand-500/10 text-brand-300 border-brand-500/40"
                    : "bg-bg-base text-slate-400 border-bg-border hover:bg-bg-hover"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Clients table */}
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
            {filteredClients.map((client) => (
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
                  <div className="flex items-center justify-end gap-2">

                    <button
                      onClick={() => openView(client)}
                      className="btn-secondary text-xs px-3 py-1"
                    >
                      View
                    </button>

                    <button
                      onClick={() => openEdit(client)}
                      className="btn-secondary text-xs px-3 py-1"
                    >
                      Edit
                    </button>

                    <button className="text-slate-500 hover:text-slate-300">
                      <MoreHorizontal size={16} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}

            {filteredClients.length === 0 && (
              <tr>
                <td
                  className="table-cell text-center text-slate-500 py-6"
                  colSpan={6}
                >
                  No clients found with current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ClientCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={addClient}
      />

      <ClientEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        client={selectedClient}
        onSave={saveClient}
      />

      <ClientViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        client={selectedClient}
      />

    </div>
  )
}
