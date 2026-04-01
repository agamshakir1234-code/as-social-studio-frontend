import { useParams, Link } from "react-router-dom"
import { useMemo } from "react"
import {
  ArrowLeft,
  BarChart2,
  Activity,
  Users,
  ThumbsUp,
  Calendar,
  Instagram,
  Facebook,
  Youtube,
  Hash,
} from "lucide-react"

// ייבוא הלקוחות
import { INITIAL_CLIENTS } from "./Clients" // אם אתה מייצא משם. אם לא — תעתיק את המערך לכאן.

export default function ClientDashboard() {
  const { id } = useParams()
  const client = useMemo(
    () => INITIAL_CLIENTS.find((c) => c.id === Number(id)),
    [id]
  )

  if (!client) {
    return (
      <div className="p-6">
        <p className="text-slate-400">Client not found.</p>
      </div>
    )
  }

  const icons = {
    Instagram: <Instagram size={16} />,
    Facebook: <Facebook size={16} />,
    YouTube: <Youtube size={16} />,
    TikTok: <Hash size={16} />,
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{client.name} — Dashboard</h1>
          <p className="text-sm text-slate-400">
            Full performance overview, activity, campaigns and content.
          </p>
        </div>

        <Link to="/clients" className="btn-secondary flex items-center gap-2">
          <ArrowLeft size={16} /> Back to clients
        </Link>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Estimated reach
            </span>
            <BarChart2 size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">
            {client.platforms.length * 12000}
          </span>
          <span className="text-xs text-emerald-400 mt-1">
            +8% last 30 days
          </span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Engagement rate
            </span>
            <ThumbsUp size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">
            {client.platforms.length > 1 ? "4.1%" : "3.7%"}
          </span>
          <span className="text-xs text-emerald-400 mt-1">
            +0.3% this week
          </span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Followers gained
            </span>
            <Users size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">
            {client.platforms.length * 900}
          </span>
          <span className="text-xs text-emerald-400 mt-1">
            +120 this month
          </span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Monthly budget
            </span>
            <Calendar size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">
            {client.monthlyBudget}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Across {client.platforms.length} platforms
          </span>
        </div>

      </section>

      {/* Platforms */}
      <section className="card p-5">
        <h2 className="section-title mb-3">Platforms</h2>
        <div className="flex items-center gap-4 text-slate-300">
          {client.platforms.map((p) => (
            <span key={p} className="flex items-center gap-1">
              {icons[p]} {p}
            </span>
          ))}
        </div>
      </section>

      {/* Activity Log */}
      <section className="card p-5">
        <h2 className="section-title mb-3">Recent Activity</h2>

        {client.activity.length === 0 && (
          <p className="text-slate-500 text-sm">No activity yet.</p>
        )}

        <div className="space-y-3">
          {client.activity.map((a) => (
            <div
              key={a.id}
              className="border border-bg-border rounded-lg px-3 py-2 bg-bg-hover/40"
            >
              <p className="text-xs text-slate-500">{a.date}</p>
              <p className="font-medium capitalize">{a.type}</p>
              <p className="text-slate-400 text-xs mt-1">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Campaigns */}
      <section className="card p-5">
        <h2 className="section-title mb-3">Campaigns</h2>

        {client.campaigns.length === 0 && (
          <p className="text-slate-500 text-sm">No campaigns yet.</p>
        )}

        <div className="space-y-3">
          {client.campaigns.map((c) => (
            <div
              key={c.id}
              className="border border-bg-border rounded-lg px-3 py-2 bg-bg-hover/40 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-slate-500">
                  {c.platform} • {c.budget}
                </p>
              </div>
              <span className="badge bg-bg-base border-bg-border text-xs">
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Files */}
      <section className="card p-5">
        <h2 className="section-title mb-3">Files</h2>

        {client.files.length === 0 && (
          <p className="text-slate-500 text-sm">No files uploaded.</p>
        )}

        <div className="space-y-3">
          {client.files.map((f) => (
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
          ))}
        </div>
      </section>

    </div>
  )
}
