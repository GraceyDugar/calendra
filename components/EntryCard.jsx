import { CATEGORIES, MOODS } from "@/hooks/useCalendar";
import { formatDisplayDate } from "@/utils/dateHelpers";

export default function EntryCard({ entry, onDelete }) {
  const category = CATEGORIES.find((c) => c.id === entry.category);
  const mood = MOODS.find((m) => m.id === entry.mood);

  const getDayCount = () => {
    const start = new Date(entry.startDate);
    const end = new Date(entry.endDate || entry.startDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff === 1 ? "1 day" : `${diff} days`;
  };

  const formatDate = (dateStr) => {
    return formatDisplayDate(dateStr);
  };

  return (
    <div className={`rounded-2xl border p-4 ${category?.light} ${category?.border} 
      transition-all duration-200 hover:shadow-md group`}>

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${category?.color}`} />
          <span className={`text-xs font-bold uppercase tracking-wide ${category?.text}`}>
            {category?.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg" title={mood?.label}>
            {mood?.emoji}
          </span>
          <button
            onClick={() => onDelete(entry.id)}
            className="opacity-0 group-hover:opacity-100 text-gray-300 
            hover:text-red-400 transition-all duration-200 text-lg leading-none"
            title="Delete entry"
          >
            ×
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-700">
          {formatDate(entry.startDate)}
          {entry.endDate && entry.endDate !== entry.startDate && (
            <span className="text-gray-400 font-normal">
              {" "}→ {formatDate(entry.endDate)}
            </span>
          )}
        </p>
        <p className={`text-xs font-medium ${category?.text} mt-0.5`}>
          {getDayCount()}
        </p>
      </div>

      {entry.note && (
        <p className="text-sm text-gray-600 leading-relaxed border-t border-white/60 pt-3">
          {entry.note}
        </p>
      )}

      {!entry.note && (
        <p className="text-sm text-gray-300 italic border-t border-white/60 pt-3">
          No note added
        </p>
      )}

    </div>
  );
}