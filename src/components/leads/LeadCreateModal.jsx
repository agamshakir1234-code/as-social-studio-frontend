import LeadModal from "./LeadModal"
import { useState } from "react"

export default function LeadCreateModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    source: "",
    priority: "Medium",
    note: "",
  })

  const update = (key, value) => setForm({ ...form, [key]: value })

  const submit = () => {
    onCreate(form)
    onClose()
  }

  return (
    <LeadModal open={open} onClose={onClose} title="New Lead">
      <div className="space-y-3">

        <div>
          <label className="label">Full name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="label">Company</label>
          <input
            className="input"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Brand / Business name"
          />
        </div>

        <div>
          <label className="label">Lead source</label>
          <select
            className="input"
            value={form.source}
            onChange={(e) => update("source", e.target.value)}
          >
            <option value="">Select source</option>
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
            placeholder="Add context about the lead..."
          />
        </div>

        <button onClick={submit} className="btn-primary w-full mt-2">
          Create lead
        </button>

      </div>
    </LeadModal>
  )
}
