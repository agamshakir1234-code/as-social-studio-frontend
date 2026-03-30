import { useState } from 'react'
import { Search } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import PageHeader from '@/components/ui/PageHeader'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import { formatDate, formatNumber } from '@/utils/helpers'

export default function KPIs() {
  // אין backend אמיתי כרגע → מחזירים רשימה ריקה
  const { data, loading } = useApi(() => Promise.resolve([]))

  const [search, setSearch] = useState('')

  const rows = (data?.data || data || []).filter(
    (kpi) =>
      !search ||
      kpi.name?.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'name', label: 'KPI', render: (v) => <span className="font-medium text-slate-100">{v}</span> },
    { key: 'value', label: 'Value', render: (v) => formatNumber(v) },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
    { key: 'updatedAt', label: 'Updated', render: (v) => formatDate(v) }
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader
        title="KPIs"
        subtitle={`${rows.length} KPI${rows.length !== 1 ? 's' : ''} total`}
      />

      <div className="card">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-bg-border flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-8 h-9 text-xs"
              placeholder="Search KPIs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={rows}
          loading={loading}
          emptyMessage="No KPIs yet — add some metrics!"
        />
      </div>
    </div>
  )
}
