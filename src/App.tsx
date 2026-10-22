import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Shell } from "@/components/layout/Shell";
import Dashboard from "@/pages/Dashboard";
import Sleep from "@/pages/Sleep";
import DailySchedule from "@/pages/DailySchedule";
import Goals from "@/pages/Goals";
import Notes from "@/pages/Notes";
import EndOfDay from "@/pages/EndOfDay";
import NotFound from "@/pages/NotFound";
import Settings  from "@/pages/Setting";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Shell>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/schedule" element={<DailySchedule />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/sleep" element={<Sleep />} />
                  <Route path="/eod" element={<EndOfDay />} />
                  <Route path="/setting" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Shell>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
