
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/context/ThemeContext"
import {Shell}  from "@/components/layout/Shell"
import Dashboard from "@/pages/Dashboard"
import Projects from "@/pages/Projects"
import DailySchedule from "@/pages/DailySchedule"
import Goals from "@/pages/Goals"
import Statistics from "@/pages/Statistics"
import Notes from "@/pages/Notes"
import EndOfDay from "@/pages/EndOfDay"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import NotFound from "@/pages/NotFound"
function App() {
    return (
<ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <Shell>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/schedule" element={<DailySchedule />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/stats" element={<Statistics />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/eod" element={<EndOfDay />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Shell>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>   
    )
}
export default App
