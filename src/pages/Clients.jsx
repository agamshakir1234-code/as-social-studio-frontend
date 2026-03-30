import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { useToast } from '@/context/ToastContext'
import PageHeader from '@/components/ui/PageHeader'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { formatDate } from '@/utils/helpers'

const EMPTY = { name: '', email: '', phone: '', industry: '', status: 'active', notes: '' }

export default function Clients() {
  const { toast } = useToast()

  // אין API אמיתי כרגע → נשתמש ב־useApi בלי פונקציה
  const { data, loading, refetch } = useApi(() => Promise.resolve([]))

  const [search,    setSearch]    = useState('')
  const [modal,     setModal]     = useState(false)
  const [confirm,   setConfirm]   = useState(null)
  const [editing,   setEditing]   = useState(null)
  const [form,      setForm]      = useState(EMPTY)
  const [saving,    setSaving]    = useState(false)
  const [deleting,  setDeleting]  = useState(false)

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit   = (row) => { setEditing(row); setForm({ ...EMPTY, ...row }); setModal(true) }
  const closeModal = () => { setModal(false); setEditing(null) }

  const save = async (e) => {
    e.preventDefault()
    toast('Client saving disabled (no backend yet)', 'error')
  }

  const doDelete = async () => {
    toast('Client deletion disabled (no backend yet)', 'error')
  }

  const rows = (data?.data || data || []).filter(
    (c) =>
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'name',     label: 'Name',     render: (v) => <span className="font-medium text-slate-100">{v}</span> },
    { key: 'email',    label: 'Email' },
    { key: 'industry', label: 'Industry' },
    { key: 'status',   label: 'Status',   render: (v) => <Badge status={v} /> },
    { key: 'createdAt',label: 'Created',  render: (v) => formatDate(v) },
    {
      key: '_actions', label: '',
      render: (_, row) => (
        <div className="flex items-center gap-1 justify-end">
          <button onClick={() => openEdit(row)} className="btn-secondary px-2 py-1.5"><Pencil size={13} /></button>
          <button onClick={() => setConfirm(row.id)} className="btn-danger px-2 py-1.5"><Trash2 size={13} /></button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader
        title="Clients"
        subtitle={`${rows.length} client${rows.length !== 1 ? 's' : ''} total`}
        action={<button onClick={openCreate} className="btn-primary"><Plus size={15} /> New Client</button>}
      />

      <div className="card">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-bg-border flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-8 h-9 text-xs"
              placeholder="Search clients…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={rows}
          loading={loading}
          emptyMessage="No clients yet — create your first!"
        />
      </div>

      {/* Create / Edit Modal */}
      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Client' : 'New Client'}>
        <form onSubmit={save} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Name *</label>
              <input className="input" value={form.name} onChange={set('name')} required placeholder="Acme Corp" />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="contact@acme.com" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" value={form.phone} onChange={set('phone')} placeholder="+55 11 9999-9999" />
            </div>
            <div>
              <label className="label">Industry</label>
              <input className="input" value={form.industry} onChange={set('industry')} placeholder="E-commerce" />
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={set('status')}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="prospect">Prospect</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Notes</label>
              <textarea className="input resize-none" rows={3} value={form.notes} onChange={set('notes')} placeholder="Internal notes…" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Client'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={doDelete}
        loading={deleting}
        title="Delete Client"
        message="This will permanently delete the client and all associated data. This action cannot be undone."
      />
    </div>
  )
}

