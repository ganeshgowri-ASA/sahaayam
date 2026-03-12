"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/services";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof services>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const filtered = services.filter((s) =>
      s.name.toLowerCase().includes(q.toLowerCase())
    );
    setResults(filtered);
    setShowDropdown(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-md px-5 py-3 gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-gray-400 flex-shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          placeholder="Search for more IT Services here"
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto divide-y divide-gray-100">
          {results.map((service) => (
            <li key={service.slug}>
              <button
                className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0077b6] transition-colors"
                onMouseDown={() => {
                  setQuery("");
                  setShowDropdown(false);
                  router.push(`/services/${service.slug}`);
                }}
              >
                {service.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {showDropdown && results.length === 0 && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl z-20 px-5 py-3 text-sm text-gray-500">
          No services found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
