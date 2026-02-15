import { useState, useEffect } from "react"

const correctMessages = [
"Wah bhai 🔥","Concept pakad liya tune","Seedha +4 mil gaya",
"Doctor material 😎","AIIMS calling ☎️","NCERT strong ho rahi hai",
"Tu ruk rank aa rahi hai","Perfect attempt","Topper vibes",
"Bahut badhiya","Confidence boost unlocked","Legend move"
]

const wrongMessages = [
"Koi na bhai","Sabse common mistake yehi","NCERT line miss ho gayi",
"Isko mark kar revise me","Almost tha","Galti samajh gaya to +4 next",
"Yahi question exam me aata","Ab yaad rahega lifetime",
"Concept thoda hil gaya","Next wala sahi karega","Ye trap question tha","Learning ho rahi hai"
]

export default function Practice({ cls, subject, chapter }) {

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [reaction, setReaction] = useState("")

  useEffect(() => {
    fetch("/questions.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          q => q.class === cls && q.subject === subject && q.chapter === chapter
        )
        setQuestions(filtered)
      })
  }, [cls, subject, chapter])

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
    setIndex(prev => (prev+1) % questions.length)
    setSelected(null)
    setResult(null)
    setReaction("")
  }

  if(!q){
    return <div className="p-6 text-white">Loading questions...</div>
  }

  return (
    <div className="p-4 sm:p-6 text-white max-w-2xl mx-auto">

      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Class {cls} • {subject} • {chapter.replaceAll("-"," ")}
      </h1>

      <div className="bg-card p-4 sm:p-6 rounded-xl border border-borderc">

        <h2 className="text-base sm:text-lg mb-4">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt,i)=>(
            <button
              key={i}
              onClick={()=>checkAnswer(i)}
              className={`w-full text-left p-3 rounded-lg border transition
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
          <div className="mt-5">
            <p className="text-yellow-300 font-semibold">{reaction}</p>
            <p className="text-soft mt-2">📖 {q.explanation}</p>

            <button
              onClick={nextQuestion}
              className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:scale-105 transition"
            >
              Next Question →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

