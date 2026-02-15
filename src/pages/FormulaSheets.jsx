import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FormulaSheets() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    setLoading(true);

    const { data, error } = await supabase.storage
      .from("formula-pdfs")
      .list("class-11/physics", { limit: 100 });

    if (!error && data) {
      const formatted = data.map((file) => ({
        name: file.name,
        url: `https://cuwyenqdtyawerwkcion.supabase.co/storage/v1/object/public/formula-pdfs/class-11/physics/${file.name}`
      }));

      setFiles(formatted);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">📘 Formula Sheets</h1>

      {loading && <p>Loading formulas...</p>}

      <div className="grid gap-4">
        {files.map((file, i) => (
          <div
            key={i}
            className="bg-card border border-borderc rounded-xl p-4 flex justify-between items-center"
          >
            <span>{file.name}</span>

            <a
              href={file.url}
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
