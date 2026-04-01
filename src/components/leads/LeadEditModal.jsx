import LeadModal from "./LeadModal"
import { useState, useEffect } from "react"

export default function LeadEditModal({ open, onClose, lead, onSave }) {
  const [form, setForm] = useState(lead)

  useEffect(() => {
    setForm(lead)
  }, [lead])

  if (!lead) return null

  const update = (key, value) => setForm({ ...form, [key]: value })

  const submit = () => {
    onSave(form)
    onClose()
  }

  return (
    <LeadModal open={open} onClose={onClose} title="Edit Lead">
      <div className="space-y-3">

        <div>
          <label className="label">Full name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div>
          <label className="label">Company</label>
          <input
            className="input"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div>
          <label className="label">Lead source</label>
          <select
            className="input"
            value={form.source}
            onChange={(e) => update("source", e.target.value)}
          >
            <option>Instagram DM</option>
            <option>Facebook</option>
            <option>Website form</option>
            <option>Referral</option>
            <option>WhatsApp</option>
          </select>
        </div>

        <div>
          <label className="label">Priority</label>
          <select
            className="input"
            value={form.priority}
            onChange={(e) => update("priority", e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea
            className="input h-24"
            value={form.note}
            onChange={(e) => update("note", e.target.value)}
          />
        </div>

        <button onClick={submit} className="btn-primary w-full mt-2">
          Save changes
        </button>

      </div>
    </LeadModal>
  )
}
