// כלי עזר ליצירת ID רנדומלי
const uid = () => Math.random().toString(36).substring(2, 10)

// כלי עזר לטעינה ושמירה ב-localStorage
const load = (key, fallback) => {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : fallback
}

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// יצירת נתוני דמו רנדומליים
const randomName = () => {
  const names = ["John", "Sarah", "Michael", "Emily", "Daniel", "Noa", "Lior", "Shira"]
  return names[Math.floor(Math.random() * names.length)]
}

const randomCompany = () => {
  const companies = ["Acme Corp", "Blue Media", "Nova Digital", "Pixel Studio", "Brandify"]
  return companies[Math.floor(Math.random() * companies.length)]
}

const randomPlatform = () => {
  const platforms = ["Instagram", "Facebook", "TikTok", "LinkedIn"]
  return platforms[Math.floor(Math.random() * platforms.length)]
}

const randomStatus = (list) => list[Math.floor(Math.random() * list.length)]

// יצירת דמו ראשוני אם אין נתונים
export const initDemo = () => {
  if (!localStorage.getItem("clients")) {
    save("clients", Array.from({ length: 5 }).map(() => ({
      id: uid(),
      name: randomCompany(),
      status: randomStatus(["active", "prospect", "inactive"]),
      createdAt: new Date().toISOString().split("T")[0]
    })))
  }

  if (!localStorage.getItem("posts")) {
    save("posts", Array.from({ length: 5 }).map(() => ({
      id: uid(),
      title: `${randomPlatform()} Campaign`,
      platform: randomPlatform(),
      status: randomStatus(["published", "scheduled", "draft"])
    })))
  }

  if (!localStorage.getItem("leads")) {
    save("leads", Array.from({ length: 5 }).map(() => ({
      id: uid(),
      name: randomName(),
      source: randomPlatform(),
      status: randomStatus(["new", "qualified", "converted"])
    })))
  }
}

// CRUD כללי
export const demoAPI = {
  list: (key) => load(key, []),

  create: (key, item) => {
    const data = load(key, [])
    const newItem = { id: uid(), ...item }
    data.push(newItem)
    save(key, data)
    return newItem
  },

  update: (key, id, updates) => {
    const data = load(key, [])
    const idx = data.findIndex((i) => i.id === id)
    if (idx === -1) return null
    data[idx] = { ...data[idx], ...updates }
    save(key, data)
    return data[idx]
  },

  remove: (key, id) => {
    const data = load(key, [])
    const filtered = data.filter((i) => i.id !== id)
    save(key, filtered)
    return true
  }
}
