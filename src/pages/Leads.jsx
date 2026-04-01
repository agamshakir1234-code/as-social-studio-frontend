
import { useState, useMemo } from "react"
import LeadCreateModal from "@/components/leads/LeadCreateModal"
import LeadEditModal from "@/components/leads/LeadEditModal"
import LeadViewModal from "@/components/leads/LeadViewModal"
import { User, Mail, Phone, ChevronRight, Search, Flag, Calendar } from "lucide-react"

const INITIAL_LEADS = [
  {
    id: 1,
    name: "Daniel Cohen",
    company: "Cohen Digital",
    source: "Instagram DM",
    stage: "Discovery",
    priority: "High",
    note: "Interested in full content + ads package.",
    followUp: "2026-04-05",
  },
  {
    id: 2,
    name: "Maya Levi",
    company: "Levi Studio",
    source: "Website form",
    stage: "Proposal sent",
    priority: "Medium",
    note: "Waiting for budget approval.",
    followUp: "2026-04-03",
  },
  {
    id: 3,
    name: "Adam Weiss",
    company: "Weiss Fitness",
    source: "Referral",
    stage: "Closed won",
    priority: "High",
    note: "Starting next month, focus on IG Reels.",
    followUp: "",
  },
]

function PriorityTag({ priority }) {
  const map = {
    High: "bg-red-500/10 text-red-300 border-red-500/40",
    Medium: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    Low: "bg-slate-500/10 text-slate-300 border-slate-500/40",
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${map[priority] || ""}`}>
      <Flag size={10} />
      {priority} priority
    </span>
  )
}

export default function Leads() {
  const [leads, setLeads] = useState(INITIAL_LEADS)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const [selectedLead, setSelectedLead] = useState(null)

  const [search, setSearch] = useState("")
  const [filterPriority, setFilterPriority] = useState("All")
  const [filterStage, setFilterStage] = useState("All")

  const addLead = (lead) => {
    setLeads([
      ...leads,
      {
        id: Date.now(),
        stage: "Discovery",
        followUp: "",
        ...lead,
      },
    ])
  }

  const saveLead = (updated) => {
    setLeads(leads.map((l) => (l.id === updated.id ? updated : l)))
  }

  const openEdit = (lead) => {
    setSelectedLead(lead)
    setEditOpen(true)
  }

  const openView = (lead) => {
    setSelectedLead(lead)
    setViewOpen(true)
  }

  const updateFollowUp = (id, date) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, followUp: date } : l)))
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const text = `${lead.name} ${lead.company} ${lead.source} ${lead.note}`.toLowerCase()
      const matchesSearch = text.includes(search.toLowerCase())
      const matchesPriority =
        filterPriority === "All" ? true : lead.priority === filterPriority
      const matchesStage =
        filterStage === "All" ? true : lead.stage === filterStage

      return matchesSearch && matchesPriority && matchesStage
    })
  }, [leads, search, filterPriority, filterStage])

  const stages = ["Discovery", "Proposal sent", "Closed won"]

  return (
    <div className="space-y-5">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title">Leads</h1>
          <p className="text-sm text-slate-400">
            Track potential clients and move them through your Social Engine pipeline.
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="btn-primary"
        >
          + New lead
        </button>
      </header>

      {/* Filters */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="card p-4 flex items-center gap-3">
          <Search size={16} className="text-slate-500" />
          <input
            className="input"
            placeholder="Search leads by name, company, source or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Priority filter */}
        <div className="card p-4 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Priority
          </span>
          <div className="flex flex-wrap gap-2">
            {["All", "High", "Medium", "Low"].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors
                  ${filterPriority === p
                    ? "bg-brand-500/10 text-brand-300 border-brand-500/40"
                    : "bg-bg-base text-slate-400 border-bg-border hover:bg-bg-hover"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Stage filter */}
        <div className="card p-4 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Stage
          </span>
          <div className="flex flex-wrap gap-2">
            {["All", ...stages].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStage(s)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors
                  ${filterStage === s
                    ? "bg-brand-500/10 text-brand-300 border-brand-500/40"
                    : "bg-bg-base text-slate-400 border-bg-border hover:bg-bg-hover"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="card p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title">{stage}</h2>
              <span className="text-xs text-slate-500">
                {filteredLeads.filter((l) => l.stage === stage).length} leads
              </span>
            </div>

            <div className="space-y-3">
              {filteredLeads
                .filter((l) => l.stage === stage)
                .map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-lg border border-bg-border bg-bg-hover/40 px-3 py-2.5 flex flex-col gap-2"
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

                    <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>
                          Follow‑up:{" "}
                          {lead.followUp ? lead.followUp : "Not set"}
                        </span>
                      </div>
                      <input
                        type="date"
                        className="bg-transparent border border-bg-border rounded px-2 py-0.5 text-xs text-slate-300"
                        value={lead.followUp || ""}
                        onChange={(e) => updateFollowUp(lead.id, e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1 hover:text-slate-300">
                          <Mail size={12} /> Email
                        </button>
                        <button className="inline-flex items-center gap-1 hover:text-slate-300">
                          <Phone size={12} /> Call
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openView(lead)}
                          className="inline-flex items-center gap-1 hover:text-slate-300"
                        >
                          View <ChevronRight size={12} />
                        </button>
                        <button
                          onClick={() => openEdit(lead)}
                          className="inline-flex items-center gap-1 hover:text-slate-300"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {filteredLeads.filter((l) => l.stage === stage).length === 0 && (
                <p className="text-xs text-slate-500">
                  No leads in this stage with current filters.
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Modals */}
      <LeadCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={addLead}
      />

      <LeadEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        lead={selectedLead}
        onSave={saveLead}
      />

      <LeadViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        lead={selectedLead}
      />
    </div>
  )
}
