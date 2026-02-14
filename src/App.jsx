import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/dashboard/Dashboard'
import DailyMCQ from './components/study/DailyMCQ'
import PomodoroTimer from './components/study/PomodoroTimer'
import WeakChapterTracker from './components/study/WeakChapterTracker'
import RevisionPlanner from './components/study/RevisionPlanner'
import MistakeNotebook from './components/study/MistakeNotebook'
import BMICalculator from './components/health/BMICalculator'
import CalorieCalculator from './components/health/CalorieCalculator'
import ProteinCalculator from './components/health/ProteinCalculator'
import WaterCalculator from './components/health/WaterCalculator'
import WeightGainPlanner from './components/health/WeightGainPlanner'
import StudyHoursChart from './components/charts/StudyHoursChart'
import WeightTrackingChart from './components/charts/WeightTrackingChart'

export default function App() {
  const { user, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <div className="inline-block w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 animate-pulse">
            <span className="text-textc font-bold text-3xl">S</span>
          </div>
          <p className="text-soft">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return showLogin ? (
      <Login onToggle={() => setShowLogin(false)} />
    ) : (
      <Signup onToggle={() => setShowLogin(true)} />
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />
      case 'mcq': return <DailyMCQ />
      case 'pomodoro': return <PomodoroTimer />
      case 'weak-chapters': return <WeakChapterTracker />
      case 'revision': return <RevisionPlanner />
      case 'mistakes': return <MistakeNotebook />
      case 'bmi': return <BMICalculator />
      case 'calories': return <CalorieCalculator />
      case 'protein': return <ProteinCalculator />
      case 'water': return <WaterCalculator />
      case 'weight-gain': return <WeightGainPlanner />
      case 'study-chart': return <StudyHoursChart />
      case 'weight-chart': return <WeightTrackingChart />
      default: return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-borderc py-8 text-center bg-dark-bg">

        <p className="text-soft text-sm tracking-wide">
          Made with love ❤️ Aryan Neptune
        </p>

        <div className="flex justify-center gap-4 mt-4 flex-wrap">

          {/* WhatsApp */}
          <a
            href="https://whatsapp.com/channel/0029VbC3VH70VycFrhI58Y2q"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-black font-medium hover:scale-105 transition"
          >
            📱 WhatsApp Channel
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/usetecharyan?igsh=aDR2M241bDU4bGIy"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-textc font-medium hover:scale-105 transition"
          >
            📸 Instagram
          </a>

        </div>

      </footer>
    </div>
  )
}

