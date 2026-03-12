"use client";

import { useState } from "react";
import { statesData, OfficeLocation } from "@/lib/data/local-it";
import StateSelector from "@/components/shared/StateSelector";

function EscalationCell({
  contact,
  level,
}: {
  contact: OfficeLocation["level1"];
  level: number;
}) {
  return (
    <td className="px-3 py-3 text-xs align-top">
      <div className="font-semibold text-gray-800">{contact.name}</div>
      {contact.landline && (
        <div className="mt-0.5 text-gray-500">
          <span className="font-medium">Tel:</span> {contact.landline}
        </div>
      )}
      <div className="text-gray-500">
        <span className="font-medium">Mob:</span> {contact.mobile}
      </div>
      <div className="break-all text-gray-500">
        <span className="font-medium">Email:</span>{" "}
        <a
          href={`mailto:${contact.email}`}
          className="text-blue-600 hover:underline"
        >
          {contact.email}
        </a>
      </div>
    </td>
  );
}

export default function LocalITSupportPage() {
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const selectedState = statesData.find(
    (s) => s.stateCode === selectedStateCode
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Red banner header */}
      <div
        className="w-full px-6 py-4 text-white"
        style={{ backgroundColor: "#c0392b" }}
      >
        <h1 className="text-2xl font-bold tracking-wide">
          Local IT Office Support
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* State selector */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <StateSelector
            states={statesData}
            selectedState={selectedStateCode}
            onChange={setSelectedStateCode}
          />
        </div>

        {/* Results */}
        {!selectedStateCode && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-3 h-10 w-10 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm">
              Please select a state to view local IT support contacts.
            </p>
          </div>
        )}

        {selectedState && (
          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-700">
              {selectedState.stateName} — {selectedState.locations.length}{" "}
              office location
              {selectedState.locations.length !== 1 ? "s" : ""}
            </h2>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm md:block">
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#c0392b" }}>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Location Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      AD OU Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      State
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      City
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Level 1 (Helpdesk)
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Level 2 (Team Lead)
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Level 3 (Manager)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedState.locations.map((loc, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-3 py-3 text-xs font-medium text-gray-800 align-top">
                        {loc.locationName}
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 font-mono break-all align-top">
                        {loc.adOuName}
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 align-top">
                        {loc.state}
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 align-top">
                        {loc.city}
                      </td>
                      <EscalationCell contact={loc.level1} level={1} />
                      <EscalationCell contact={loc.level2} level={2} />
                      <EscalationCell contact={loc.level3} level={3} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-4 md:hidden">
              {selectedState.locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                >
                  <div
                    className="px-4 py-3 text-white"
                    style={{ backgroundColor: "#c0392b" }}
                  >
                    <div className="font-semibold">{loc.locationName}</div>
                    <div className="text-xs opacity-90">
                      {loc.city}, {loc.state}
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100 px-4">
                    <div className="py-2">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        AD OU Name
                      </div>
                      <div className="text-xs font-mono text-gray-700 break-all">
                        {loc.adOuName}
                      </div>
                    </div>
                    {[
                      { label: "Level 1 — Helpdesk", contact: loc.level1 },
                      { label: "Level 2 — Team Lead", contact: loc.level2 },
                      { label: "Level 3 — Manager", contact: loc.level3 },
                    ].map(({ label, contact }) => (
                      <div key={label} className="py-2">
                        <div className="text-xs font-semibold text-gray-700 mb-1">
                          {label}
                        </div>
                        <div className="text-xs text-gray-600 space-y-0.5">
                          <div className="font-medium">{contact.name}</div>
                          <div>Tel: {contact.landline}</div>
                          <div>Mob: {contact.mobile}</div>
                          <div>
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-blue-600 hover:underline break-all"
                            >
                              {contact.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
