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

import FormulaSheets from './pages/FormulaSheets'
import PracticeSelector from './pages/PracticeSelector'
import Practice from './pages/Practice'

export default function App() {

  const { user, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  // ⭐ selected chapter
  const [practiceData, setPracticeData] = useState(null)

  function startPractice(cls, subject, chapter){
    setPracticeData({cls, subject, chapter})
    setActiveTab("practice")
  }

  if (loading) return <div className="p-10 text-white">Loading...</div>

  if (!user) {
    return showLogin
      ? <Login onToggle={() => setShowLogin(false)} />
      : <Signup onToggle={() => setShowLogin(true)} />
  }

  function renderContent() {

    switch (activeTab) {

      case 'practice-selector':
        return <PracticeSelector startPractice={startPractice} />

      case 'practice':
        // 🔴 CRASH FIX
        if(!practiceData) return <PracticeSelector startPractice={startPractice} />
        return <Practice cls={practiceData.cls} subject={practiceData.subject} chapter={practiceData.chapter} />

      case 'formula': return <FormulaSheets />
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

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

    </div>
  )
}
