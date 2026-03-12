'use client';

import { useState } from 'react';

const announcements = [
  'Scheduled maintenance on Saturday 10 PM – 2 AM. Some services may be unavailable.',
  'New self-service portal features are now live! Explore KYIT for guided help.',
  'Reminder: Update your domain password before the deadline to avoid lockout.',
  'IT Helpdesk working hours: Mon–Fri, 8 AM – 6 PM. For emergencies, use the Incident portal.',
];

export default function AnnouncementTicker() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const message = announcements.join('   •   ');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 text-yellow-900 flex items-center overflow-hidden shadow-lg" style={{ height: '36px', zIndex: 50 }}>
      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden">
        <div
          className="whitespace-nowrap inline-block text-sm font-medium"
          style={{
            animation: 'ticker 30s linear infinite',
          }}
        >
          📢&nbsp;&nbsp;{message}&nbsp;&nbsp;&nbsp;&nbsp;📢&nbsp;&nbsp;{message}
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 px-3 h-full flex items-center hover:bg-yellow-500 transition-colors text-yellow-900 font-bold text-base"
        aria-label="Dismiss announcement"
      >
        ✕
      </button>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
