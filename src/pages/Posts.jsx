import { useState } from "react"
import { Calendar, Clock, Instagram, Facebook, Hash, Sparkles } from "lucide-react"

const MOCK_POSTS = [
  {
    id: 1,
    client: "Urban Fit Studio",
    platform: "Instagram",
    status: "Scheduled",
    date: "Today, 18:30",
    title: "Leg day motivation reel",
    bestTime: "18:00–20:00",
    hashtags: ["#fitness", "#legday", "#gymmotivation"],
  },
  {
    id: 2,
    client: "GreenLeaf Organics",
    platform: "Instagram",
    status: "Draft",
    date: "Tomorrow, 11:00",
    title: "New vegan bowl launch",
    bestTime: "11:00–13:00",
    hashtags: ["#vegan", "#healthyfood", "#organic"],
  },
  {
    id: 3,
    client: "Nova Tech",
    platform: "Facebook",
    status: "Published",
    date: "Yesterday, 09:15",
    title: "Productivity tips for remote teams",
    bestTime: "09:00–11:00",
    hashtags: ["#productivity", "#remotework"],
  },
]

function StatusPill({ status }) {
  const map = {
    Scheduled: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    Draft: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    Published: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  }
  return (
    <span className={`badge border ${map[status] || ""}`}>
      {status}
    </span>
  )
}

function PlatformBadge({ platform }) {
  const icon =
    platform === "Instagram" ? <Instagram size={14} /> :
    platform === "Facebook" ? <Facebook size={14} /> : null

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-bg-hover/60 text-slate-200 border border-bg-border">
      {icon}
      {platform}
    </span>
  )
}

export default function Posts() {
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filtered = MOCK_POSTS.filter((p) =>
    selectedStatus === "All" ? true : p.status === selectedStatus
  )

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Posts</h1>
          <p className="text-sm text-slate-400">
            Plan, schedule and review content across all Social Engine clients.
          </p>
        </div>

        <button className="btn-primary">
          + New post
        </button>
      </header>

      {/* Filters + Best time helper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Filter by status
          </span>
          <div className="flex flex-wrap gap-2">
            {["All", "Scheduled", "Draft", "Published"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors
                  ${selectedStatus === status
                    ? "bg-brand-500/10 text-brand-300 border-brand-500/40"
                    : "bg-bg-base text-slate-400 border-bg-border hover:bg-bg-hover"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3">
          <Clock size={18} className="text-brand-400" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Best time to post (global)
            </span>
            <span className="text-sm text-slate-200">
              Weekdays • 11:00–13:00 & 18:00–21:00
            </span>
            <span className="text-xs text-slate-500">
              Based on average engagement across all clients.
            </span>
          </div>
        </div>

        <div className="card p-4 flex items-start gap-3">
          <Sparkles size={18} className="text-brand-400 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Hashtag suggestions
            </span>
            <p className="text-xs text-slate-300">
              Use 3–5 focused hashtags per post. Mix 1–2 broad tags with 2–3 niche tags.
            </p>
            <div className="flex flex-wrap gap-1 text-xs text-slate-300">
              <span className="badge bg-bg-hover/70 border-bg-border flex items-center gap-1">
                <Hash size={10} /> socialmedia
              </span>
              <span className="badge bg-bg-hover/70 border-bg-border flex items-center gap-1">
                <Hash size={10} /> contentstrategy
              </span>
              <span className="badge bg-bg-hover/70 border-bg-border flex items-center gap-1">
                <Hash size={10} /> brandgrowth
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts list */}
      <div className="card p-4 space-y-3">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-3 border border-bg-border rounded-lg px-3 py-2.5 bg-bg-hover/30"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <PlatformBadge platform={post.platform} />
                <span className="text-xs text-slate-500">
                  {post.client}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-100">
                {post.title}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> Best: {post.bestTime}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Hash size={12} /> {post.hashtags.join(" ")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-between md:justify-end">
              <StatusPill status={post.status} />
              <button className="btn-secondary text-xs px-3 py-1">
                Edit
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">
            No posts match this filter.
          </p>
        )}
      </div>
    </div>
  )
}
