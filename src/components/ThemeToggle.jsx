import { useTheme } from "@/context/ThemeContext"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg 
                 bg-gray-200 dark:bg-[#0d1221] 
                 border border-gray-300 dark:border-[#1e2a3a]
                 text-gray-800 dark:text-gray-200
                 hover:bg-gray-300 dark:hover:bg-[#111827]
                 transition-colors"
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
    </button>
  )
}
