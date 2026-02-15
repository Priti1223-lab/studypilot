import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FormulaSheets() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchAllPDFs();
  }, []);

  function beautifyName(name) {
    return name
      .replace(".pdf", "")
      .replaceAll("-", " ")
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  async function fetchAllPDFs() {
    const classes = ["class-11", "class-12"];
    const subjects = ["physics", "chemistry", "biology"];

    let result = [];

    for (const cls of classes) {
      for (const sub of subjects) {

        const { data } = await supabase.storage
          .from("formula-pdfs")
          .list(`${cls}/${sub}`, { limit: 100 });

        if (!data) continue;

        for (const file of data) {

          if (!file.name.endsWith(".pdf")) continue;

          const { data: publicData } = supabase
            .storage
            .from("formula-pdfs")
            .getPublicUrl(`${cls}/${sub}/${file.name}`);

          result.push({
            class: cls.replace("class-", "Class "),
            subject: sub.charAt(0).toUpperCase() + sub.slice(1),
            chapter: beautifyName(file.name),
            url: publicData.publicUrl
          });
        }
      }
    }

    setFiles(result);
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">📘 Formula Sheets</h1>

      {files.length === 0 && (
        <p className="text-soft">No PDFs found...</p>
      )}

      <div className="grid gap-4">
        {files.map((pdf, i) => (
          <div key={i} className="bg-card border border-borderc rounded-xl p-4 flex justify-between items-center">

            <div>
              <h2 className="text-lg font-semibold">
                {pdf.class} • {pdf.subject}
              </h2>
              <p className="text-soft">{pdf.chapter}</p>
            </div>

            <a
              href={pdf.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Download
            </a>

          </div>
        ))}
      </div>
    </div>
  );
}

