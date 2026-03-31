import { useEffect, useState } from "react"
import { demoAPI } from "@/services/demoData"
import { Plus, Edit2, Trash2, X } from "lucide-react"

export default function Clients() {
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: "", status: "active" })

  useEffect(() => {
    setClients(demoAPI.list("clients"))
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ name: "", status: "active" })
    setModalOpen(true)
  }

  const openEdit = (client) => {
    setEditing(client)
    setForm({ name: client.name, status: client.status })
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    demoAPI.remove("clients", id)
    setClients((prev) => prev.filter((c) => c.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      const updated = demoAPI.update("clients", editing.id, {
        name: form.name,
        status: form.status
      })
      setClients((prev) => prev.map((c) => (c.id === editing.id ? updated : c)))
    } else {
      const created = demoAPI.create("clients", {
        name: form.name,
        status: form.status,
        createdAt: new Date().toISOString().split("T")[0]
      })
      setClients((prev) => [created, ...prev])
    }
    setModalOpen(false)
  }

  const filtered = clients.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Clients</h2>
        <button className="btn-primary flex items-center gap-2" onClick={openCreate}>
          <Plus size={14} />
          <span>Add client</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="input flex-1 min-w-[180px]"
          placeholder="Search clients…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input w-[150px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="prospect">Prospect</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm">No clients found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="p-3 border border-bg-border rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium">{c.name}</p>
                <p className="text-xs text-slate-500">{c.createdAt}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded bg-brand-500/20 text-brand-400 capitalize">
                  {c.status}
                </span>
                <button
                  className="text-slate-400 hover:text-slate-100"
                  onClick={() => openEdit(c)}
                >
                  <Edit2 size={15} />
                </button>
                <button
                  className="text-red-500 hover:text-red-400"
                  onClick={() => handleDelete(c.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="card w-full max-w-sm p-5 relative">
            <button
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
              onClick={() => setModalOpen(false)}
            >
              <X size={16} />
            </button>

            <h3 className="text-white font-semibold mb-4">
              {editing ? "Edit client" : "Add client"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="label">Status</label>
                <select
                  className="input"
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="prospect">Prospect</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button type="submit" className="btn-primary justify-center">
                {editing ? "Save changes" : "Create client"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
