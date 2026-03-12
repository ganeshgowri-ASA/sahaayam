'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    id: 1,
    title: 'Welcome to Sahaayam',
    subtitle: 'Your IT Support Portal',
    description: 'Get quick access to IT services, raise incidents, and find solutions to your technology needs.',
    bg: 'from-blue-600 to-blue-800',
    accent: 'bg-blue-400',
  },
  {
    id: 2,
    title: 'Raise Incidents Fast',
    subtitle: 'Swift Resolution Guaranteed',
    description: 'Report technical issues and track resolution progress in real-time with our intelligent ticketing system.',
    bg: 'from-indigo-600 to-purple-800',
    accent: 'bg-indigo-400',
  },
  {
    id: 3,
    title: 'Know Your IT (KYIT)',
    subtitle: 'Empowering Every Employee',
    description: 'Access guides, SOPs, and knowledge base articles to solve common IT challenges on your own.',
    bg: 'from-teal-600 to-cyan-800',
    accent: 'bg-teal-400',
  },
  {
    id: 4,
    title: 'Seamless IT Services',
    subtitle: 'Request. Track. Resolve.',
    description: 'From software installations to network access — request any IT service with just a few clicks.',
    bg: 'from-orange-500 to-rose-700',
    accent: 'bg-orange-400',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '340px' }}>
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex items-center transition-opacity duration-700`}
          style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
        >
          <div className="max-w-5xl mx-auto px-8 w-full">
            <div className="max-w-xl">
              <span className={`inline-block ${slide.accent} text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider`}>
                {slide.subtitle}
              </span>
              <h1 className="text-4xl font-bold text-white mb-3 leading-tight">{slide.title}</h1>
              <p className="text-white/80 text-lg leading-relaxed">{slide.description}</p>
              <button className="mt-6 bg-white text-blue-700 font-semibold px-6 py-2 rounded-full hover:bg-blue-50 transition-colors text-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === current ? 'bg-white w-6 h-2' : 'bg-white/50 w-2 h-2'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
        style={{ zIndex: 10 }}
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
        style={{ zIndex: 10 }}
        aria-label="Next slide"
      >
        &#8594;
      </button>
    </div>
  );
}
