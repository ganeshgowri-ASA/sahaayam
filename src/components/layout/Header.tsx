'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + Tagline */}
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className="text-2xl font-bold tracking-wide"
              style={{ color: '#d4a853' }}
            >
              Sahaayam
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-gray-300">
              WORK PLACE CENTRAL
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.15 10.15z"
                />
              </svg>
            </button>

            {/* User profile */}
            <button
              type="button"
              aria-label="User profile"
              className="rounded-full p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            {/* Hamburger – mobile only */}
            <button
              type="button"
              aria-label="Toggle menu"
              className="rounded-full p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
