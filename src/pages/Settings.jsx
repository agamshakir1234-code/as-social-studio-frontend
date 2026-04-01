import { Globe, Bell, Clock, Hash, Shield } from "lucide-react"

export default function Settings() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="page-title">Settings</h1>
        <p className="text-sm text-slate-400">
          Configure Social Engine preferences, notifications and workflow helpers.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-brand-400" />
            <h2 className="section-title">General</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="label">Default timezone</label>
              <select className="input">
                <option>UTC+2 — Tel Aviv</option>
                <option>UTC — London</option>
                <option>UTC-5 — New York</option>
              </select>
            </div>

            <div>
              <label className="label">Default posting days</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                  <button
                    key={d}
                    className="px-3 py-1 rounded-full bg-bg-hover text-slate-200 border border-bg-border"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-brand-400" />
            <h2 className="section-title">Notifications</h2>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-brand-500" defaultChecked />
              Email me when a lead moves to “Proposal sent”
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-brand-500" defaultChecked />
              Notify me when a scheduled post fails to publish
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-brand-500" />
              Weekly performance summary
            </label>
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-brand-400" />
            <h2 className="section-title">Posting helpers</h2>
          </div>

          <p className="text-sm text-slate-300">
            Configure automation helpers that make your social workflow smoother.
          </p>

          <div className="space-y-3 text-sm text-slate-300">
            <label className="flex items-center justify-between gap-2">
              <span>Suggest best time to post per client</span>
              <input type="checkbox" className="accent-brand-500" defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Auto-tag posts with campaign labels</span>
              <input type="checkbox" className="accent-brand-500" defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Highlight underperforming posts</span>
              <input type="checkbox" className="accent-brand-500" />
            </label>
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Hash size={18} className="text-brand-400" />
            <h2 className="section-title">Hashtag presets</h2>
          </div>

          <p className="text-sm text-slate-300">
            Save hashtag groups you can quickly apply when creating posts.
          </p>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>Fitness — Reels</span>
              <span className="text-slate-500">
                #fitness #reels #gym #motivation
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Food — Launch</span>
              <span className="text-slate-500">
                #foodie #vegan #newmenu #organic
              </span>
            </div>
            <button className="btn-secondary text-xs mt-2">
              + Add preset
            </button>
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-brand-400" />
            <h2 className="section-title">Account & security</h2>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div>
              <label className="label">Account name</label>
              <input className="input" defaultValue="Social Engine Workspace" />
            </div>
            <button className="btn-secondary text-xs">
              Manage connected social accounts
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

