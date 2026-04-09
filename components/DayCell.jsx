import { isToday, isWeekend } from "@/utils/dateHelpers";

export default function DayCell({
  day,
  month,
  year,
  dateKey,
  isStart,
  isEnd,
  isInRange,
  onClick,
  onHover,
  onLeave,
}) {
  if (!day) {
    return <div className="h-10 w-full" />;
  }

  const today = isToday(day, month, year);
  const weekend = isWeekend(day, month, year);

  const isStartOrEnd = isStart || isEnd;
  const isSingleDay = isStart && isEnd;

  const baseClass = `
    h-10 w-full flex items-center justify-center
    text-sm font-medium rounded-xl cursor-pointer
    transition-all duration-150 relative select-none
  `;

  const getStyles = () => {
    if (isStart && !isEnd) {
      return "bg-pink-500 text-white rounded-r-none shadow-md";
    }
    if (isEnd && !isStart) {
      return "bg-blue-500 text-white rounded-l-none shadow-md";
    }
    if (isSingleDay) {
      return "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-md rounded-xl";
    }
    if (isInRange) {
      return "bg-pink-100 text-pink-800 rounded-none";
    }
    if (weekend) {
      return "text-pink-400 hover:bg-pink-50";
    }
    return "text-gray-700 hover:bg-blue-50";
  };

  return (
    <div
      className={`${baseClass} ${getStyles()}`}
      onClick={() => onClick(day)}
      onMouseEnter={() => onHover(day)}
      onMouseLeave={onLeave}
    >
      {day}

      {today && !isStartOrEnd && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-400" />
      )}

      {today && isStartOrEnd && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
      )}
    </div>
  );
}