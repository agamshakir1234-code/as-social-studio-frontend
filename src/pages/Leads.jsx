import { useEffect, useState } from "react"

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLeads([
        { id: 1, name: "John Doe", source: "Instagram", status: "new" },
        { id: 2, name: "Sarah Cohen", source: "Facebook", status: "qualified" },
        { id: 3, name: "Michael Levi", source: "TikTok", status: "converted" }
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="card p-6">
      <h2 className="section-title mb-4">Leads</h2>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map(l => (
            <div key={l.id} className="p-3 border border-bg-border rounded-lg flex justify-between">
              <div>
                <p className="text-white font-medium">{l.name}</p>
                <p className="text-xs text-slate-500">{l.source}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400">
                {l.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

