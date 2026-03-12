"use client";

import { useState, useMemo } from "react";
import { escalationTeams, departments, EscalationTeam } from "@/lib/data/escalation";
import CardCarousel from "@/components/shared/CardCarousel";
import EscalationCard from "@/components/escalation/EscalationCard";

function TeamCarouselCard({ team, onClick, isActive }: { team: EscalationTeam; onClick: () => void; isActive: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl p-4 h-28 transition-all duration-200 border-2 ${
        isActive
          ? "bg-white text-blue-800 border-white shadow-lg"
          : "bg-white/10 text-white border-transparent hover:bg-white/20"
      }`}
    >
      <div className="font-semibold text-sm line-clamp-2">{team.teamName}</div>
      <div className={`text-xs mt-1 ${isActive ? "text-blue-500" : "text-blue-200"}`}>
        {team.department}
      </div>
      <div className={`text-xs mt-2 ${isActive ? "text-gray-500" : "text-blue-300"}`}>
        {team.contacts.length} contacts
      </div>
    </button>
  );
}

export default function EscalationPage() {
  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState<string>("All");
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return escalationTeams.filter((team) => {
      const matchesSearch =
        search.trim() === "" ||
        team.teamName.toLowerCase().includes(search.toLowerCase()) ||
        team.department.toLowerCase().includes(search.toLowerCase()) ||
        team.contacts.some(
          (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
        );
      const matchesDept = activeDept === "All" || team.department === activeDept;
      return matchesSearch && matchesDept;
    });
  }, [search, activeDept]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Hero */}
      <section className="pt-16 pb-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          IT Escalation Matrix
        </h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
          Find the right contacts across all IT teams for quick escalation
        </p>
      </section>

      {/* Department Filter */}
      <section className="px-6 pb-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {["All", ...departments].map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeDept === dept
                  ? "bg-white text-blue-800 shadow"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* Team Carousel */}
      <section className="px-10 pb-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-blue-200 py-8 text-lg">
            No teams found matching your search.
          </div>
        ) : (
          <CardCarousel
            items={filtered}
            renderCard={(team) => (
              <TeamCarouselCard
                team={team}
                onClick={() =>
                  setSelectedTeamId((prev) => (prev === team.id ? null : team.id))
                }
                isActive={selectedTeamId === team.id}
              />
            )}
            visibleCount={4}
          />
        )}
      </section>

      {/* Stats */}
      <section className="px-6 pb-6 max-w-7xl mx-auto">
        <div className="flex justify-center gap-8 text-blue-200 text-sm">
          <span>
            <span className="font-bold text-white text-lg">{escalationTeams.length}</span> Teams
          </span>
          <span>
            <span className="font-bold text-white text-lg">{departments.length}</span> Departments
          </span>
          <span>
            <span className="font-bold text-white text-lg">{filtered.length}</span> Showing
          </span>
        </div>
      </section>

      {/* Accordion / Expanded Cards */}
      <section className="px-6 pb-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((team) => (
            <EscalationCard
              key={team.id}
              team={team}
              defaultExpanded={selectedTeamId === team.id}
            />
          ))}
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
            placeholder="Search teams, departments, contacts..."
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
