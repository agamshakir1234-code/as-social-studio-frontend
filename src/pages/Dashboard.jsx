import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Users, FileText, Target, TrendingUp, Calendar } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { getDashboard } from '@/services/api'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import { formatDate, formatCurrency, formatNumber } from '@/utils/helpers'
import { useAuth } from '@/context/AuthContext'

const COLORS = ['#6366f1', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#a78bfa']

const TooltipStyle = {
  contentStyle: {
    background: '#0d1221',
    border: '1px solid #1e2a3a',
    borderRadius: 8,
    fontSize: 12
  },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#e2e8f0' }
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // הגנה על הדשבורד
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const ov = data?.overview || {}

  const platformData = data
    ? Object.entries(data.breakdowns?.postsByPlatform || {}).map(([name, value]) => ({
        name,
        value
      }))
    : []

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Welcome bar */}
      <div className="card p-5 flex items-center justify-between bg-gradient-to-r from-brand-500/10 to-transparent border-brand-500/20">
        <div>
          <p className="font-display text-xl font-bold text-white">
            {greeting()}, {user?.email?.split('@')[0]} 👋
          </p>
          <p className="text-sm text-slate-400 mt-0.5">
            Here's what's happening in your studio today.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Calendar size={13} />
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <StatCard
          label="Total Clients"
          value={loading ? '—' : formatNumber(ov.totalClients)}
          icon={Users}
          color="brand"
          sub={`${ov.activeClients ?? 0} active`}
        />
        <StatCard
          label="Posts Published"
          value={loading ? '—' : formatNumber(ov.publishedPosts)}
          icon={FileText}
          color="emerald"
          sub={`${ov.scheduledPosts ?? 0} scheduled`}
        />
        <StatCard
          label="Total Leads"
          value={loading ? '—' : formatNumber(ov.totalLeads)}
          icon={Target}
          color="amber"
          sub={`${ov.newLeads ?? 0} new`}
        />
        <StatCard
          label="Conversion Rate"
          value={loading ? '—' : `${ov.conversionRate ?? 0}%`}
          icon={TrendingUp}
          color="violet"
          sub={formatCurrency(ov.totalLeadValue)}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly trend */}
        <div className="card p-5 lg:col-span-2">
          <p className="section-title mb-4">Monthly Activity</p>
          {loading ? (
            <div className="h-48 bg-bg-hover rounded-lg animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={data?.monthlyTrend || []}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...TooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#grad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Posts by platform */}
        <div className="card p-5">
          <p className="section-title mb-4">Posts by Platform</p>
          {loading ? (
            <div className="h-48 bg-bg-hover rounded-lg animate-pulse" />
          ) : platformData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
              No posts yet
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {platformData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip {...TooltipStyle} />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-wrap gap-2 justify-center">
                {platformData.map((d, i) => (
                  <div
                    key={d.name}
                    className="flex items-center gap-1.5 text-xs text-slate-400"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    {d.name} ({d.value})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentList
          title="Recent Clients"
          icon={Users}
          items={data?.recent?.clients || []}
          loading={loading}
          renderItem={(c) => (
            <div
              key={c.id}
              className="flex items-center justify-between py-2.5 border-b border-bg-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{c.name}</p>
                <p className="text-xs text-slate-500">{formatDate(c.createdAt)}</p>
              </div>
              <Badge status={c.status} />
            </div>
          )}
        />

        <RecentList
          title="Recent Posts"
          icon={FileText}
          items={data?.recent?.posts || []}
          loading={loading}
          renderItem={(p) => (
            <div
              key={p.id}
              className="flex items-center justify-between py-2.5 border-b border-bg-border last:border-0"
            >
              <div className="min-w-0 flex-1 mr-2">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {p.title}
                </p>
                <p className="text-xs text-slate-500 capitalize">{p.platform}</p>
              </div>
              <Badge status={p.status} />
            </div>
          )}
        />

        <RecentList
          title="Recent Leads"
          icon={Target}
          items={data?.recent?.leads || []}
          loading={loading}
          renderItem={(l) => (
            <div
              key={l.id}
              className="flex items-center justify-between py-2.5 border-b border-bg-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{l.name}</p>
                <p className="text-xs text-slate-500">{l.source || '—'}</p>
              </div>
              <Badge status={l.status} />
            </div>
          )}
        />
      </div>
    </div>
  )
}

function RecentList({ title, icon: Icon, items, loading, renderItem }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className="text-brand-400" />
        <p className="section-title">{title}</p>
      </div>

      {loading
        ? [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="py-2.5 border-b border-bg-border last:border-0"
            >
              <div className="h-3.5 bg-bg-hover rounded animate-pulse w-2/3 mb-1.5" />
              <div className="h-2.5 bg-bg-hover rounded animate-pulse w-1/3" />
            </div>
          ))
        : items.length === 0
        ? (
          <p className="text-sm text-slate-500 py-4 text-center">Nothing yet</p>
          )
        : items.map(renderItem)}
    </div>
  )
}


