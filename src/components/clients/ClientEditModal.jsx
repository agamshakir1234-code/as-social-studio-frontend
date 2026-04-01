import { useState, useEffect } from "react"
import ClientModal from "./ClientModal"

export default function ClientEditModal({ open, onClose, client, onSave }) {
  const [form, setForm] = useState(client)

  useEffect(() => {
    setForm(client)
  }, [client])

  if (!client) return null

  const update = (key, value) => setForm({ ...form, [key]: value })

  const togglePlatform = (p) => {
    if (form.platforms.includes(p)) {
      update("platforms", form.platforms.filter((x) => x !== p))
    } else {
      update("platforms", [...form.platforms, p])
    }
  }

  const submit = () => {
    onSave(form)
    onClose()
  }

  const platforms = ["Instagram", "Facebook", "YouTube", "TikTok"]

  return (
    <ClientModal open={open} onClose={onClose} title="Edit Client">
      <div className="space-y-3">

        <div>
          <label className="label">Client name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div>
          <label className="label">Industry</label>
          <input
            className="input"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
          />
        </div>

        <div>
          <label className="label">Status</label>
          <select
            className="input"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option>Active</option>
            <option>Onboarding</option>
            <option>Paused</option>
            <option>Lost</option>
          </select>
        </div>

        <div>
          <label className="label">Platforms</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-3 py-1 rounded-full text-xs border ${
                  form.platforms.includes(p)
                    ? "bg-brand-500/10 text-brand-300 border-brand-500/40"
                    : "bg-bg-base text-slate-400 border-bg-border hover:bg-bg-hover"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Monthly budget</label>
          <input
            className="input"
            value={form.monthlyBudget}
            onChange={(e) => update("monthlyBudget", e.target.value)}
          />
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea
            className="input h-24"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>

        <button onClick={submit} className="btn-primary w-full mt-2">
          Save changes
        </button>

      </div>
    </ClientModal>
  )
}

