import { useEffect, useState } from "react"

export default function KPIs() {
  const [kpis, setKpis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setKpis({
        engagementRate: "4.8%",
        avgReach: "12,400",
        monthlyGrowth: "7.2%",
        topPlatform: "Instagram"
      })
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="card p-6">
      <h2 className="section-title mb-4">KPIs</h2>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-bg-border rounded-lg">
            <p className="text-slate-500 text-xs">Engagement Rate</p>
            <p className="text-white text-xl font-bold">{kpis.engagementRate}</p>
          </div>

          <div className="p-4 border border-bg-border rounded-lg">
            <p className="text-slate-500 text-xs">Average Reach</p>
            <p className="text-white text-xl font-bold">{kpis.avgReach}</p>
          </div>

          <div className="p-4 border border-bg-border rounded-lg">
            <p className="text-slate-500 text-xs">Monthly Growth</p>
            <p className="text-white text-xl font-bold">{kpis.monthlyGrowth}</p>
          </div>

          <div className="p-4 border border-bg-border rounded-lg">
            <p className="text-slate-500 text-xs">Top Platform</p>
            <p className="text-white text-xl font-bold">{kpis.topPlatform}</p>
          </div>
        </div>
      )}
    </div>
  )
}
