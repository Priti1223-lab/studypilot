import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { calculateStreak, getDailyMotivation } from '../../utils/calculations'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function DashboardStats() {
  const { user } = useAuth()
  const [todayHours, setTodayHours] = useState(0)
  const [targetHours, setTargetHours] = useState(8)
  const [streak, setStreak] = useState(0)
  const [inputHours, setInputHours] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadTodayData()
      loadStreak()
    }
  }, [user])

  const loadTodayData = async () => {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (data) {
      setTodayHours(parseFloat(data.hours_studied))
      setTargetHours(parseFloat(data.target_hours))
    }
  }

  const loadStreak = async () => {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })

    if (data) {
      setStreak(calculateStreak(data))
    }
  }

  const handleUpdateHours = async (e) => {
    e.preventDefault()
    setLoading(true)

    const today = new Date().toISOString().split('T')[0]
    const hours = parseFloat(inputHours)

    const { data: existing } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (existing) {
      await supabase
        .from('study_sessions')
        .update({ hours_studied: hours })
        .eq('id', existing.id)
    } else {
      await supabase
        .from('study_sessions')
        .insert([{ user_id: user.id, date: today, hours_studied: hours, target_hours: targetHours }])
    }

    setTodayHours(hours)
    setInputHours('')
    loadStreak()
    setLoading(false)
  }

  const progress = (todayHours / targetHours) * 100

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-4">
          <p className="text-lg text-gray-300 italic">"{getDailyMotivation()}"</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-soft mb-2">Today's Target</p>
            <p className="text-4xl font-bold text-primary">{targetHours}h</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-soft mb-2">Completed Today</p>
            <p className="text-4xl font-bold text-green-400">{todayHours}h</p>
            <div className="mt-4 w-full bg-dark-bg rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-soft mb-2">Study Streak</p>
            <p className="text-4xl font-bold text-orange-400">{streak} days</p>
            <p className="text-sm text-soft mt-2">Keep it up! 🔥</p>
          </div>
        </Card>
      </div>

      <Card title="Log Today's Study Hours">
        <form onSubmit={handleUpdateHours} className="flex gap-4">
          <Input
            type="number"
            value={inputHours}
            onChange={(e) => setInputHours(e.target.value)}
            placeholder="Enter hours studied"
            step="0.5"
            min="0"
            max="24"
            required
            className="flex-1 mb-0"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Update'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
