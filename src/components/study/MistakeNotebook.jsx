import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

export default function MistakeNotebook() {
  const { user } = useAuth()
  const [mistakes, setMistakes] = useState([])
  const [mistakeText, setMistakeText] = useState('')
  const [chapterName, setChapterName] = useState('')
  const [subject, setSubject] = useState('Biology')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadMistakes()
    }
  }, [user])

  const loadMistakes = async () => {
    const { data, error } = await supabase
      .from('mistake_notebook')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) {
      setMistakes(data)
    }
  }

  const handleAddMistake = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('mistake_notebook')
      .insert([
        {
          user_id: user.id,
          mistake_text: mistakeText,
          chapter_name: chapterName,
          subject: subject,
        }
      ])

    if (!error) {
      setMistakeText('')
      setChapterName('')
      loadMistakes()
    }

    setLoading(false)
  }

  const handleDelete = async (id) => {
    await supabase.from('mistake_notebook').delete().eq('id', id)
    loadMistakes()
  }

  const filteredMistakes = mistakes.filter((mistake) => {
    const query = searchQuery.toLowerCase()
    return (
      mistake.mistake_text.toLowerCase().includes(query) ||
      mistake.chapter_name.toLowerCase().includes(query) ||
      mistake.subject.toLowerCase().includes(query)
    )
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Mistake Notebook</h1>

      <Card title="Add New Mistake" className="mb-6">
        <form onSubmit={handleAddMistake}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mistake Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={mistakeText}
              onChange={(e) => setMistakeText(e.target.value)}
              placeholder="Describe what went wrong and the correct concept..."
              required
              rows="4"
              className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Input
            label="Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            placeholder="e.g., Newton's Laws"
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
            {loading ? 'Adding...' : 'Add Mistake'}
          </Button>
        </form>
      </Card>

      <Card title="Search Mistakes">
        <Input
          placeholder="Search by mistake, chapter, or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-0"
        />
      </Card>

      <div className="mt-6">
        <Card title={`Your Mistakes (${filteredMistakes.length})`}>
          {filteredMistakes.length === 0 ? (
            <p className="text-soft text-center py-8">
              {searchQuery ? 'No mistakes found matching your search.' : 'No mistakes recorded yet.'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((mistake) => (
                <div
                  key={mistake.id}
                  className="p-4 bg-dark-bg border border-dark-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded">
                        {mistake.subject}
                      </span>
                      <span className="ml-2 text-sm text-soft">
                        {mistake.chapter_name}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleDelete(mistake.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>

                  <p className="text-gray-200 mb-3 whitespace-pre-wrap">
                    {mistake.mistake_text}
                  </p>

                  <p className="text-xs text-soft">
                    Added on {formatDate(mistake.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
