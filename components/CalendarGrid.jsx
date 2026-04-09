import { DAYS, getDaysInMonth, getFirstDayOfMonth, formatDateKey } from "@/utils/dateHelpers";
import DayCell from "./DayCell";

export default function CalendarGrid({
  currentMonth,
  currentYear,
  startDate,
  endDate,
  handleDayClick,
  handleDayHover,
  handleDayLeave,
  checkIsInRange,
}) {
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return (
    <div className="flex flex-col gap-1 w-full">

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-xs font-semibold py-2 tracking-wide
              ${i === 0 || i === 6 ? "text-pink-400" : "text-blue-400"}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, index) => {
          const dateKey = day
            ? formatDateKey(day, currentMonth, currentYear)
            : null;

          const isStart = dateKey === startDate;
          const isEnd = dateKey === endDate;
          const inRange = dateKey ? checkIsInRange(dateKey) : false;

          return (
            <DayCell
              key={index}
              day={day}
              month={currentMonth}
              year={currentYear}
              dateKey={dateKey}
              isStart={isStart}
              isEnd={isEnd}
              isInRange={inRange}
              onClick={handleDayClick}
              onHover={handleDayHover}
              onLeave={handleDayLeave}
            />
          );
        })}
      </div>

    </div>
  );
}