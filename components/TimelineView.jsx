"use client";

import { CATEGORIES } from "@/hooks/useCalendar";
import EntryCard from "./EntryCard";

export default function TimelineView({
  entries,
  activeFilter,
  setActiveFilter,
  deleteEntry,
  onClose,
}) {
  const filtered = activeFilter === "all"
    ? entries
    : entries.filter((e) => e.category === activeFilter);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl 
        flex flex-col overflow-hidden animate-slide-in">

        <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white text-xl font-bold">My Life Log</h2>
              <p className="text-white/70 text-sm">
                {entries.length} {entries.length === 1 ? "entry" : "entries"} recorded
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30
              text-white flex items-center justify-center text-xl
              transition-all duration-200"
            >
              ×
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold 
              transition-all duration-150 border
              ${activeFilter === "all"
                ? "bg-white text-pink-500 border-transparent"
                : "bg-white/20 text-white border-white/30 hover:bg-white/30"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold
                transition-all duration-150 border
                ${activeFilter === cat.id
                  ? "bg-white text-pink-500 border-transparent"
                  : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 pb-20">
              <div className="text-6xl">📅</div>
              <p className="text-gray-400 text-center font-medium">
                No entries yet
              </p>
              <p className="text-gray-300 text-sm text-center">
                Select a date range on the calendar and log your first entry!
              </p>
            </div>
          ) : (
            filtered.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onDelete={deleteEntry}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}