"use client";

import { StateData } from "@/lib/data/local-it";

interface StateSelectorProps {
  states: StateData[];
  selectedState: string;
  onChange: (stateCode: string) => void;
}

export default function StateSelector({
  states,
  selectedState,
  onChange,
}: StateSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="state-select"
        className="text-sm font-medium text-gray-700"
      >
        Select State
      </label>
      <select
        id="state-select"
        value={selectedState}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      >
        <option value="">-- Select a State --</option>
        {states.map((state) => (
          <option key={state.stateCode} value={state.stateCode}>
            {state.stateName}
          </option>
        ))}
      </select>
    </div>
  );
}
