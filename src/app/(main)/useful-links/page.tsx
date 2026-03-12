"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { usefulLinks, categories, UsefulLink } from "@/lib/data/useful-links";
import CardCarousel from "@/components/shared/CardCarousel";

function LinkCard({ link }: { link: UsefulLink }) {
  const [imgError, setImgError] = useState(false);

  const initials = link.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <a
      href={link.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center bg-white rounded-xl shadow-md hover:shadow-xl p-5 h-36 transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-blue-200"
    >
      <div className="mb-3 w-12 h-12 flex items-center justify-center">
        {!imgError ? (
          <Image
            src={link.logoUrl}
            alt={link.title}
            width={48}
            height={48}
            className="object-contain rounded"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            {initials}
          </div>
        )}
      </div>
      <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-blue-700 transition-colors line-clamp-2">
        {link.title}
      </span>
      <span className="text-xs text-gray-400 mt-0.5">{link.category}</span>
    </a>
  );
}

export default function UsefulLinksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return usefulLinks.filter((link) => {
      const matchesSearch =
        search.trim() === "" ||
        link.title.toLowerCase().includes(search.toLowerCase()) ||
        link.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || link.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Hero Section */}
      <section className="pt-16 pb-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Top Useful Links
        </h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
          Quick access to all your enterprise tools, platforms and resources
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-white text-blue-800 shadow"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="px-10 pb-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-blue-200 py-16 text-lg">
            No links found matching your search.
          </div>
        ) : (
          <CardCarousel
            items={filtered}
            renderCard={(link) => <LinkCard link={link} />}
            visibleCount={4}
          />
        )}
      </section>

      {/* Stats Bar */}
      <section className="px-6 pb-8 max-w-7xl mx-auto">
        <div className="flex justify-center gap-8 text-blue-200 text-sm">
          <span>
            <span className="font-bold text-white text-lg">{usefulLinks.length}</span> Total Links
          </span>
          <span>
            <span className="font-bold text-white text-lg">{categories.length}</span> Categories
          </span>
          <span>
            <span className="font-bold text-white text-lg">{filtered.length}</span> Showing
          </span>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky bottom-0 bg-blue-900/90 backdrop-blur-sm border-t border-white/10 px-6 py-4">
        <div className="max-w-2xl mx-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools, platforms, categories..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-blue-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
