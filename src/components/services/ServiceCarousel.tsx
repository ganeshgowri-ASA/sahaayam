"use client";

import { useRef, useEffect, useCallback } from "react";
import ServiceCard from "./ServiceCard";
import { Service } from "@/lib/data/services";

interface ServiceCarouselProps {
  services: Service[];
}

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = 224 + 16; // w-56 (224px) + gap-4 (16px)
    const amount = cardWidth * 4;
    track.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  }, []);

  const startAutoScroll = useCallback(() => {
    autoScrollRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const cardWidth = 224 + 16;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: cardWidth * 4, behavior: "smooth" });
      }
    }, 4000);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <div
      className="relative"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      {/* Left arrow */}
      <button
        onClick={() => scrollBy("left")}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
          w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center
          hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-700">
          <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => (
          <ServiceCard key={service.slug} name={service.name} slug={service.slug} />
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scrollBy("right")}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
          w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center
          hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-700">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
