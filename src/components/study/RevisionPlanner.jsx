import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function RevisionPlanner() {
  const { user } = useAuth()
  const [schedules, setSchedules] = useState([])
  const [chapterName, setChapterName] = useState('')
  const [subject, setSubject] = useState('Biology')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadSchedules()
    }
  }, [user])

  const loadSchedules = async () => {
    const { data, error } = await supabase
      .from('revision_schedule')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) {
      setSchedules(data)
    }
  }

  const handleCreateSchedule = async (e) => {
    e.preventDefault()
    setLoading(true)

    const today = new Date()
    
    const firstRevision = new Date(today)
    firstRevision.setDate(today.getDate() + 1)
    
    const secondRevision = new Date(today)
    secondRevision.setDate(today.getDate() + 3)
    
    const thirdRevision = new Date(today)
    thirdRevision.setDate(today.getDate() + 7)
    
    const fourthRevision = new Date(today)
    fourthRevision.setDate(today.getDate() + 15)

    const { data, error } = await supabase
      .from('revision_schedule')
      .insert([
        {
          user_id: user.id,
          chapter_name: chapterName,
          subject: subject,
          first_revision: firstRevision.toISOString().split('T')[0],
          second_revision: secondRevision.toISOString().split('T')[0],
          third_revision: thirdRevision.toISOString().split('T')[0],
          fourth_revision: fourthRevision.toISOString().split('T')[0],
        }
      ])

    if (!error) {
      setChapterName('')
      loadSchedules()
    }

    setLoading(false)
  }

  const handleToggleComplete = async (id, completed) => {
    await supabase
      .from('revision_schedule')
      .update({ completed: !completed })
      .eq('id', id)
    
    loadSchedules()
  }

  const handleDelete = async (id) => {
    await supabase.from('revision_schedule').delete().eq('id', id)
    loadSchedules()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const isOverdue = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Revision Planner</h1>

      <Card className="mb-6 bg-blue-900/20 border-blue-500">
        <p className="text-sm text-blue-300">
          📅 <strong>Spaced Repetition System:</strong> Revise on Day 1, Day 3, Day 7, and Day 15 for maximum retention.
        </p>
      </Card>

      <Card title="Create Revision Schedule" className="mb-6">
        <form onSubmit={handleCreateSchedule}>
          <Input
            label="Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            placeholder="e.g., Thermodynamics, Organic Chemistry"
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Schedule'}
          </Button>
        </form>
      </Card>

      <Card title="Your Revision Schedules">
        {schedules.length === 0 ? (
          <p className="text-soft text-center py-8">
            No revision schedules yet. Create one to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`p-4 border rounded-lg ${
                  schedule.completed
                    ? 'bg-green-900/20 border-green-500'
                    : 'bg-dark-bg border-dark-border'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-100">
                      {schedule.chapter_name}
                    </h3>
                    <p className="text-sm text-soft">{schedule.subject}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleToggleComplete(schedule.id, schedule.completed)}
                      variant={schedule.completed ? 'secondary' : 'success'}
                    >
                      {schedule.completed ? 'Reopen' : 'Complete'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(schedule.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className={`p-3 rounded-lg ${isOverdue(schedule.first_revision) && !schedule.completed ? 'bg-red-900/20 border border-red-500' : 'bg-dark-card'}`}>
                    <p className="text-xs text-soft">Day 1</p>
                    <p className="text-sm font-medium text-gray-200">
                      {formatDate(schedule.first_revision)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isOverdue(schedule.second_revision) && !schedule.completed ? 'bg-red-900/20 border border-red-500' : 'bg-dark-card'}`}>
                    <p className="text-xs text-soft">Day 3</p>
                    <p className="text-sm font-medium text-gray-200">
                      {formatDate(schedule.second_revision)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isOverdue(schedule.third_revision) && !schedule.completed ? 'bg-red-900/20 border border-red-500' : 'bg-dark-card'}`}>
                    <p className="text-xs text-soft">Day 7</p>
                    <p className="text-sm font-medium text-gray-200">
                      {formatDate(schedule.third_revision)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isOverdue(schedule.fourth_revision) && !schedule.completed ? 'bg-red-900/20 border border-red-500' : 'bg-dark-card'}`}>
                    <p className="text-xs text-soft">Day 15</p>
                    <p className="text-sm font-medium text-gray-200">
                      {formatDate(schedule.fourth_revision)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
