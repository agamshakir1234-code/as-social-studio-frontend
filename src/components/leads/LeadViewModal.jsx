import LeadModal from "./LeadModal"
import { Mail, Phone, User, Building2, Flag } from "lucide-react"

export default function LeadViewModal({ open, onClose, lead }) {
  if (!lead) return null

  return (
    <LeadModal open={open} onClose={onClose} title="Lead Details">
      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <User size={20} className="text-slate-400" />
          <div>
            <p className="text-lg font-semibold text-text-base">{lead.name}</p>
            <p className="text-sm text-slate-400">{lead.company}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Building2 size={16} /> {lead.source}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Flag size={16} /> Priority: {lead.priority}
        </div>

        <div className="text-sm text-slate-300">
          <p className="font-medium mb-1">Notes:</p>
          <p className="text-slate-400">{lead.note || "No notes added."}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-bg-border">
          <button className="btn-secondary flex items-center gap-2">
            <Mail size={14} /> Email
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Phone size={14} /> Call
          </button>
        </div>

      </div>
    </LeadModal>
  )
}

