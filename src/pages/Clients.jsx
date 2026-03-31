import { useEffect, useState } from "react"

export default function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setClients([
        { id: 1, name: "Acme Corp", status: "active", createdAt: "2025-01-12" },
        { id: 2, name: "Blue Media", status: "prospect", createdAt: "2025-01-20" },
        { id: 3, name: "Nova Digital", status: "inactive", createdAt: "2025-02-01" }
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="card p-6">
      <h2 className="section-title mb-4">Clients</h2>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {clients.map(c => (
            <div key={c.id} className="p-3 border border-bg-border rounded-lg flex justify-between">
              <div>
                <p className="text-white font-medium">{c.name}</p>
                <p className="text-xs text-slate-500">{c.createdAt}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-brand-500/20 text-brand-400">
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
