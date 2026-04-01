import { Flag, Mail, Phone, User, ChevronRight } from "lucide-react"

const MOCK_LEADS = [
  {
    id: 1,
    name: "Daniel Cohen",
    company: "Cohen Digital",
    source: "Instagram DM",
    stage: "Discovery",
    priority: "High",
    note: "Interested in full content + ads package.",
  },
  {
    id: 2,
    name: "Maya Levi",
    company: "Levi Studio",
    source: "Website form",
    stage: "Proposal sent",
    priority: "Medium",
    note: "Waiting for budget approval.",
  },
  {
    id: 3,
    name: "Adam Weiss",
    company: "Weiss Fitness",
    source: "Referral",
    stage: "Closed won",
    priority: "High",
    note: "Starting next month, focus on IG Reels.",
  },
]

function PriorityTag({ priority }) {
  const map = {
    High: "bg-red-500/10 text-red-300 border-red-500/40",
    Medium: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    Low: "bg-slate-500/10 text-slate-300 border-slate-500/40",
  }
  return (
    <span className={`badge border ${map[priority] || ""}`}>
      <Flag size={10} className="mr-1" />
      {priority} priority
    </span>
  )
}

export default function Leads() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Leads</h1>
          <p className="text-sm text-slate-400">
            Track potential clients and move them through your Social Engine pipeline.
          </p>
        </div>

        <button className="btn-primary">
          + New lead
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {["Discovery", "Proposal sent", "Closed won"].map((stage) => (
          <div key={stage} className="card p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title">{stage}</h2>
              <span className="text-xs text-slate-500">
                {MOCK_LEADS.filter((l) => l.stage === stage).length} leads
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_LEADS.filter((l) => l.stage === stage).map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-lg border border-bg-border bg-bg-hover/40 px-3 py-2.5 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-100">
                        {lead.name}
                      </span>
                    </div>
                    <PriorityTag priority={lead.priority} />
                  </div>
                  <span className="text-xs text-slate-400">
                    {lead.company} • {lead.source}
                  </span>
                  <p className="text-xs text-slate-300">
                    {lead.note}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                    <button className="inline-flex items-center gap-1 hover:text-slate-300">
                      <Mail size={12} /> Email
                    </button>
                    <button className="inline-flex items-center gap-1 hover:text-slate-300">
                      <Phone size={12} /> Call
                    </button>
                    <button className="inline-flex items-center gap-1 hover:text-slate-300">
                      Details <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {MOCK_LEADS.filter((l) => l.stage === stage).length === 0 && (
                <p className="text-xs text-slate-500">
                  No leads in this stage yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

