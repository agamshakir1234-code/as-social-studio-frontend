import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

const growthData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 25 },
  { month: "Apr", value: 22 },
  { month: "May", value: 31 },
  { month: "Jun", value: 40 }
]

const postsData = [
  { status: "Published", value: 32 },
  { status: "Scheduled", value: 14 },
  { status: "Draft", value: 9 }
]

const platformData = [
  { name: "Instagram", value: 45 },
  { name: "Facebook", value: 25 },
  { name: "TikTok", value: 20 },
  { name: "LinkedIn", value: 10 }
]

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#e11d48"]

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-6 col-span-2">
        <h2 className="section-title mb-4">Monthly growth</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={growthData}>
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-6">
        <h2 className="section-title mb-4">Posts by status</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={postsData}>
            <XAxis dataKey="status" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-6">
        <h2 className="section-title mb-4">Top platforms</h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={platformData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {platformData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

