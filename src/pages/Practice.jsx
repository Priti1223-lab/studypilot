import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

const letters = ["A","B","C","D"]

export default function Practice({ cls, subject, chapter }) {

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  // LOAD QUESTIONS FROM SUPABASE
  useEffect(() => {

    async function load(){
      setLoading(true)

      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("class", cls)
        .eq("subject", subject)
        .eq("chapter", chapter)
        .order("id",{ascending:true})

      if(!error) setQuestions(data || [])
      setLoading(false)
    }

    load()

  },[cls,subject,chapter])


  if(loading) return <div className="p-6 text-white">Loading...</div>
  if(!questions.length) return <div className="p-6 text-red-400">No questions found</div>

  const q = questions[index]

  // convert ABCD → index
  const correctIndex = letters.indexOf(q.correct_answer)

  function check(i){
    setSelected(i)
    setResult(i === correctIndex ? "correct" : "wrong")
  }

  function next(){
    setIndex(prev => (prev+1)%questions.length)
    setSelected(null)
    setResult(null)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">

      <h1 className="text-xl font-bold mb-4">
        Class {cls} • {subject} • {chapter.replaceAll("-"," ")}
      </h1>

      <div className="bg-card border border-borderc p-6 rounded-xl">

        <h2 className="text-accent mb-3">
          Question {index+1} / {questions.length}
        </h2>

        {/* TEXT QUESTION */}
        {q.question_text && (
          <p className="mb-4">{q.question_text}</p>
        )}

        {/* IMAGE QUESTION */}
        {q.image_url && (
          <img
            src={q.image_url}
            className="mb-4 rounded-lg border"
          />
        )}

        {/* OPTIONS */}
        <div className="space-y-3">
          {[q.option_a,q.option_b,q.option_c,q.option_d].map((opt,i)=>(
            <button
              key={i}
              onClick={()=>check(i)}
              className={`w-full text-left p-3 rounded-lg border
              ${
                selected===i
                ? i===correctIndex
                  ? "bg-green-600 border-green-400"
                  : "bg-red-600 border-red-400"
                : "border-borderc hover:bg-bg"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-5">
            <p className="text-yellow-300">{q.explanation}</p>

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
