"use client";

import { useState } from "react";
import { EscalationTeam } from "@/lib/data/escalation";
import ContactsTable from "./ContactsTable";

interface EscalationCardProps {
  team: EscalationTeam;
  defaultExpanded?: boolean;
}

const departmentColors: Record<string, string> = {
  "IT Infrastructure": "bg-blue-100 text-blue-700",
  "IT Support": "bg-indigo-100 text-indigo-700",
  "IT Security": "bg-red-100 text-red-700",
  "Cloud": "bg-sky-100 text-sky-700",
  "Business Applications": "bg-purple-100 text-purple-700",
  "Communication": "bg-teal-100 text-teal-700",
  "IT Operations": "bg-orange-100 text-orange-700",
  "Development": "bg-green-100 text-green-700",
  "Facilities": "bg-amber-100 text-amber-700",
};

export default function EscalationCard({ team, defaultExpanded = false }: EscalationCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const badgeClass =
    departmentColors[team.department] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {/* Card Header */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-expanded={isExpanded}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base truncate">{team.teamName}</h3>
          <span className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
            {team.department}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-400">{team.contacts.length} contacts</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* Expanded Contact Table */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <ContactsTable contacts={team.contacts} />
        </div>
      )}
    </div>
  );
}
