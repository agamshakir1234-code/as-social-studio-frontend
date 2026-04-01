import { X } from "lucide-react"

export default function ClientModal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-bg-card border border-bg-border rounded-xl w-full max-w-xl p-6 shadow-xl animate-slide-in">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-base">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {children}
        </div>

      </div>
    </div>
  )
}

