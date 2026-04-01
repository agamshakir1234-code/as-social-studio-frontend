export default function Leads() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const [selectedLead, setSelectedLead] = useState(null)

  return (
    <div className="space-y-5">

      {/* כל התוכן של עמוד הלידים שלך כאן */}

      {/* מודל יצירת ליד */}
      <LeadCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={addLead}
      />

      {/* מודל עריכת ליד */}
      <LeadEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        lead={selectedLead}
        onSave={saveLead}
      />

      {/* מודל צפייה בליד */}
      <LeadViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        lead={selectedLead}
      />

    </div>
  )
}
