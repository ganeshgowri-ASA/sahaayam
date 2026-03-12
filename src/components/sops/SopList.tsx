'use client';

import { useState, useMemo } from 'react';
import { SOPS, SopItem, FileType } from '@/lib/data/sops';
import PhoneModelSelector from './PhoneModelSelector';

function FileIcon({ fileType }: { fileType: FileType }) {
  if (fileType === 'pdf') {
    return (
      <svg
        className="w-5 h-5 text-red-600 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="PDF document"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v1H8v-1zm0-2h8v1H8v-1zm0-2h5v1H8v-1z" />
      </svg>
    );
  }
  if (fileType === 'mp4') {
    return (
      <svg
        className="w-5 h-5 text-blue-600 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="Video file"
      >
        <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    );
  }
  return (
    <svg
      className="w-5 h-5 text-green-600 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="External link"
    >
      <path d="M14 3v2H5v14h14v-9h2v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10zm7 0v6h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H15V3h6z" />
    </svg>
  );
}

function SopRow({ item, index }: { item: SopItem; index: number }) {
  const isEven = index % 2 === 0;
  const isPhoneGuide = item.id === 'sop-009';

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 ${
        isEven ? 'bg-white' : 'bg-gray-50'
      } hover:bg-red-50 transition-colors`}
    >
      <span className="text-xs text-gray-400 w-6 text-right shrink-0 mt-0.5">
        {index + 1}
      </span>
      <FileIcon fileType={item.fileType} />
      <div className="flex-1 min-w-0">
        {isPhoneGuide ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-800">
              {item.title}
            </span>
            <PhoneModelSelector />
          </div>
        ) : item.fileUrl ? (
          <a
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#c0392b] hover:underline hover:text-[#962d22] transition-colors"
          >
            {item.title}
          </a>
        ) : (
          <span className="text-sm font-medium text-gray-800">{item.title}</span>
        )}
        {item.category && (
          <span className="ml-2 inline-block text-xs text-gray-400">
            {item.category}
          </span>
        )}
      </div>
      <span className="text-xs uppercase font-semibold shrink-0 px-1.5 py-0.5 rounded">
        {item.fileType === 'pdf' && (
          <span className="bg-red-100 text-red-700">PDF</span>
        )}
        {item.fileType === 'mp4' && (
          <span className="bg-blue-100 text-blue-700">VIDEO</span>
        )}
        {item.fileType === 'external' && (
          <span className="bg-green-100 text-green-700">LINK</span>
        )}
      </span>
    </div>
  );
}

export default function SopList() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(SOPS.map((s) => s.category).filter(Boolean)));
    return ['All', ...cats] as string[];
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return SOPS.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search SOPs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-2">
        Showing {filtered.length} of {SOPS.length} items
      </p>

      {/* List */}
      <div className="border border-gray-200 rounded overflow-hidden divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            No results found for &quot;{search}&quot;
          </div>
        ) : (
          filtered.map((item, idx) => (
            <SopRow key={item.id} item={item} index={idx} />
          ))
        )}
      </div>
    </div>
  );
}
