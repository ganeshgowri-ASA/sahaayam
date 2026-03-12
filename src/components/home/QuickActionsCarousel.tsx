'use client';

import { useRef } from 'react';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  bg: string;
}

const quickActions: QuickAction[] = [
  { id: 'reset-password', label: 'Reset Password', icon: '🔑', bg: '#f5a623' },
  { id: 'bulk-print', label: 'Bulk Print', icon: '🖨️', bg: '#f5a623' },
  { id: 'std-isd', label: 'STD/ISD', icon: '📞', bg: '#2ecc71' },
  { id: 'ent-network-security', label: 'Ent Network Security', icon: '🛡️', bg: '#1abc9c' },
  { id: 'install-software', label: 'Install Software', icon: '💿', bg: '#e74c3c' },
  { id: 'additional-software', label: 'Additional Software', icon: '📦', bg: '#e07b5a' },
  { id: 'wifi-access', label: 'WiFi Access', icon: '📶', bg: '#e07b5a' },
  { id: 'share-drive', label: 'Share Drive', icon: '📁', bg: '#e07b5a' },
  { id: 'internal-ftp', label: 'Internal FTP', icon: '🔗', bg: '#e07b5a' },
  { id: 'external-ftp', label: 'External FTP', icon: '🌐', bg: '#e07b5a' },
  { id: 'sap-logon', label: 'SAP Logon Files', icon: '🗂️', bg: '#e07b5a' },
  { id: 'install-printer', label: 'Install Printer', icon: '🖨️', bg: '#e07b5a' },
];

interface QuickActionsCarouselProps {
  onActionClick?: (actionId: string) => void;
}

export default function QuickActionsCarousel({ onActionClick }: QuickActionsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-4">
      <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
      <div className="relative flex items-center gap-2">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="shrink-0 bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-gray-600 z-10"
          aria-label="Scroll left"
        >
          &#8592;
        </button>

        {/* Carousel track */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionClick?.(action.id)}
              className="shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl w-24 h-24 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer border-0"
              style={{ backgroundColor: action.bg }}
              aria-label={action.label}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-white text-xs font-medium text-center leading-tight px-1">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="shrink-0 bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors text-gray-600 z-10"
          aria-label="Scroll right"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
