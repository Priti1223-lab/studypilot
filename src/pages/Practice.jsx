import { useState, useEffect } from "react"

const correctMessages = [
"Wah bhai 🔥","Concept pakad liya tune","Seedha +4 mil gaya","Doctor material 😎",
"AIIMS calling ☎️","NCERT strong ho rahi hai","Tu ruk rank aa rahi hai",
"Perfect attempt","Topper vibes","Bahut badhiya","Confidence boost unlocked","Legend move"
]

const wrongMessages = [
"Koi na bhai","Sabse common mistake yehi","NCERT line miss ho gayi",
"Isko mark kar revise me","Almost tha","Galti samajh gaya to +4 next",
"Yahi question exam me aata","Ab yaad rahega lifetime",
"Concept thoda hil gaya","Next wala sahi karega","Ye trap question tha","Learning ho rahi hai"
]

export default function Practice({ cls, subject, chapter }) {

  const [questions,setQuestions]=useState([])
  const [index,setIndex]=useState(0)
  const [selected,setSelected]=useState(null)
  const [result,setResult]=useState(null)
  const [reaction,setReaction]=useState("")

  // load json
  useEffect(()=>{
    fetch("/questions.json")
      .then(r=>r.json())
      .then(data=>{
        const filtered=data.filter(q=>
          q.class===cls && q.subject===subject && q.chapter===chapter
        )
        setQuestions(filtered)
      })
  },[cls,subject,chapter])

  const q=questions[index]

  function rand(arr){return arr[Math.floor(Math.random()*arr.length)]}

  function checkAnswer(i){
    setSelected(i)
    if(i===q.answer){
      setResult("correct")
      setReaction(rand(correctMessages))
    }else{
      setResult("wrong")
      setReaction(rand(wrongMessages))
    }
  }

  function next(){
    setIndex((p)=>(p+1)%questions.length)
    setSelected(null)
    setResult(null)
  }

  if(!q) return <div className="p-6 text-white">Loading questions...</div>

  return(
    <div className="p-4 max-w-2xl mx-auto text-white">

      <h1 className="text-xl font-bold mb-4">
        Class {cls} • {subject} • {chapter}
      </h1>

      <div className="bg-card p-4 rounded-xl border border-borderc">

        <h2 className="mb-4">{q.question}</h2>

        {q.options.map((opt,i)=>(
          <button
            key={i}
            onClick={()=>checkAnswer(i)}
            className={`w-full text-left p-3 mb-2 rounded-lg border
            ${selected===i
              ? i===q.answer
                ? "bg-green-600"
                : "bg-red-600"
              : "hover:bg-bg"
            }`}
          >
            {opt}
          </button>
        ))}

        {result && (
          <div className="mt-4">
            <p className="text-yellow-300">{reaction}</p>
            <p className="opacity-70 mt-2">{q.explanation}</p>

            <button
              onClick={next}
              className="mt-4 px-4 py-2 bg-blue-600 rounded-lg"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

