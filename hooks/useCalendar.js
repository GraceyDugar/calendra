import { useState, useEffect } from "react";
import { formatDateKey, isInRange } from "@/utils/dateHelpers";

export const CATEGORIES = [
  { id: "travel", label: "Travel", color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  { id: "work", label: "Work", color: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  { id: "health", label: "Health", color: "bg-red-500", light: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  { id: "study", label: "Study", color: "bg-yellow-500", light: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" },
  { id: "personal", label: "Personal", color: "bg-pink-500", light: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
];

export const MOODS = [
  { id: "happy", label: "Happy", emoji: "😊" },
  { id: "excited", label: "Excited", emoji: "🤩" },
  { id: "neutral", label: "Neutral", emoji: "😐" },
  { id: "stressed", label: "Stressed", emoji: "😤" },
  { id: "sad", label: "Sad", emoji: "😢" },
];

export default function useCalendar() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [isPicking, setIsPicking] = useState(false);

  const [noteText, setNoteText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [entries, setEntries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("calendra-entries");
      if (saved) setEntries(JSON.parse(saved));
    } catch (e) {}
  }, []);

  function saveEntries(updated) {
    setEntries(updated);
    try {
      localStorage.setItem("calendra-entries", JSON.stringify(updated));
    } catch (e) {}
  }

  function goToPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function handleDayClick(day) {
    const key = formatDateKey(day, currentMonth, currentYear);
    if (!isPicking || !startDate) {
      setStartDate(key);
      setEndDate(null);
      setIsPicking(true);
    } else {
      if (key < startDate) {
        setEndDate(startDate);
        setStartDate(key);
      } else if (key === startDate) {
        setStartDate(null);
        setIsPicking(false);
      } else {
        setEndDate(key);
      }
      setIsPicking(false);
      setHoverDate(null);
    }
  }

  function handleDayHover(day) {
    if (isPicking) {
      setHoverDate(formatDateKey(day, currentMonth, currentYear));
    }
  }

  function handleDayLeave() {
    if (isPicking) setHoverDate(null);
  }

  function checkIsInRange(dateKey) {
    const effectiveEnd = isPicking && hoverDate ? hoverDate : endDate;
    return isInRange(dateKey, startDate, effectiveEnd);
  }

  function checkIsHighlighted(dateKey) {
    return entries.some((entry) => {
      const end = entry.endDate || entry.startDate;
      return dateKey >= entry.startDate && dateKey <= end;
    });
  }

  function getCategoryForDate(dateKey) {
    const entry = entries.find((e) => {
      const end = e.endDate || e.startDate;
      return dateKey >= e.startDate && dateKey <= end;
    });
    return entry ? CATEGORIES.find((c) => c.id === entry.category) : null;
  }

  function saveEntry() {
    if (!startDate) return;
    const newEntry = {
      id: Date.now(),
      startDate,
      endDate: endDate || startDate,
      note: noteText,
      category: selectedCategory.id,
      mood: selectedMood.id,
      createdAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setNoteText("");
    setStartDate(null);
    setEndDate(null);
    setIsPicking(false);
  }

  function deleteEntry(id) {
    const updated = entries.filter((e) => e.id !== id);
    saveEntries(updated);
  }

  function getFilteredEntries() {
    if (activeFilter === "all") return entries;
    return entries.filter((e) => e.category === activeFilter);
  }

  function resetSelection() {
    setStartDate(null);
    setEndDate(null);
    setIsPicking(false);
    setHoverDate(null);
    setNoteText("");
  }

  return {
    currentMonth,
    currentYear,
    startDate,
    endDate,
    hoverDate,
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
    getFilteredEntries,
    resetSelection,
  };
}