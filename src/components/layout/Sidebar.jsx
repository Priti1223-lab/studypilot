import { useState } from 'react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'mcq', label: 'Daily MCQ', icon: '📝' },
    { id: 'pomodoro', label: 'Pomodoro Timer', icon: '⏳' },
    { id: 'weak-chapters', label: 'Weak Chapters', icon: '📚' },
    { id: 'revision', label: 'Revision Planner', icon: '📅' },
    { id: 'mistakes', label: 'Mistake Notebook', icon: '📖' },

    // ===== NEW TOOL =====
    { id: 'formula', label: 'Formula Sheets', icon: '📘' },

    { id: 'bmi', label: 'BMI Calculator', icon: '⚖️' },
    { id: 'calories', label: 'Calorie Calculator', icon: '🔥' },
    { id: 'protein', label: 'Protein Calculator', icon: '💪' },
    { id: 'water', label: 'Water Calculator', icon: '💧' },
    { id: 'weight-gain', label: 'Weight Gain Planner', icon: '📈' },
    { id: 'study-chart', label: 'Study Chart', icon: '📉' },
    { id: 'weight-chart', label: 'Weight Chart', icon: '📊' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-card border border-borderc p-2 rounded-lg shadow-soft"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-16 lg:top-0 left-0 h-screen w-64 bg-card border-r border-borderc overflow-y-auto transition-transform duration-200 z-40`}
      >
        <div className="p-4">
          <h2 className="text-sm font-semibold text-textc uppercase tracking-wider mb-4">
            Navigation
          </h2>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  if (window.innerWidth < 1024) setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                  activeTab === item.id
                    ? 'bg-accent text-textc shadow-soft'
                    : 'text-textc hover:bg-bg'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        />
      )}
    </>
  )
}
