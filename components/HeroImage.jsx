import { MONTHS } from "@/utils/dateHelpers";

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80", // January
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80", // February
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80", // March
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80", // April
  "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800&q=80", // May
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // June
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80", // July
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", // August
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // September
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80", // October
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", // November
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80", // December
];

export default function HeroImage({ currentMonth, currentYear, goToPrevMonth, goToNextMonth }) {
  return (
    <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-2xl">

      <img
        src={MONTH_IMAGES[currentMonth]}
        alt={MONTHS[currentMonth]}
        className="w-full h-full object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

      <div className="absolute top-3 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-white/40 border border-white/60"
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-6">
        <p className="text-white/70 text-xs tracking-widest uppercase">
          {currentYear}
        </p>
        <h2 className="text-white text-3xl font-bold tracking-wide">
          {MONTHS[currentMonth]}
        </h2>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-2">
        <button
          onClick={goToPrevMonth}
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-pink-400/80 
          text-white border border-white/30 flex items-center justify-center 
          text-lg transition-all duration-200 backdrop-blur-sm"
        >
          ‹
        </button>
        <button
          onClick={goToNextMonth}
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-blue-400/80 
          text-white border border-white/30 flex items-center justify-center 
          text-lg transition-all duration-200 backdrop-blur-sm"
        >
          ›
        </button>
      </div>

    </div>
  );
}