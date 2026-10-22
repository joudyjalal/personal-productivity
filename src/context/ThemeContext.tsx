import { createContext, useContext, useEffect, useState } from "react"
import { customThemes, applyTheme } from "@/lib/utlis/theme.ts"

type Theme = "dark" | "light"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    return savedTheme || "dark"
  })

  useEffect(() => {
    const root = document.documentElement
    
    root.setAttribute("data-theme", theme)
   
    root.classList.remove("light", "dark")
    root.classList.add(`theme-${theme}`)
    
    localStorage.setItem("theme", theme)

    
    const savedThemeKey = localStorage.getItem("life_os_custom_theme") as keyof typeof customThemes
    if (savedThemeKey && customThemes[savedThemeKey]) {
      applyTheme(savedThemeKey, theme)
    } else {
      applyTheme("ocean", theme) 
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const contextInstance = useContext(ThemeContext)
  if (!contextInstance) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return contextInstance
}