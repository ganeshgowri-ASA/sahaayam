"use client";

import { useRef, useState, useCallback } from "react";

interface CardCarouselProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  visibleCount?: number;
}

export default function CardCarousel<T>({
  items,
  renderCard,
  visibleCount = 4,
}: CardCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const cardWidthPercent = 100 / visibleCount;
  const translateX = -(currentIndex * cardWidthPercent);

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-blue-800 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Carousel Viewport */}
      <div className="overflow-hidden mx-6">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${cardWidthPercent}%` }}
            >
              {renderCard(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-blue-800 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
