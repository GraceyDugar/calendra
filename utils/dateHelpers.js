export const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

export function formatDateKey(day, month, year) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function isToday(day, month, year) {
  const today = new Date();
  return (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );
}

export function isWeekend(day, month, year) {
  const dayOfWeek = new Date(year, month, day).getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function isInRange(dateKey, startDate, endDate) {
  if (!startDate || !endDate) return false;
  const [s, e] = startDate <= endDate
    ? [startDate, endDate]
    : [endDate, startDate];
  return dateKey > s && dateKey < e;
}

export function formatDisplayDate(dateKey) {
  if (!dateKey) return "";
  const date = new Date(dateKey);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}