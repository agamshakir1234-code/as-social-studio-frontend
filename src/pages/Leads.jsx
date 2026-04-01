import { useState } from "react"
import LeadCreateModal from "@/components/leads/LeadCreateModal"
import LeadEditModal from "@/components/leads/LeadEditModal"
import LeadViewModal from "@/components/leads/LeadViewModal"
import { User, Mail, Phone, ChevronRight } from "lucide-react"

// נתוני דוגמה
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

export default function Leads() {
  const [leads, setLeads] = useState(MOCK_LEADS)

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const [selectedLead, setSelectedLead] = useState(null)

  // יצירת ליד חדש
  const addLead = (lead) => {
    setLeads([...leads, { id: Date.now(), stage: "Discovery", ...lead }])
  }

  // שמירת עריכה
  const saveLead = (updated) => {
    setLeads(leads.map((l) => (l.id === updated.id ? updated : l)))
  }

  // פתיחת מודל עריכה
  const openEdit = (lead) => {
    setSelectedLead(lead)
    setEditOpen(true)
  }

  // פתיחת מודל צפייה
  const openView = (lead) => {
    setSelectedLead(lead)
    setViewOpen(true)
  }

  return (
    <div className="space-y-5">

      {/* כותרת */}
      <header className="flex items-center justify-between">
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

      {/* פייפליין */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {["Discovery", "Proposal sent", "Closed won"].map((stage) => (
          <div key={stage} className="card p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title">{stage}</h2>
              <span className="text-xs text-slate-500">
                {leads.filter((l) => l.stage === stage).length} leads
              </span>
            </div>

            <div className="space-y-3">
              {leads
                .filter((l) => l.stage === stage)
                .map((lead) => (
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
                    </div>

                    <span className="text-xs text-slate-400">
                      {lead.company} • {lead.source}
                    </span>

                    <p className="text-xs text-slate-300">{lead.note}</p>

                    <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
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
                ))}

              {leads.filter((l) => l.stage === stage).length === 0 && (
                <p className="text-xs text-slate-500">No leads in this stage yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* מודלים */}
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
