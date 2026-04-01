import ClientModal from "./ClientModal"
import { Instagram, Facebook, Youtube, Hash, FileText, ListTodo, FolderOpen } from "lucide-react"
import { useState } from "react"

export default function ClientViewModal({ open, onClose, client }) {
  const [tab, setTab] = useState("overview")

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

        {/* Header info */}
        <div>
          <p className="text-lg font-semibold text-text-base">{client.name}</p>
          <p className="text-sm text-slate-400">{client.industry}</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-bg-border pb-2 text-xs">
          <button
            onClick={() => setTab("overview")}
            className={`px-3 py-1 rounded-full ${
              tab === "overview"
                ? "bg-brand-500/10 text-brand-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("activity")}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              tab === "activity"
                ? "bg-brand-500/10 text-brand-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ListTodo size={12} /> Activity
          </button>
          <button
            onClick={() => setTab("campaigns")}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              tab === "campaigns"
                ? "bg-brand-500/10 text-brand-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText size={12} /> Campaigns
          </button>
          <button
            onClick={() => setTab("files")}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              tab === "files"
                ? "bg-brand-500/10 text-brand-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FolderOpen size={12} /> Files
          </button>
        </div>

        {/* Tab content */}
        {tab === "overview" && (
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <span className="badge bg-bg-hover border-bg-border">{client.status}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Platforms:</span>
              <div className="flex items-center gap-2">
                {client.platforms.map((p) => (
                  <span key={p} className="flex items-center gap-1 text-slate-300">
                    {icons[p]} {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium">Monthly budget:</p>
              <p className="text-slate-400">{client.monthlyBudget}</p>
            </div>

            <div>
              <p className="font-medium">Notes:</p>
              <p className="text-slate-400">{client.notes || "No notes added."}</p>
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div className="space-y-2 text-sm text-slate-300">
            {client.activity && client.activity.length > 0 ? (
              client.activity.map((item) => (
                <div
                  key={item.id}
                  className="border border-bg-border rounded-lg px-3 py-2 bg-bg-hover/40"
                >
                  <p className="text-xs text-slate-500">{item.date}</p>
                  <p className="font-medium capitalize">{item.type}</p>
                  <p className="text-slate-400 text-xs mt-1">{item.note}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No activity logged yet.</p>
            )}
          </div>
        )}

        {tab === "campaigns" && (
          <div className="space-y-2 text-sm text-slate-300">
            {client.campaigns && client.campaigns.length > 0 ? (
              client.campaigns.map((c) => (
                <div
                  key={c.id}
                  className="border border-bg-border rounded-lg px-3 py-2 bg-bg-hover/40 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-slate-500">
                      {c.platform} • Budget: {c.budget}
                    </p>
                  </div>
                  <span className="badge bg-bg-base border-bg-border text-xs">
                    {c.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No campaigns yet.</p>
            )}
          </div>
        )}

        {tab === "files" && (
          <div className="space-y-2 text-sm text-slate-300">
            {client.files && client.files.length > 0 ? (
              client.files.map((f) => (
                <div
                  key={f.id}
                  className="border border-bg-border rounded-lg px-3 py-2 bg-bg-hover/40 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-xs text-slate-500">
                      {f.type} • Uploaded: {f.uploadedAt}
                    </p>
                  </div>
                  <button className="btn-secondary text-xs px-3 py-1">
                    Download
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No files uploaded.</p>
            )}

            <button className="btn-secondary text-xs w-full mt-2">
              + Upload file (placeholder)
            </button>
          </div>
        )}

      </div>
    </ClientModal>
  )
}


