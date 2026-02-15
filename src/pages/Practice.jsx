import { useState } from "react"
import questions from "../data/questions.json"

const correctMessages = [
"Wah bhai 🔥",
"Concept pakad liya tune",
"Seedha +4 mil gaya",
"Doctor material 😎",
"AIIMS calling ☎️",
"NCERT strong ho rahi hai",
"Tu ruk rank aa rahi hai",
"Perfect attempt",
"Topper vibes",
"Bahut badhiya",
"Confidence boost unlocked",
"Legend move"
]

const wrongMessages = [
"Koi na bhai",
"Sabse common mistake yehi",
"NCERT line miss ho gayi",
"Isko mark kar revise me",
"Almost tha",
"Galti samajh gaya to +4 next",
"Yahi question exam me aata",
"Ab yaad rahega lifetime",
"Concept thoda hil gaya",
"Next wala sahi karega",
"Ye trap question tha",
"Learning ho rahi hai"
]

export default function Practice({ cls, subject, chapter }) {

  // ⭐ NEW TREE ACCESS (NO FILTER)
  const chapterQuestions =
    questions?.[cls]?.[subject]?.[chapter] || []

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [reaction, setReaction] = useState("")

  const q = chapterQuestions[index]

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
    setIndex((prev)=> (prev+1) % chapterQuestions.length)
    setSelected(null)
    setResult(null)
    setReaction("")
  }

  // ⭐ SAFETY (important)
  if(!Array.isArray(chapterQuestions) || chapterQuestions.length === 0){
    return (
      <div className="p-10 text-center text-xl text-textc">
        No questions found for this chapter
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 text-white max-w-3xl mx-auto">

      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Class {cls} • {subject} • {chapter.replaceAll("-"," ")}
      </h1>

      <div className="bg-card p-4 sm:p-6 rounded-2xl border border-borderc shadow-xl">

        <h2 className="text-base sm:text-lg mb-5 leading-relaxed">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt,i)=>(
            <button
              key={i}
              onClick={()=>checkAnswer(i)}
              className={`w-full text-left p-3 sm:p-4 rounded-xl border transition text-sm sm:text-base
              ${
                selected===i
                ? i===q.answer
                  ? "bg-green-600 border-green-400"
                  : "bg-red-600 border-red-400"
                : "hover:bg-bg border-borderc"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-6 text-center">

            <p className="text-yellow-300 font-semibold text-lg animate-pulse">
              {reaction}
            </p>

            <p className="text-soft mt-3 text-sm sm:text-base leading-relaxed">
              📖 {q.explanation}
            </p>

            <button
              onClick={nextQuestion}
              className="mt-6 px-6 py-3 bg-blue-600 rounded-xl hover:scale-105 active:scale-95 transition font-semibold"
            >
              Next Question →
            </button>

          </div>
        )}

      </div>

    </div>
  )
}

