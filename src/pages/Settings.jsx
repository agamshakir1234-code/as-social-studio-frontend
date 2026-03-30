import { useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import { useToast } from '@/context/ToastContext'

export default function Settings() {
  const { toast } = useToast()

  const [form, setForm] = useState({
    studioName: '',
    email: '',
    timezone: 'UTC',
    notifications: true
  })

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((p) => ({ ...p, [k]: value }))
  }

  const save = (e) => {
    e.preventDefault()
    toast('Settings saved (demo mode)', 'success')
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader title="Settings" subtitle="Manage your studio preferences" />

      <div className="card p-6 max-w-xl">
        <form onSubmit={save} className="flex flex-col gap-4">
          <div>
            <label className="label">Studio Name</label>
            <input className="input" value={form.studioName} onChange={set('studioName')} placeholder="My Social Studio" />
          </div>

          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="studio@example.com" />
          </div>

          <div>
            <label className="label">Timezone</label>
            <select className="input" value={form.timezone} onChange={set('timezone')}>
              <option value="UTC">UTC</option>
              <option value="Asia/Jerusalem">Israel (GMT+2)</option>
              <option value="America/New_York">New York (GMT-5)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.notifications} onChange={set('notifications')} />
            <label className="text-slate-300 text-sm">Enable notifications</label>
          </div>

          <button type="submit" className="btn-primary mt-2">Save Settings</button>
        </form>
      </div>
    </div>
  )
}

