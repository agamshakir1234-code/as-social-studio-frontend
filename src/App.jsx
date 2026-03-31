import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/components/layout/Layout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Clients from '@/pages/Clients'
import Posts from '@/pages/Posts'
import Leads from '@/pages/Leads'
import KPIs from '@/pages/KPIs'
import Settings from '@/pages/Settings'

// ⬅️ שלב 3 — כאן מוסיפים את initDemo
import { initDemo } from "@/services/demoData"

// מפעילים את נתוני הדמו פעם אחת כשהאפליקציה נטענת
initDemo()

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients"   element={<Clients />} />
          <Route path="/posts"     element={<Posts />} />
          <Route path="/leads"     element={<Leads />} />
          <Route path="/kpis"      element={<KPIs />} />
          <Route path="/settings"  element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
