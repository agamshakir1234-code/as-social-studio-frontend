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

const EMPTY = {
  title: '',
  platform: '',
  status: 'draft',
  scheduledAt: '',
  content: ''
}

export default function Posts() {
  const { toast } = useToast()

  // אין backend אמיתי כרגע → מחזירים רשימה ריקה
  const { data, loading, refetch } = useApi(() => Promise.resolve([]))

  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY)
    setModal(true)
  }

  const openEdit = (row) => {
    setEditing(row)
    setForm({ ...EMPTY, ...row })
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setEditing(null)
  }

  const save = async (e) => {
    e.preventDefault()
    toast('Post saving disabled (no backend yet)', 'error')
  }

  const doDelete = async () => {
    toast('Post deletion disabled (no backend yet)', 'error')
  }

  const rows = (data?.data || data || []).filter(
    (p) =>
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.platform?.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'title', label: 'Title', render: (v) => <span className="font-medium text-slate-100">{v}</span> },
    { key: 'platform', label: 'Platform' },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
    { key: 'scheduledAt', label: 'Scheduled', render: (v) => formatDate(v) },
    {
      key: '_actions',
      label: '',
      render: (_, row) => (
        <div className="flex items-center gap-1 justify-end">
          <button onClick={() => openEdit(row)} className="btn-secondary px-2 py-1.5">
            <Pencil size={13} />
          </button>
          <button onClick={() => setConfirm(row.id)} className="btn-danger px-2 py-1.5">
            <Trash2 size={13} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader
        title="Posts"
        subtitle={`${rows.length} post${rows.length !== 1 ? 's' : ''} total`}
        action={<button onClick={openCreate} className="btn-primary"><Plus size={15} /> New Post</button>}
      />

      <div className="card">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-bg-border flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-8 h-9 text-xs"
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={rows}
          loading={loading}
          emptyMessage="No posts yet — create your first!"
        />
      </div>

      {/* Create / Edit Modal */}
      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Post' : 'New Post'}>
        <form onSubmit={save} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Title *</label>
              <input className="input" value={form.title} onChange={set('title')} required placeholder="Post title" />
            </div>

            <div>
              <label className="label">Platform</label>
              <input className="input" value={form.platform} onChange={set('platform')} placeholder="Instagram" />
            </div>

            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={set('status')}>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="label">Content</label>
              <textarea className="input resize-none" rows={3} value={form.content} onChange={set('content')} placeholder="Post content…" />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={doDelete}
        loading={deleting}
        title="Delete Post"
        message="This will permanently delete the post. This action cannot be undone."
      />
    </div>
  )
}

