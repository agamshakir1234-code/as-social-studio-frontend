import { Activity, BarChart2, ThumbsUp, Users, Eye } from "lucide-react"

export default function KPIs() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="page-title">KPIs</h1>
        <p className="text-sm text-slate-400">
          High-level performance metrics across all Social Engine clients.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Total reach
            </span>
            <Eye size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">482K</span>
          <span className="text-xs text-emerald-400 mt-1">
            +12% vs last 30 days
          </span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Engagement
            </span>
            <ThumbsUp size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">4.3%</span>
          <span className="text-xs text-emerald-400 mt-1">
            +0.4% vs last week
          </span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Followers gained
            </span>
            <Users size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">3,120</span>
          <span className="text-xs text-emerald-400 mt-1">
            +640 vs last month
          </span>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Content output
            </span>
            <BarChart2 size={16} className="text-brand-400" />
          </div>
          <span className="text-2xl font-semibold text-white mt-2">86</span>
          <span className="text-xs text-slate-400 mt-1">
            Posts in the last 30 days
          </span>
        </div>
      </section>

      <section className="card p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Social health summary</h2>
          <Activity size={18} className="text-brand-400" />
        </div>

        <p className="text-sm text-slate-300">
          Overall, your accounts are trending positively. Engagement is growing steadily,
          and content volume is consistent. Consider testing more short-form video for
          top-performing clients and doubling down on high-intent campaigns.
        </p>

        <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
          <li>Reels and short-form video drive 2.1x more engagement.</li>
          <li>Posting 4–5 times per week per client yields best results.</li>
          <li>Leads from Instagram outperform other sources by 35%.</li>
        </ul>
      </section>
    </div>
  )
}
