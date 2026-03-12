'use client';

import { useEffect, useCallback } from 'react';

export type ModalType = 'out-of-office' | 'automated-services' | 'local-it-support' | null;

interface ModalContent {
  title: string;
  icon: string;
  body: React.ReactNode;
}

const modalContent: Record<NonNullable<ModalType>, ModalContent> = {
  'out-of-office': {
    title: 'Out-of-Office IT Support',
    icon: '🏠',
    body: (
      <div className="space-y-3 text-sm text-gray-600">
        <p>When working remotely or outside office hours, you can still access IT support through:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Self-service portal (24/7 available)</li>
          <li>Email: itsupport@company.com</li>
          <li>Emergency hotline: +1-800-IT-HELP</li>
          <li>VPN access for critical systems</li>
        </ul>
        <p className="text-blue-600 font-medium">Response times may vary during non-business hours.</p>
      </div>
    ),
  },
  'automated-services': {
    title: 'Automated IT Services',
    icon: '🤖',
    body: (
      <div className="space-y-3 text-sm text-gray-600">
        <p>Our automated services handle common IT requests instantly:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Password reset – available 24/7</li>
          <li>Software license provisioning</li>
          <li>VPN token renewal</li>
          <li>Access request approvals</li>
          <li>System health monitoring alerts</li>
        </ul>
        <p>Most automated requests are resolved within <span className="font-semibold text-teal-600">5 minutes</span>.</p>
      </div>
    ),
  },
  'local-it-support': {
    title: 'Local IT Support',
    icon: '🧑‍💻',
    body: (
      <div className="space-y-3 text-sm text-gray-600">
        <p>Your local IT support team is here to help with:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Hardware issues and replacements</li>
          <li>On-site software installation</li>
          <li>Network connectivity problems</li>
          <li>Printer and peripheral setup</li>
          <li>Desktop/laptop configuration</li>
        </ul>
        <div className="bg-blue-50 rounded-lg p-3 mt-2">
          <p className="font-semibold text-blue-800">Office Hours</p>
          <p className="text-blue-700">Monday – Friday: 8:00 AM – 6:00 PM</p>
          <p className="text-blue-700">Location: IT Department, Floor 2</p>
        </div>
      </div>
    ),
  },
};

interface PopupModalProps {
  type: ModalType;
  onClose: () => void;
}

export default function PopupModal({ type, onClose }: PopupModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!type) return;
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [type, handleEsc]);

  if (!type) return null;

  const content = modalContent[type];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{content.icon}</span>
          <h2 className="text-xl font-bold text-gray-800">{content.title}</h2>
        </div>

        {/* Body */}
        <div>{content.body}</div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
