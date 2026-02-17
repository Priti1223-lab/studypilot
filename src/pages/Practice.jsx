import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

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

  // ================= LOAD FROM SUPABASE =================
  useEffect(() => {

    async function loadQuestions(){

      setLoading(true)

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("class", cls)
        .eq("subject", subject)
        .eq("chapter", chapter)

      if(error){
        console.log(error)
        setLoading(false)
        return
      }

      // 🔥 convert answer A/B/C/D → index number
      const formatted = data.map(q => ({
        ...q,
        answerIndex: ["A","B","C","D"].indexOf(q.correct_option),
        imageUrl: q.image
          ? `https://cuwyenqdtyawerwkcion.supabase.co/storage/v1/object/public/question-images/${q.image}`
          : null
      }))

      setQuestions(formatted)
      setIndex(0)
      setSelected(null)
      setResult(null)
      setReaction("")
      setLoading(false)
    }

    loadQuestions()

  }, [cls, subject, chapter])

  // ================= SAFETY =================
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

    if(i === q.answerIndex){
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

  // ================= UI =================
  return (
    <div className="p-4 sm:p-6 text-textc max-w-2xl mx-auto">

      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Class {cls} • {subject} • {chapter.replaceAll("-"," ")}
      </h1>

      <div className="bg-card p-4 sm:p-6 rounded-xl border border-borderc">

        <h2 className="text-base sm:text-lg mb-2 text-accent font-semibold">
          Question {index + 1} / {questions.length}
        </h2>

        {/* QUESTION TEXT */}
        {q.question && (
          <h2 className="text-base sm:text-lg mb-4">
            {q.question}
          </h2>
        )}

        {/* IMAGE */}
        {q.imageUrl && (
          <div className="mb-4">
            <img
              src={q.imageUrl}
              alt="question"
              className="rounded-lg border"
            />
          </div>
        )}

        {/* OPTIONS */}
        <div className="space-y-3">
          {["A","B","C","D"].map((letter,i)=>(
            <button
              key={i}
              onClick={()=>checkAnswer(i)}
              className={`w-full text-left p-3 rounded-lg border transition
              ${
                selected===i
                ? i===q.answerIndex
                  ? "bg-green-600 border-green-400 text-white"
                  : "bg-red-600 border-red-400 text-white"
                : "hover:bg-bg border-borderc"
              }`}
            >
              {q[`option_${letter.toLowerCase()}`]}
            </button>
          ))}
        </div>

        {/* RESULT */}
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
