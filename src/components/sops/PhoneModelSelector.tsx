'use client';

import { useState } from 'react';
import { PHONE_MODELS } from '@/lib/data/sops';

const MODELS = Object.keys(PHONE_MODELS);

export default function PhoneModelSelector() {
  const [selected, setSelected] = useState('');

  const guideUrl = selected ? PHONE_MODELS[selected] : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:border-transparent bg-white"
        aria-label="Select phone model"
      >
        <option value="">-- Select model --</option>
        {MODELS.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      {guideUrl && (
        <a
          href={guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#c0392b] hover:underline hover:text-[#962d22] transition-colors"
        >
          View Guide &rarr;
        </a>
      )}
    </div>
  );
}
