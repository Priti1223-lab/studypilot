import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function WeakChapterTracker() {
  const { user } = useAuth()
  const [weakChapters, setWeakChapters] = useState([])
  const [chapterName, setChapterName] = useState('')
  const [subject, setSubject] = useState('Biology')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadWeakChapters()
    }
  }, [user])

  const loadWeakChapters = async () => {
    const { data, error } = await supabase
      .from('weak_chapters')
      .select('*')
      .eq('user_id', user.id)
      .order('mistake_count', { ascending: false })

    if (data) {
      setWeakChapters(data)
    }
  }

  const handleAddChapter = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('weak_chapters')
      .upsert([
        {
          user_id: user.id,
          chapter_name: chapterName,
          subject: subject,
          mistake_count: 1,
        }
      ], {
        onConflict: 'user_id,chapter_name,subject',
      })

    if (!error) {
      setChapterName('')
      loadWeakChapters()
    }

    setLoading(false)
  }

  const handleDelete = async (id) => {
    await supabase.from('weak_chapters').delete().eq('id', id)
    loadWeakChapters()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Weak Chapter Tracker</h1>

      <Card title="Add Weak Chapter" className="mb-6">
        <form onSubmit={handleAddChapter}>
          <Input
            label="Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            placeholder="e.g., Cell Cycle, Photosynthesis"
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
            {loading ? 'Adding...' : 'Add Chapter'}
          </Button>
        </form>
      </Card>

      <Card title="Your Weak Chapters">
        {weakChapters.length === 0 ? (
          <p className="text-soft text-center py-8">
            No weak chapters tracked yet. Add chapters where you make mistakes.
          </p>
        ) : (
          <div className="space-y-3">
            {weakChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between p-4 bg-dark-bg border border-dark-border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-100">
                    {chapter.chapter_name}
                  </h3>
                  <p className="text-sm text-soft">{chapter.subject}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-400">
                      {chapter.mistake_count}
                    </p>
                    <p className="text-xs text-soft">mistakes</p>
                  </div>
                  <Button
                    onClick={() => handleDelete(chapter.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
