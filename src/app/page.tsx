'use client';

import { useState } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import ActionCards from '@/components/home/ActionCards';
import PasswordSection from '@/components/home/PasswordSection';
import QuickActionsCarousel from '@/components/home/QuickActionsCarousel';
import AnnouncementTicker from '@/components/home/AnnouncementTicker';
import PopupModal, { type ModalType } from '@/components/home/PopupModal';

export default function HomePage() {
  const [modal, setModal] = useState<ModalType>(null);

  const handleCardClick = (cardId: string) => {
    if (cardId === 'kyit') {
      setModal('automated-services');
    } else if (cardId === 'domain') {
      setModal('local-it-support');
    }
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'reset-password') {
      setModal('out-of-office');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Action Cards */}
      <ActionCards onCardClick={handleCardClick} />

      {/* Password Section */}
      <PasswordSection
        onClickHere={() => setModal('out-of-office')}
        onGuidelinesClick={() => setModal('automated-services')}
      />

      {/* Quick Actions Carousel */}
      <QuickActionsCarousel onActionClick={handleQuickAction} />

      {/* Support Info Cards */}
      <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-3 gap-4">
        <button
          onClick={() => setModal('out-of-office')}
          className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-2xl">🏠</span>
          <h4 className="font-semibold text-gray-800 mt-2 text-sm">Out-of-Office Support</h4>
          <p className="text-xs text-gray-500 mt-1">Access IT help even when working remotely</p>
        </button>
        <button
          onClick={() => setModal('automated-services')}
          className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-2xl">🤖</span>
          <h4 className="font-semibold text-gray-800 mt-2 text-sm">Automated Services</h4>
          <p className="text-xs text-gray-500 mt-1">Instant self-service for common IT needs</p>
        </button>
        <button
          onClick={() => setModal('local-it-support')}
          className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:shadow-md transition-shadow cursor-pointer"
        >
          <span className="text-2xl">🧑‍💻</span>
          <h4 className="font-semibold text-gray-800 mt-2 text-sm">Local IT Support</h4>
          <p className="text-xs text-gray-500 mt-1">On-site help from your IT team</p>
        </button>
      </div>

      {/* Announcement Ticker */}
      <AnnouncementTicker />

      {/* Popup Modal */}
      <PopupModal type={modal} onClose={() => setModal(null)} />
    </div>
  );
}
