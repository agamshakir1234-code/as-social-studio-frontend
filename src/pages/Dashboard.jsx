import { useAuth } from "@/context/AuthContext"
import { TrendingUp, Users, Calendar, Target, Activity, Star } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()

  const userRole = user?.role || "Standard"
  const userName = user?.name || "Creator"

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            Welcome back, {userName}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/30">
              <Star size={12} />
              {userRole}
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Social Engine overview and performance insights.
          </p>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 stagger">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Total Clients
            </span>
            <Users size={16} className="text-brand-400" />
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="text-2xl font-semibold text-white">32</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp size={12} />
              +8 this month
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Scheduled Posts
            </span>
            <Calendar size={16} className="text-brand-400" />
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="text-2xl font-semibold text-white">18</span>
            <span className="text-xs text-sky-400">Next 7 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              New Leads
            </span>
            <Target size={16} className="text-brand-400" />
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="text-2xl font-semibold text-white">9</span>
            <span className="text-xs text-amber-400">3 high intent</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Engagement Rate
            </span>
            <Activity size={16} className="text-brand-400" />
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="text-2xl font-semibold text-white">4.8%</span>
            <span className="text-xs text-emerald-400">+0.6% vs last week</span>
          </div>
        </div>
      </section>

      {/* Pipeline + Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pipeline */}
        <div className="card p-5 flex flex-col gap-4">
          <h2 className="section-title">Leads pipeline</h2>
          <div className="space-y-3">
            {[
              { stage: "Discovery", count: 5, color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
              { stage: "Proposal sent", count: 3, color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
              { stage: "Closed won", count: 2, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
            ].map((item) => (
              <div
                key={item.stage}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-hover/40 px-3 py-2.5"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-100">{item.stage}</span>
                  <span className="text-xs text-slate-500">Social Engine lead</span>
                </div>
                <span className={`badge ${item.color}`}>
                  {item.count} leads
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-5 flex flex-col gap-4 lg:col-span-2">
          <h2 className="section-title">Recent activity</h2>
          <div className="space-y-3">
            {[
              {
                title: "New content plan approved",
                client: "Urban Fit Studio",
                type: "Content",
                time: "2 hours ago",
              },
              {
                title: "Lead moved to proposal stage",
                client: "GreenLeaf Organics",
                type: "Lead",
                time: "5 hours ago",
              },
              {
                title: "Reels campaign performance updated",
                client: "Nova Tech",
                type: "Performance",
                time: "Yesterday",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-hover/30 px-3 py-2.5"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-100">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500">
                    {item.client} • {item.type}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
