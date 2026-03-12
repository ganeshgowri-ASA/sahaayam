'use client';

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

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="w-full border-b"
      style={{ backgroundColor: '#16213e', borderColor: 'rgba(212,168,83,0.2)' }}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Horizontally scrollable on mobile, flex row on desktop */}
        <ul className="flex overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href + item.label} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className={`relative block whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#d4a853]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Active underline indicator */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: '#d4a853' }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
