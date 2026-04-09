"use client";

import { useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import LogEntryPanel from "./LogEntryPanel";
import TimelineView from "./TimelineView";

export default function WallCalendar() {
  const [showTimeline, setShowTimeline] = useState(false);

  const {
    currentMonth,
    currentYear,
    startDate,
    endDate,
    isPicking,
    noteText,
    setNoteText,
    selectedCategory,
    setSelectedCategory,
    selectedMood,
    setSelectedMood,
    entries,
    activeFilter,
    setActiveFilter,
    goToPrevMonth,
    goToNextMonth,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    checkIsInRange,
    checkIsHighlighted,
    getCategoryForDate,
    saveEntry,
    deleteEntry,
    resetSelection,
  } = useCalendar();

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">

      <HeroImage
        currentMonth={currentMonth}
        currentYear={currentYear}
        goToPrevMonth={goToPrevMonth}
        goToNextMonth={goToNextMonth}
      />

      <div className="flex items-center justify-between px-5 py-3 
        border-b border-pink-50 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-400" />
          <p className="text-sm text-gray-500 font-medium">
            {!startDate && "Click a day to start logging"}
            {startDate && !endDate && (
              <span className="text-pink-500 font-semibold">
                Now click an end date →
              </span>
            )}
            {startDate && endDate && (
              <span className="text-blue-500 font-semibold">
                Range selected — fill in your log ✓
              </span>
            )}
          </p>
        </div>

        <button
          onClick={() => setShowTimeline(true)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full
          bg-gradient-to-r from-pink-500 to-blue-500 text-white
          text-xs font-bold hover:shadow-md transition-all duration-200"
        >
          <span>My Life Log</span>
          {entries.length > 0 && (
            <span className="bg-white text-pink-500 rounded-full 
            w-5 h-5 flex items-center justify-center text-xs font-bold">
              {entries.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">

        <div className="w-full md:w-72 border-b md:border-b-0 
          md:border-r border-pink-100 bg-white">
          <LogEntryPanel
            startDate={startDate}
            endDate={endDate}
            noteText={noteText}
            setNoteText={setNoteText}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            saveEntry={saveEntry}
            resetSelection={resetSelection}
          />
        </div>

        <div className="flex-1 p-4 md:p-6 bg-white">
          <CalendarGrid
            currentMonth={currentMonth}
            currentYear={currentYear}
            startDate={startDate}
            endDate={endDate}
            handleDayClick={handleDayClick}
            handleDayHover={handleDayHover}
            handleDayLeave={handleDayLeave}
            checkIsInRange={checkIsInRange}
          />

          <div className="mt-5 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-xs text-gray-400">Start date</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-400">End date</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pink-100" />
              <span className="text-xs text-gray-400">In range</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-pink-400" />
              <span className="text-xs text-gray-400">Today</span>
            </div>
          </div>
        </div>

      </div>

      {showTimeline && (
        <TimelineView
          entries={entries}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          deleteEntry={deleteEntry}
          onClose={() => setShowTimeline(false)}
        />
      )}

    </div>
  );
}