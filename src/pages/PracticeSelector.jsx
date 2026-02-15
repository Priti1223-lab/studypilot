import questions from "../data/questions.json"
import { useState } from "react"

export default function PracticeSelector({ startPractice }) {

  const [cls, setCls] = useState("11")
  const [subject, setSubject] = useState("biology")

  // auto chapter detect
  const chapters = [
    ...new Set(
      questions
        .filter(q => q.class === cls && q.subject === subject)
        .map(q => q.chapter)
    )
  ]

  return (
    <div className="p-6 text-textc max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-accent">
        🧠 Chapter Practice
      </h1>

      {/* Class */}
      <label className="block mb-2">Select Class</label>
      <select
        value={cls}
        onChange={(e)=>setCls(e.target.value)}
        className="mb-5 w-full p-3 bg-card border border-borderc rounded-lg"
      >
        <option value="11">Class 11</option>
        <option value="12">Class 12</option>
      </select>

      {/* Subject */}
      <label className="block mb-2">Select Subject</label>
      <select
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
        className="mb-6 w-full p-3 bg-card border border-borderc rounded-lg"
      >
        <option value="biology">Biology</option>
        <option value="chemistry">Chemistry</option>
        <option value="physics">Physics</option>
      </select>

      {/* Chapters */}
      <div className="space-y-3">

        {chapters.length === 0 && (
          <p className="text-soft">No chapters available</p>
        )}

        {chapters.map((ch)=>(
          <button
            key={ch}
            onClick={()=>startPractice(cls,subject,ch)}
            className="w-full p-3 bg-accent rounded-lg hover:scale-105 transition text-white font-medium"
          >
            {ch.replaceAll("-"," ").toUpperCase()}
          </button>
        ))}

      </div>

    </div>
  )
}
