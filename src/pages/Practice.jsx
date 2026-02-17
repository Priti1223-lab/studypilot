import { useState, useEffect } from "react"

const correctMessages = [
"Wah bhai 🔥","Concept pakad liya tune","Seedha +4 mil gaya",
"Doctor material 😎","AIIMS calling ☎️","NCERT strong ho rahi hai",
"Perfect attempt","Topper vibes","Bahut badhiya"
]

const wrongMessages = [
"Koi na bhai","NCERT line miss ho gayi","Revise karna padega",
"Almost tha","Next wala sahi hoga","Ye trap question tha"
]

export default function Practice({ cls, subject, chapter }) {

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [reaction, setReaction] = useState("")
  const [loading, setLoading] = useState(true)

  // 🔥 LOAD FROM SUPABASE API (NOT JSON)
  useEffect(() => {

    setLoading(true)

    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/questions?class=eq.${cls}&subject=eq.${subject}&chapter=eq.${chapter}`, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {

        // 🔥 CONVERT DATABASE → UI FORMAT
        const formatted = data.map(q => ({
          question: q.question_text,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          answer: ["A","B","C","D"].indexOf(q.correct_option),
          explanation: q.explanation,
          image: q.image_url
        }))

        setQuestions(formatted)
        setIndex(0)
        setSelected(null)
        setResult(null)
        setReaction("")
        setLoading(false)

      })
      .catch(() => setLoading(false))

  }, [cls, subject, chapter])


  if (loading)
    return <div className="p-6 text-textc">Loading questions...</div>

  if (!questions.length)
    return <div className="p-6 text-red-400">No questions found</div>

  const q = questions[index]

  function random(arr){
    return arr[Math.floor(Math.random()*arr.length)]
  }

  function checkAnswer(i){
    setSelected(i)

    if(i === q.answer){
      setResult("correct")
      setReaction(random(correctMessages))
    }else{
      setResult("wrong")
      setReaction(random(wrongMessages))
    }
  }

  function nextQuestion(){
    setIndex((prev)=> (prev+1) % questions.length)
    setSelected(null)
    setResult(null)
    setReaction("")
  }

  return (
    <div className="p-4 sm:p-6 text-textc max-w-2xl mx-auto">

      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Class {cls} • {subject} • {chapter.replaceAll("-"," ")}
      </h1>

      <div className="bg-card p-4 sm:p-6 rounded-xl border border-borderc">

        <h2 className="text-base sm:text-lg mb-2 text-accent font-semibold">
          Question {index + 1} / {questions.length}
        </h2>

        {/* IMAGE QUESTION */}
        {q.image && (
          <img src={q.image} className="mb-4 rounded-lg" />
        )}

        {/* TEXT QUESTION */}
        {q.question && (
          <h2 className="text-base sm:text-lg mb-4">{q.question}</h2>
        )}

        <div className="space-y-3">
          {q.options.map((opt,i)=>(
            <button
              key={i}
              onClick={()=>checkAnswer(i)}
              className={`w-full text-left p-3 rounded-lg border transition
              ${
                selected===i
                ? i===q.answer
                  ? "bg-green-600 border-green-400 text-white"
                  : "bg-red-600 border-red-400 text-white"
                : "hover:bg-bg border-borderc"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-5">
            <p className="text-yellow-300 font-semibold">{reaction}</p>
            <p className="text-soft mt-2">📖 {q.explanation}</p>

            <button
              onClick={nextQuestion}
              className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:scale-105 transition text-white"
            >
              Next Question →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

