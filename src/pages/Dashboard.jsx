import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Users, FileText, Target, TrendingUp, Calendar } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getDashboard } from '@/services/api'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import { formatDate, formatCurrency, formatNumber } from '@/utils/helpers'
import { useAuth } from '@/context/AuthContext'

const COLORS = ['#6366f1', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#a78bfa']

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

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="card p-5 flex items-center justify-between bg-gradient-to-r from-brand-500/10 to-transparent border-brand-500/20">
        <div>
          <p className="font-display text-xl font-bold text-white">
            {greeting()}, {user?.email?.split('@')[0]} 👋
          </p>
          <p className="text-sm text-slate-400 mt-0.5">Here's what's happening in your studio today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Calendar size={13} />
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

