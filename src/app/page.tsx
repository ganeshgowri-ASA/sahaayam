"use client";

import { useState } from "react";
import SearchOverlay from "@/components/shared/SearchOverlay";
import { services, sops, usefulLinks, escalationTeams } from "@/data";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-5 w-5"
              >
                <path d="M12 2a1 1 0 0 1 1 1v1.07A8.001 8.001 0 0 1 20 12v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a8.001 8.001 0 0 1 7-7.93V3a1 1 0 0 1 1-1ZM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-7-3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H7.5Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Sahaayam</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#services" className="hover:text-indigo-600 transition-colors">Services</a>
            <a href="#sops" className="hover:text-indigo-600 transition-colors">SOPs</a>
            <a href="#links" className="hover:text-indigo-600 transition-colors">Useful Links</a>
            <a href="#teams" className="hover:text-indigo-600 transition-colors">Escalation</a>
          </nav>

          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 4.65 4.65a7.5 7.5 0 0 0 12 12Z" />
            </svg>
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-gray-200 bg-white px-1 text-xs font-mono text-gray-400">
              /
            </kbd>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight">IT Help Desk Portal</h1>
        <p className="mt-3 text-indigo-100 text-lg">
          One-stop support for all your IT needs
        </p>
        <button
          onClick={() => setSearchOpen(true)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-5 py-2.5 text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 4.65 4.65a7.5 7.5 0 0 0 12 12Z" />
          </svg>
          Search services, SOPs, and more...
        </button>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        {/* Services */}
        <section id="services">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={s.url}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">{s.title}</p>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                    Service
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{s.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* SOPs */}
        <section id="sops">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SOPs</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sops.map((s) => (
              <a
                key={s.id}
                href={s.url}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900 group-hover:text-purple-600">{s.title}</p>
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                    SOP
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{s.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Useful Links */}
        <section id="links">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Useful Links</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {usefulLinks.map((l) => (
              <a
                key={l.id}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-green-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900 group-hover:text-green-600">{l.title}</p>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Link
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{l.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Escalation Teams */}
        <section id="teams">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Escalation Teams</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {escalationTeams.map((t) => (
              <a
                key={t.id}
                href={t.url}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-orange-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900 group-hover:text-orange-600">{t.title}</p>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                    Team
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{t.description}</p>
                {t.email && (
                  <p className="mt-2 text-xs text-indigo-500">{t.email}</p>
                )}
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
