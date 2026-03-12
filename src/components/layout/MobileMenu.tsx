'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'IT Services', href: '/services' },
  { label: 'IT Tips', href: '/tips' },
  { label: 'Useful Links', href: '/useful-links' },
  { label: 'Escalation Matrix', href: '/escalation' },
  { label: 'SAP Logon Files', href: '/sap-logon' },
  { label: 'Security', href: '/security' },
  { label: 'IT SOPs/DIY', href: '/sops' },
  { label: 'My Requests', href: '/requests' },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? session?.user?.email ?? 'User';

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
        className="fixed inset-y-0 right-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col"
        style={{
          backgroundColor: '#0a1628',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'rgba(212,168,67,0.3)' }}>
          <span className="text-lg font-bold" style={{ color: '#d4a843' }}>Sahaayam</span>
          <button type="button" aria-label="Close menu" onClick={onClose} className="rounded-full p-1.5 text-gray-300 hover:bg-white/10 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs text-gray-400">Signed in as</p>
          <p className="text-sm font-semibold text-white truncate">{userName}</p>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col py-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={onClose}
                className={`px-5 py-3.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#d4a843] bg-white/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t px-5 py-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => { onClose(); signOut({ callbackUrl: '/login' }); }}
            className="flex w-full items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
