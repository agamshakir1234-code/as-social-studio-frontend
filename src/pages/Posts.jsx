import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { getPosts, getClients, createPost, updatePost, deletePost } from '@/services/api'
import { useToast } from '@/context/ToastContext'
import PageHeader from '@/components/ui/PageHeader'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { formatDate, PLATFORMS } from '@/utils/helpers'

const EMPTY = { title: '', content: '', clientId: '', platform: 'instagram', status: 'draft', scheduledAt: '', tags: '' }

export default function Posts() {
  const { toast } = useToast()
  const { data, loading, refetch } = useApi(getPosts)
  const { data: clientsData }      = useApi(getClients)

  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('')
  const [modal,    setModal]    = useState(false)
  const [confirm,  setConfirm]  = useState(null)
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const clients = clientsData?.data || clientsData || []

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit   = (row) => {
    setEditing(row)
    setForm({ ...EMPTY, ...row, tags: Array.isArray(row.tags) ? row.tags.join(', ') : '' })
    setModal(true)
  }
  const closeModal = () => { setModal(false); setEditing(null) }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        scheduledAt: form.scheduledAt || undefined,
      }
      if (editing) { await updatePost(editing.id, payload); toast('Post updated', 'success') }
      else         { await createPost(payload);              toast('Post created', 'success') }
      closeModal(); refetch()
    } catch (err) { toast(err?.response?.data?.message || 'Failed to save', 'error') }
    finally { setSaving(false) }
  }

  const doDelete = async () => {
    setDeleting(true)
    try { await deletePost(confirm); toast('Post deleted', 'success'); setConfirm(null); refetch() }
    catch { toast('Failed to delete', 'error') }
    finally { setDeleting(false) }
  }

  const clientName = (id) => clients.find((c) => c.id === id)?.name || '—'

  let rows = data?.data || data || []
  if (filter) rows = rows.filter((p) => p.status === filter)
  if (search) rows = rows.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()))

  const columns = [
    { key: 'title',    label: 'Title',    render: (v) => <span className="font-medium text-slate-100">{v}</span> },
    { key: 'clientId', label: 'Client',   render: (v) => clientName(v) },
    { key: 'platform', label: 'Platform', render: (v) => <span className="capitalize">{v}</span> },
    { key: 'status',   label: 'Status',   render: (v) => <Badge status={v} /> },
    { key: 'scheduledAt', label: 'Scheduled', render: (v) => formatDate(v) },
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
        title="Posts"
        subtitle={`${rows.length} post${rows.length !== 1 ? 's' : ''}`}
        action={<button onClick={openCreate} className="btn-primary"><Plus size={15} /> New Post</button>}
      />

      <div className="card">
        <div className="px-5 py-4 border-b border-bg-border flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="input pl-8 h-9 text-xs" placeholder="Search posts…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="input w-auto h-9 text-xs" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All statuses</option>
            {['draft','scheduled','published','rejected'].map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
        </div>
        <Table columns={columns} data={rows} loading={loading} emptyMessage="No posts yet — schedule your first!" />
      </div>

      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Post' : 'New Post'} size="lg">
        <form onSubmit={save} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Title *</label>
              <input className="input" value={form.title} onChange={set('title')} required placeholder="Black Friday Campaign" />
            </div>
            <div>
              <label className="label">Client *</label>
              <select className="input" value={form.clientId} onChange={set('clientId')} required>
                <option value="">Select client…</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Platform *</label>
              <select className="input" value={form.platform} onChange={set('platform')}>
                {PLATFORMS.map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={set('status')}>
                {['draft','scheduled','published','rejected'].map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Schedule date</label>
              <input className="input" type="datetime-local" value={form.scheduledAt} onChange={set('scheduledAt')} />
            </div>
            <div className="col-span-2">
              <label className="label">Content *</label>
              <textarea className="input resize-none" rows={4} value={form.content} onChange={set('content')} required placeholder="Post copy goes here…" />
            </div>
            <div className="col-span-2">
              <label className="label">Tags (comma separated)</label>
              <input className="input" value={form.tags} onChange={set('tags')} placeholder="promo, sale, blackfriday" />
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
        open={!!confirm} onClose={() => setConfirm(null)} onConfirm={doDelete}
        loading={deleting} title="Delete Post"
        message="This post will be permanently deleted."
      />
    </div>
  )
}
