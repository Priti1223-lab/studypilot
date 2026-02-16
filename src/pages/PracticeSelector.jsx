import { useState, useEffect } from "react"

export default function PracticeSelector({ startPractice }) {

  const [cls, setCls] = useState("11")
  const [subject, setSubject] = useState("biology")
  const [chapters, setChapters] = useState([])

  useEffect(() => {
    fetch("/questions.json")
      .then(res => res.json())
      .then(data => {

        // IMPORTANT: numbers ko string me convert
        const filtered = data.filter(q =>
          String(q.class) === String(cls) &&
          String(q.subject).toLowerCase() === subject.toLowerCase()
        )

        const uniqueChapters = [...new Set(filtered.map(q => q.chapter))]
        setChapters(uniqueChapters)
      })
      .catch(err => {
        console.error("JSON LOAD ERROR:", err)
        setChapters([])
      })

  }, [cls, subject])

  return (
    <div className="p-4 md:p-6 text-white max-w-xl mx-auto">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-accent">
        🧠 Chapter Practice
      </h1>

      {/* CLASS */}
      <label className="block mb-2">Class</label>
      <select
        value={cls}
        onChange={(e)=>setCls(e.target.value)}
        className="mb-5 w-full p-3 bg-card border border-borderc rounded-lg"
      >
        <option value="11">Class 11</option>
        <option value="12">Class 12</option>
      </select>

      {/* SUBJECT */}
      <label className="block mb-2">Subject</label>
      <select
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
        className="mb-6 w-full p-3 bg-card border border-borderc rounded-lg"
      >
        <option value="biology">Biology</option>
        <option value="chemistry">Chemistry</option>
        <option value="physics">Physics</option>
      </select>

      {/* CHAPTER BUTTONS */}
      <div className="space-y-3">

        {chapters.length === 0 && (
          <p className="text-gray-400">
            No chapters found (JSON mismatch)
          </p>
        )}

        {chapters.map((ch)=>(
          <button
            key={ch}
            onClick={()=>startPractice(cls, subject, ch)}
            className="w-full p-3 bg-accent rounded-lg hover:scale-105 transition text-white font-medium"
          >
            {ch.replaceAll("-"," ").toUpperCase()}
          </button>
        ))}

      </div>
    </div>
  )
}


