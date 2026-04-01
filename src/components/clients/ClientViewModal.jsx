import ClientModal from "./ClientModal"
import { Instagram, Facebook, Youtube, Hash } from "lucide-react"

export default function ClientViewModal({ open, onClose, client }) {
  if (!client) return null

  const icons = {
    Instagram: <Instagram size={16} />,
    Facebook: <Facebook size={16} />,
    YouTube: <Youtube size={16} />,
    TikTok: <Hash size={16} />,
  }

  return (
    <ClientModal open={open} onClose={onClose} title="Client Details">
      <div className="space-y-4">

        <div>
          <p className="text-lg font-semibold text-text-base">{client.name}</p>
          <p className="text-sm text-slate-400">{client.industry}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Status:</span>
          <span className="badge bg-bg-hover border-bg-border">{client.status}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Platforms:</span>
          <div className="flex items-center gap-2">
            {client.platforms.map((p) => (
              <span key={p} className="flex items-center gap-1 text-slate-300">
                {icons[p]} {p}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-300">
          <p className="font-medium">Monthly budget:</p>
          <p className="text-slate-400">{client.monthlyBudget}</p>
        </div>

        <div className="text-sm text-slate-300">
          <p className="font-medium">Notes:</p>
          <p className="text-slate-400">{client.notes || "No notes added."}</p>
        </div>

      </div>
    </ClientModal>
  )
}

