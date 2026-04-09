import { useState, useEffect } from "react";
import { formatDisplayDate } from "@/utils/dateHelpers";

export default function NotesPanel({ startDate, endDate, getCurrentNote, saveNote }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(getCurrentNote());
    setSaved(false);
  }, [startDate, endDate]);

  function handleSave() {
    saveNote(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const formatRange = () => {
    if (!startDate && !endDate) return null;
    if (startDate && !endDate) return formatDisplayDate(startDate);
    return `${formatDisplayDate(startDate)} → ${formatDisplayDate(endDate)}`;
  };

  const range = formatRange();

  return (
    <div className="flex flex-col gap-3 p-4 h-full">

      <div>
        <p className="text-xs font-semibold tracking-widest text-pink-400 uppercase mb-1">
          Notes
        </p>

        {range ? (
          <div className="inline-block bg-blue-50 border border-blue-100 
          text-blue-600 text-xs px-2 py-1 rounded-lg font-medium">
            {range}
          </div>
        ) : (
          <div className="inline-block bg-gray-50 border border-gray-100 
          text-gray-400 text-xs px-2 py-1 rounded-lg">
            No date selected
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-px bg-pink-100 w-full" />
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          startDate
            ? "Write a note for this date..."
            : "Select a date to add a note..."
        }
        disabled={!startDate}
        className="flex-1 resize-none text-sm text-gray-700 
        bg-white border border-pink-100 rounded-xl p-3 
        placeholder:text-gray-300 focus:outline-none 
        focus:border-pink-300 focus:ring-2 focus:ring-pink-100
        disabled:bg-gray-50 disabled:cursor-not-allowed
        transition-all duration-200 min-h-[120px]"
      />

      <button
        onClick={handleSave}
        disabled={!startDate}
        className="w-full py-2 rounded-xl text-sm font-semibold
        bg-gradient-to-r from-pink-400 to-blue-400 text-white
        hover:from-pink-500 hover:to-blue-500
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {saved ? "✓ Saved!" : "Save Note"}
      </button>

      {saved && (
        <p className="text-center text-xs text-green-500 font-medium">
          Note saved successfully!
        </p>
      )}

    </div>
  );
}