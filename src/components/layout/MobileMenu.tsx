'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'IT SOPs/DIY', href: '/sops' },
  { label: 'IT Service', href: '/services' },
  { label: 'IT & IRM Policies', href: '#' },
  { label: 'Useful Links', href: '/useful-links' },
  { label: 'IT Escalation', href: '/escalation' },
  { label: 'Know your IT usage', href: '#' },
  { label: 'SAP Logon Files', href: '/sap-logon' },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden`}
        style={{
          backgroundColor: '#1a1a2e',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: 'rgba(212,168,83,0.3)' }}
        >
          <span className="text-lg font-bold" style={{ color: '#d4a853' }}>
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={onClose}
                className={`px-5 py-3.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#d4a853] bg-white/10'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
