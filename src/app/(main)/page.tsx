'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ─── Data ───────────────────────────────────────────────────────────────────

const quickActions = [
  { id: 'ticket',    label: 'Raise IT Ticket',       icon: 'ticket',    href: '/requests/new', color: '#1e3a5f' },
  { id: 'vpn',       label: 'VPN Setup',              icon: 'vpn',       href: '/services/remote-vpn', color: '#1e3a5f' },
  { id: 'password',  label: 'Password Reset',         icon: 'key',       href: '/sops', color: '#1e3a5f' },
  { id: 'software',  label: 'Software Request',       icon: 'software',  href: '/requests/new', color: '#1e3a5f' },
  { id: 'hardware',  label: 'Hardware Request',       icon: 'hardware',  href: '/requests/new', color: '#1e3a5f' },
  { id: 'email',     label: 'Email Configuration',    icon: 'email',     href: '/services/email-messaging', color: '#1e3a5f' },
  { id: 'printer',   label: 'Printer Setup',          icon: 'printer',   href: '/services/enterprise-print', color: '#1e3a5f' },
  { id: 'network',   label: 'Network Issue',          icon: 'network',   href: '/requests/new', color: '#1e3a5f' },
];

const announcements = [
  { id: 1, date: '12 Mar 2026', title: 'Scheduled Maintenance – Saturday 10 PM to 2 AM', type: 'warning', body: 'Some services including VPN and file servers will be unavailable during the maintenance window.' },
  { id: 2, date: '10 Mar 2026', title: 'New Self-Service Features Now Live!', type: 'info', body: 'Explore KYIT guides, IT Tips, and the updated Service Catalog on Sahaayam.' },
  { id: 3, date: '8 Mar 2026',  title: 'Password Expiry Reminder',           type: 'warning', body: 'Domain passwords expire in 7 days. Reset now via Self-Service to avoid lockout.' },
  { id: 4, date: '5 Mar 2026',  title: 'Help Desk Working Hours',            type: 'info', body: 'IT Helpdesk: Mon–Fri 8 AM – 6 PM IST. Emergency support available 24×7 via Incident portal.' },
  { id: 5, date: '1 Mar 2026',  title: 'SAP Fiori Upgrade Completed',        type: 'success', body: 'SAP Fiori has been upgraded to version 3.0. Download new SAP Logon files from the SAP Logon page.' },
];

const serviceCategories = [
  { id: 'desktop',   label: 'Desktop Support',          icon: 'desktop',   href: '/services', desc: 'Laptop, desktop, peripherals & OS support' },
  { id: 'network',   label: 'Network & Connectivity',   icon: 'network',   href: '/services/enterprise-lan-wifi', desc: 'LAN, WiFi, VPN and internet connectivity' },
  { id: 'email',     label: 'Email & Collaboration',    icon: 'email',     href: '/services/email-messaging', desc: 'Outlook, Teams, SharePoint & calendar' },
  { id: 'sap',       label: 'SAP & ERP',                icon: 'sap',       href: '/sap-logon', desc: 'SAP Fiori, ERP modules & business apps' },
  { id: 'security',  label: 'Security & Compliance',    icon: 'security',  href: '/services/antivirus', desc: 'Antivirus, IRM policies & access control' },
  { id: 'printing',  label: 'Printing & Scanning',      icon: 'printer',   href: '/services/enterprise-print', desc: 'Printer setup, scanning & print quota' },
];

const usefulLinkCards = [
  { label: 'IT Policy',   icon: 'policy',     href: '#', bg: '#1e3a5f' },
  { label: 'VPN Portal',  icon: 'vpn',        href: '/services/remote-vpn', bg: '#1e3a5f' },
  { label: 'Webmail',     icon: 'email',      href: '#', bg: '#1e3a5f' },
  { label: 'ServiceNow',  icon: 'snow',       href: '#', bg: '#1e3a5f' },
  { label: 'SAP Fiori',   icon: 'sap',        href: '/sap-logon', bg: '#1e3a5f' },
  { label: 'SharePoint',  icon: 'sharepoint', href: '/services/sharepoint', bg: '#1e3a5f' },
];

const escalationMatrix = [
  { level: 'Level 1', title: 'Help Desk', name: 'Vijay Kumar',   contact: '044-2222-3001', email: 'vijay.kumar@company.com',   dept: 'IT Support',      response: '< 4 hrs' },
  { level: 'Level 2', title: 'Team Lead', name: 'Anitha Raj',    contact: '044-2222-3002', email: 'anitha.raj@company.com',    dept: 'IT Support',      response: '< 8 hrs' },
  { level: 'Level 3', title: 'Manager',   name: 'Suresh Patel',  contact: '044-2222-3003', email: 'suresh.patel@company.com',  dept: 'IT Operations',   response: '< 24 hrs' },
];

// ─── Icon helper ────────────────────────────────────────────────────────────

function Icon({ name, className = 'h-5 w-5', style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const paths: Record<string, string> = {
    ticket:     'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
    vpn:        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    key:        'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
    software:   'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    hardware:   'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    email:      'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    printer:    'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
    network:    'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    desktop:    'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    sap:        'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    security:   'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    policy:     'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    snow:       'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    sharepoint: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    search:     'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    bell:       'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className={className} style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name] ?? paths.ticket} />
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroBanner({ userName }: { userName: string }) {
  const [query, setQuery] = useState('');
  const [dateStr, setDateStr] = useState('');
  const router = useRouter();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateStr(
        now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
        '  •  ' +
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      );
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/services?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section
      className="relative overflow-hidden py-14 px-6"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 50%, #0a1628 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10" style={{ backgroundColor: '#d4a843' }} />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full opacity-5" style={{ backgroundColor: '#d4a843' }} />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-1 text-sm font-medium text-gray-400">{dateStr}</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Welcome back,{' '}
          <span style={{ color: '#d4a843' }}>{userName}</span>!
        </h1>
        <p className="mt-2 text-gray-400">Your IT Self-Service Portal — request, track, and resolve</p>

        {/* Search */}
        <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search IT services, guides, FAQs..."
            className="flex-1 border-0 bg-white px-5 py-3.5 text-sm text-gray-800 outline-none placeholder-gray-400"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#d4a843', color: '#0a1628' }}
          >
            <Icon name="search" className="h-4 w-4" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

function QuickActionCards() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-xl font-bold" style={{ color: '#0a1628' }}>Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors group-hover:scale-110"
              style={{ backgroundColor: '#f0f4f8' }}
            >
              <Icon name={action.icon} className="h-5 w-5" style={{ color: '#0a1628' } as React.CSSProperties} />
            </span>
            <span className="text-xs font-medium leading-tight text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AnnouncementsSection() {
  const typeStyles: Record<string, string> = {
    warning: 'bg-amber-50 border-amber-300 text-amber-800',
    info:    'bg-blue-50 border-blue-300 text-blue-800',
    success: 'bg-green-50 border-green-300 text-green-800',
  };
  const typeDot: Record<string, string> = {
    warning: 'bg-amber-400',
    info:    'bg-blue-400',
    success: 'bg-green-400',
  };

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="bell" className="h-5 w-5" style={{ color: '#d4a843' } as React.CSSProperties} />
        <h2 className="text-xl font-bold" style={{ color: '#0a1628' }}>Announcements</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`rounded-xl border p-4 ${typeStyles[ann.type] ?? typeStyles.info}`}
          >
            <div className="flex items-start gap-2 mb-1">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${typeDot[ann.type] ?? typeDot.info}`} />
              <div>
                <p className="text-xs opacity-70 mb-0.5">{ann.date}</p>
                <p className="font-semibold text-sm">{ann.title}</p>
                <p className="text-xs mt-1 opacity-80 leading-relaxed">{ann.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesCatalog() {
  return (
    <section className="py-10" style={{ backgroundColor: '#0a1628' }}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-xl font-bold text-white">IT Services Catalog</h2>
        <p className="mb-8 text-sm text-gray-400">Browse all available IT services by category</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex items-center gap-4 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ backgroundColor: '#0f2040', border: '1px solid rgba(212,168,67,0.15)' }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'rgba(212,168,67,0.15)' }}
              >
                <Icon name={cat.icon} className="h-6 w-6" style={{ color: '#d4a843' } as React.CSSProperties} />
              </span>
              <div>
                <p className="font-semibold text-white">{cat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.desc}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-auto h-4 w-4 text-gray-500 group-hover:text-[#d4a843] transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#d4a843', color: '#0a1628' }}
          >
            View All Services
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function UsefulLinks() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-xl font-bold" style={{ color: '#0a1628' }}>Useful Links</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {usefulLinkCards.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group flex flex-col items-center gap-3 rounded-xl p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ backgroundColor: '#f0f4f8' }}
            >
              <Icon name={link.icon} className="h-6 w-6" style={{ color: '#0a1628' } as React.CSSProperties} />
            </span>
            <span className="text-sm font-medium text-gray-700">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link href="/useful-links" className="text-sm font-medium hover:underline" style={{ color: '#0a1628' }}>
          View all useful links →
        </Link>
      </div>
    </section>
  );
}

function EscalationMatrixSection() {
  const levelColors: Record<string, { bg: string; text: string; badge: string }> = {
    'Level 1': { bg: 'bg-green-50',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700' },
    'Level 2': { bg: 'bg-amber-50',  text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700' },
    'Level 3': { bg: 'bg-red-50',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700' },
  };

  return (
    <section className="py-10" style={{ backgroundColor: '#f8f9fb' }}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: '#0a1628' }}>Escalation Matrix</h2>
          <Link href="/escalation" className="text-sm font-medium hover:underline" style={{ color: '#0a1628' }}>
            View full matrix →
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: '#0a1628' }}>
              <tr>
                {['Level', 'Title', 'Name', 'Contact', 'Email', 'Department', 'Response Time'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#d4a843' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {escalationMatrix.map((row) => {
                const colors = levelColors[row.level] ?? levelColors['Level 1'];
                return (
                  <tr key={row.level} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colors.badge}`}>{row.level}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{row.title}</td>
                    <td className="px-4 py-3 text-gray-700">{row.name}</td>
                    <td className="px-4 py-3 text-gray-600">{row.contact}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">{row.email}</a>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.dept}</td>
                    <td className="px-4 py-3 text-gray-600">{row.response}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {escalationMatrix.map((row) => {
            const colors = levelColors[row.level] ?? levelColors['Level 1'];
            return (
              <div key={row.level} className={`rounded-xl border p-4 ${colors.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colors.badge}`}>{row.level}</span>
                  <span className="text-xs text-gray-500">{row.response}</span>
                </div>
                <p className="font-bold text-gray-800">{row.name}</p>
                <p className="text-sm text-gray-600">{row.title} – {row.dept}</p>
                <p className="text-sm text-gray-600 mt-1">{row.contact}</p>
                <a href={`mailto:${row.email}`} className="text-sm text-blue-600 hover:underline">{row.email}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? session?.user?.email ?? 'there';

  // Capitalise first letter
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div>
      <HeroBanner userName={displayName} />
      <QuickActionCards />
      <AnnouncementsSection />
      <ServicesCatalog />
      <UsefulLinks />
      <EscalationMatrixSection />
      {/* Bottom padding so ticker doesn't overlap content */}
      <div className="h-10" />
    </div>
  );
}
