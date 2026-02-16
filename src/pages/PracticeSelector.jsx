useEffect(() => {
  fetch("/questions.json")
    .then(res => res.json())
    .then(data => {

      const normalized = data.map(q => ({
        ...q,
        class: String(q.class).toLowerCase(),
        subject: String(q.subject).toLowerCase(),
        chapter: String(q.chapter).toLowerCase()
      }))

      const ch = [
        ...new Set(
          normalized
            .filter(q => q.class === cls.toLowerCase() && q.subject === subject.toLowerCase())
            .map(q => q.chapter)
        )
      ]

      setChapters(ch)
    })
}, [cls, subject])


