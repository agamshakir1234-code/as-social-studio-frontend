import { useEffect, useState } from "react"

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        { id: 1, title: "Spring Campaign Launch", platform: "Instagram", status: "published" },
        { id: 2, title: "Brand Awareness Tips", platform: "TikTok", status: "scheduled" },
        { id: 3, title: "New Product Teaser", platform: "Facebook", status: "draft" }
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="card p-6">
      <h2 className="section-title mb-4">Posts</h2>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map(p => (
            <div key={p.id} className="p-3 border border-bg-border rounded-lg flex justify-between">
              <div>
                <p className="text-white font-medium">{p.title}</p>
                <p className="text-xs text-slate-500">{p.platform}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
