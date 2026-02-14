import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { getRandomMCQs } from '../../lib/mcqData'
import Card from '../common/Card'
import Button from '../common/Button'

export default function DailyMCQ() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [hasAttemptedToday, setHasAttemptedToday] = useState(false)

  useEffect(() => {
    checkTodayAttempt()
  }, [user])

  const checkTodayAttempt = async () => {
    const today = new Date().toISOString().split('T')[0]
    
    const { data } = await supabase
      .from('mcq_attempts')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)

    if (data && data.length > 0) {
      setHasAttemptedToday(true)
    }
  }

  const startQuiz = () => {
    setQuestions(getRandomMCQs(10))
    setCurrentIndex(0)
    setScore(0)
    setCompleted(false)
    setSelectedAnswer(null)
  }

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = async () => {
    if (selectedAnswer === questions[currentIndex].correct) {
      setScore(score + 1)
    } else {
      // Add to weak chapters
      await supabase.from('weak_chapters').upsert([
        {
          user_id: user.id,
          chapter_name: questions[currentIndex].chapter,
          subject: questions[currentIndex].subject,
          mistake_count: 1,
        }
      ], {
        onConflict: 'user_id,chapter_name,subject',
        ignoreDuplicates: false,
      }).then(async ({ data: existing }) => {
        if (existing) {
          await supabase
            .from('weak_chapters')
            .update({ mistake_count: existing.mistake_count + 1 })
            .eq('user_id', user.id)
            .eq('chapter_name', questions[currentIndex].chapter)
            .eq('subject', questions[currentIndex].subject)
        }
      })
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    } else {
      // Save score
      const today = new Date().toISOString().split('T')[0]
      await supabase.from('mcq_attempts').insert([
        {
          user_id: user.id,
          date: today,
          score: selectedAnswer === questions[currentIndex].correct ? score + 1 : score,
          total_questions: questions.length,
        }
      ])
      setCompleted(true)
      setHasAttemptedToday(true)
    }
  }

  if (hasAttemptedToday && questions.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-textc mb-6">Daily MCQ Practice</h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-xl text-green-400 mb-4">✅ You've completed today's MCQ practice!</p>
            <p className="text-soft">Come back tomorrow for a new set of questions.</p>
          </div>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-textc mb-6">Daily MCQ Practice</h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-xl text-gray-300 mb-6">Ready to practice 10 Biology MCQs?</p>
            <Button onClick={startQuiz}>Start Quiz</Button>
          </div>
        </Card>
      </div>
    )
  }

  if (completed) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-textc mb-6">Daily MCQ Practice</h1>
        <Card>
          <div className="text-center py-8">
            <p className="text-3xl font-bold text-primary mb-4">
              Score: {score}/{questions.length}
            </p>
            <p className="text-xl text-gray-300 mb-2">
              {score >= 8 ? '🎉 Excellent!' : score >= 6 ? '👍 Good job!' : '📚 Keep practicing!'}
            </p>
            <p className="text-soft">
              {((score / questions.length) * 100).toFixed(0)}% accuracy
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const question = questions[currentIndex]

  return (
    <div>
      <h1 className="text-3xl font-bold text-textc mb-6">Daily MCQ Practice</h1>
      
      <Card>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-soft">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-soft">
              Score: {score}/{currentIndex}
            </span>
          </div>
          <div className="w-full bg-dark-bg rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-primary mb-2">{question.chapter}</p>
          <p className="text-xl text-gray-100 mb-6">{question.question}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? 'bg-primary border-primary text-textc'
                    : 'bg-dark-bg border-dark-border text-gray-300 hover:border-primary'
                }`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full"
        >
          {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </Card>
    </div>
  )
}
