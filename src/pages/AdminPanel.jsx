import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminPanel() {

  const [form, setForm] = useState({
    class: "11",
    subject: "biology",
    chapter: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: 0,
    explanation: ""
  })

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleUpload(e){
    const file = e.target.files[0]
    if(!file) return
    setImage(file)
  }

  async function handleSubmit(){
    setLoading(true)

    let imageUrl = null

    // upload image if exists
    if(image){
      const fileName = Date.now() + "-" + image.name

      const { data, error } = await supabase.storage
        .from("question-images")
        .upload(fileName, image)

      if(error){
        alert("Image upload failed")
        setLoading(false)
        return
      }

      imageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/question-images/${fileName}`
    }

    const { error } = await supabase
      .from("questions")
      .insert([{
        ...form,
        correct_option: Number(form.correct_option),
        question_image: imageUrl
      }])

    if(error){
      alert("Insert failed")
    }else{
      alert("Question Added Successfully")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">Admin Question Upload</h1>

      <select name="class" onChange={handleChange} className="w-full mb-3 p-2 bg-card border border-borderc">
        <option value="11">Class 11</option>
        <option value="12">Class 12</option>
      </select>

      <select name="subject" onChange={handleChange} className="w-full mb-3 p-2 bg-card border border-borderc">
        <option value="biology">Biology</option>
        <option value="chemistry">Chemistry</option>
        <option value="physics">Physics</option>
      </select>

      <input name="chapter" placeholder="Chapter name (example: the-living-world)"
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-card border border-borderc"
      />

      <textarea name="question_text" placeholder="Type question (optional if image)"
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-card border border-borderc"
      />

      <input type="file" onChange={handleUpload} className="mb-4" />

      <input name="option_a" placeholder="Option A" onChange={handleChange} className="w-full mb-2 p-2 bg-card border border-borderc"/>
      <input name="option_b" placeholder="Option B" onChange={handleChange} className="w-full mb-2 p-2 bg-card border border-borderc"/>
      <input name="option_c" placeholder="Option C" onChange={handleChange} className="w-full mb-2 p-2 bg-card border border-borderc"/>
      <input name="option_d" placeholder="Option D" onChange={handleChange} className="w-full mb-2 p-2 bg-card border border-borderc"/>

      <select name="correct_option" onChange={handleChange} className="w-full mb-3 p-2 bg-card border border-borderc">
        <option value="0">Correct A</option>
        <option value="1">Correct B</option>
        <option value="2">Correct C</option>
        <option value="3">Correct D</option>
      </select>

      <textarea name="explanation" placeholder="Explanation"
        onChange={handleChange}
        className="w-full mb-3 p-2 bg-card border border-borderc"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full p-3 bg-green-600 rounded-lg hover:scale-105"
      >
        {loading ? "Saving..." : "Save Question"}
      </button>

    </div>
  )
}
