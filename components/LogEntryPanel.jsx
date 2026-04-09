"use client";

import { CATEGORIES, MOODS } from "@/hooks/useCalendar";
import { formatDisplayDate } from "@/utils/dateHelpers";

export default function LogEntryPanel({
  startDate,
  endDate,
  noteText,
  setNoteText,
  selectedCategory,
  setSelectedCategory,
  selectedMood,
  setSelectedMood,
  saveEntry,
  resetSelection,
}) {
  const hasSelection = !!startDate;

  const formatRange = () => {
    if (!startDate) return null;
    if (startDate && !endDate) return formatDisplayDate(startDate);
    return `${formatDisplayDate(startDate)} → ${formatDisplayDate(endDate)}`;
  };

  return (
    <div className="flex flex-col gap-4 p-5 h-full">

      <div>
        <p className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">
          Log Entry
        </p>

        {hasSelection ? (
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-100 rounded-xl px-3 py-2">
            <p className="text-xs text-gray-400 mb-0.5">Selected range</p>
            <p className="text-sm font-semibold text-gray-700">
              {formatRange()}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
            <p className="text-xs text-gray-400">No date selected</p>
            <p className="text-sm text-gray-300">
              Click a day on the calendar
            </p>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Category
        </p>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150
                ${selectedCategory.id === cat.id
                  ? `${cat.color} text-white border-transparent shadow-sm`
                  : `${cat.light} ${cat.text} ${cat.border}`
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Mood
        </p>
        <div className="flex gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood)}
              title={mood.label}
              className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center
                transition-all duration-150 border
                ${selectedMood.id === mood.id
                  ? "bg-pink-100 border-pink-300 scale-110 shadow-sm"
                  : "bg-gray-50 border-gray-100 hover:bg-pink-50"
                }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Notes
        </p>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={
            hasSelection
              ? "What happened during this period?"
              : "Select a date range first..."
          }
          disabled={!hasSelection}
          className="flex-1 resize-none text-sm text-gray-700
          bg-white border border-pink-100 rounded-xl p-3
          placeholder:text-gray-300 focus:outline-none
          focus:border-pink-300 focus:ring-2 focus:ring-pink-100
          disabled:bg-gray-50 disabled:cursor-not-allowed
          transition-all duration-200 min-h-[100px]"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={resetSelection}
          className="px-4 py-2 rounded-xl text-sm font-semibold
          border border-gray-200 text-gray-400
          hover:bg-gray-50 transition-all duration-200"
        >
          Reset
        </button>
        <button
          onClick={saveEntry}
          disabled={!hasSelection}
          className="flex-1 py-2 rounded-xl text-sm font-bold
          bg-gradient-to-r from-pink-500 to-blue-500 text-white
          hover:from-pink-600 hover:to-blue-600
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Save Entry ✓
        </button>
      </div>

    </div>
  );
}