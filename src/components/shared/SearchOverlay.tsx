"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { search, type SearchResults } from "@/lib/search";
import type { SearchResultItem } from "@/lib/search";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  Service: "bg-blue-100 text-blue-800",
  SOP: "bg-purple-100 text-purple-800",
  "Useful Link": "bg-green-100 text-green-800",
  "Escalation Team": "bg-orange-100 text-orange-800",
};

function ResultItem({
  item,
  onClose,
}: {
  item: SearchResultItem;
  onClose: () => void;
}) {
  return (
    <a
      href={item.url}
      onClick={onClose}
      className="flex items-start gap-3 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">
          {item.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
      </div>
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${
          categoryColors[item.category] ?? "bg-gray-100 text-gray-700"
        }`}
      >
        {item.category}
      </span>
    </a>
  );
}

function SectionGroup({
  title,
  items,
  onClose,
}: {
  title: string;
  items: SearchResultItem[];
  onClose: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </p>
      {items.map((item) => (
        <ResultItem key={item.id} item={item} onClose={onClose} />
      ))}
    </div>
  );
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        setResults(search(value));
      } else {
        setResults(null);
      }
    }, 300);
  }, []);

  if (!isOpen) return null;

  const hasResults =
    results &&
    results.total > 0;

  const isEmpty = query.trim().length > 0 && results && results.total === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
      aria-modal="true"
      role="dialog"
      aria-label="Global search"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <svg
            className="h-5 w-5 text-gray-400 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 4.65 4.65a7.5 7.5 0 0 0 12 12Z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search services, SOPs, links, teams..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleChange("")}
              className="text-gray-400 hover:text-gray-600 shrink-0"
              aria-label="Clear search"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 text-xs text-gray-500 font-mono">
            Esc
          </kbd>
        </div>

        {/* Results area */}
        <div className="overflow-y-auto">
          {/* Empty state — no query yet */}
          {!query.trim() && (
            <div className="flex flex-col items-center justify-center py-14 text-center px-6">
              <svg
                className="h-10 w-10 text-gray-200 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 4.65 4.65a7.5 7.5 0 0 0 12 12Z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-400">
                Search across services, SOPs, links and teams
              </p>
              <p className="text-xs text-gray-300 mt-1">Start typing to see results</p>
            </div>
          )}

          {/* No results */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-14 text-center px-6">
              <svg
                className="h-10 w-10 text-gray-200 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-500">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or browse the categories below
              </p>
            </div>
          )}

          {/* Results grouped by category */}
          {hasResults && (
            <div className="pb-3">
              <SectionGroup
                title="Services"
                items={results.services}
                onClose={onClose}
              />
              <SectionGroup
                title="SOPs"
                items={results.sops}
                onClose={onClose}
              />
              <SectionGroup
                title="Useful Links"
                items={results.usefulLinks}
                onClose={onClose}
              />
              <SectionGroup
                title="Escalation Teams"
                items={results.escalationTeams}
                onClose={onClose}
              />
              <p className="mt-2 px-4 text-xs text-gray-400 text-right">
                {results.total} result{results.total !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
