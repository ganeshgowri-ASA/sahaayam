'use client';

import { useState, useMemo } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'Productivity' | 'Security' | 'Development' | 'Communication' | 'ERP' | 'Design';
type License = 'Enterprise' | 'Free' | 'Per-User';
type Installer = 'IT Admin' | 'Self-Service';
type Status = 'Approved' | 'Pending' | 'Restricted';
type UserRole = 'IT Admin' | 'Standard User' | 'Manager';

interface Software {
  id: number;
  name: string;
  version: string;
  category: Category;
  license: License;
  installedBy: Installer;
  status: Status;
  description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const softwareCatalog: Software[] = [
  { id: 1,  name: 'Microsoft Office 365',    version: '16.0.17231',  category: 'Productivity',    license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'Full productivity suite including Word, Excel, PowerPoint, Outlook.' },
  { id: 2,  name: 'Adobe Acrobat Pro DC',    version: '23.006.20360',category: 'Productivity',    license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'PDF creation, editing, and digital signature solution.' },
  { id: 3,  name: 'Power BI Desktop',        version: '2.124.2028',  category: 'Productivity',    license: 'Per-User',    installedBy: 'Self-Service',  status: 'Approved',    description: 'Business intelligence and data visualisation tool by Microsoft.' },
  { id: 4,  name: 'Tableau Desktop',         version: '2023.3.2',    category: 'Productivity',    license: 'Per-User',    installedBy: 'IT Admin',      status: 'Approved',    description: 'Interactive data visualisation and analytics platform.' },
  { id: 5,  name: 'Notepad++',               version: '8.6.2',       category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'Lightweight open-source code and text editor.' },
  { id: 6,  name: 'Visual Studio Code',      version: '1.87.2',      category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'Extensible code editor by Microsoft.' },
  { id: 7,  name: 'Git',                     version: '2.44.0',      category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'Distributed version control system.' },
  { id: 8,  name: 'Python 3',                version: '3.12.2',      category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'General-purpose programming language runtime.' },
  { id: 9,  name: 'Node.js',                 version: '20.11.1 LTS', category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'JavaScript runtime built on Chrome V8 engine.' },
  { id: 10, name: 'Docker Desktop',          version: '4.28.0',      category: 'Development',     license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'Container platform for building and running applications.' },
  { id: 11, name: 'Postman',                 version: '11.0.0',      category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'API development and testing platform.' },
  { id: 12, name: 'PuTTY',                   version: '0.80',        category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'SSH and telnet client for remote server access.' },
  { id: 13, name: 'WinSCP',                  version: '6.3.2',       category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'SFTP, FTP and SCP client for secure file transfers.' },
  { id: 14, name: 'SAP GUI',                 version: '7.70',        category: 'ERP',             license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'SAP graphical user interface for ERP system access.' },
  { id: 15, name: 'Microsoft Teams',         version: '23306.3314',  category: 'Communication',   license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'Collaboration platform with chat, meetings and file sharing.' },
  { id: 16, name: 'Slack',                   version: '4.36.140',    category: 'Communication',   license: 'Per-User',    installedBy: 'Self-Service',  status: 'Approved',    description: 'Channel-based messaging and collaboration platform.' },
  { id: 17, name: 'Zoom',                    version: '5.17.11',     category: 'Communication',   license: 'Per-User',    installedBy: 'Self-Service',  status: 'Approved',    description: 'Video conferencing and online meeting platform.' },
  { id: 18, name: 'Google Chrome',           version: '123.0.6312',  category: 'Productivity',    license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'Chromium-based web browser.' },
  { id: 19, name: 'Mozilla Firefox',         version: '124.0.1',     category: 'Productivity',    license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'Open-source web browser by Mozilla Foundation.' },
  { id: 20, name: '7-Zip',                   version: '23.01',       category: 'Productivity',    license: 'Free',        installedBy: 'Self-Service',  status: 'Approved',    description: 'High-compression file archiver.' },
  { id: 21, name: 'Cisco AnyConnect VPN',    version: '4.10.08025',  category: 'Security',        license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'Corporate VPN client for secure remote access.' },
  { id: 22, name: 'CrowdStrike Falcon',      version: '7.14.18110',  category: 'Security',        license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'Endpoint detection and response (EDR) security platform.' },
  { id: 23, name: 'McAfee Endpoint Security',version: '10.7.0.8395', category: 'Security',        license: 'Enterprise',  installedBy: 'IT Admin',      status: 'Approved',    description: 'Antivirus and endpoint protection suite.' },
  { id: 24, name: 'Adobe Illustrator',       version: '28.3',        category: 'Design',          license: 'Per-User',    installedBy: 'IT Admin',      status: 'Pending',     description: 'Professional vector graphics editor.' },
  { id: 25, name: 'Figma',                   version: 'Web App',     category: 'Design',          license: 'Per-User',    installedBy: 'Self-Service',  status: 'Approved',    description: 'Collaborative interface design and prototyping tool.' },
  { id: 26, name: 'VirtualBox',              version: '7.0.14',      category: 'Development',     license: 'Free',        installedBy: 'Self-Service',  status: 'Restricted',  description: 'x86 virtualisation software — requires IT approval for use.' },
];

const rolePermissions: Record<UserRole, { action: string; allowed: boolean }[]> = {
  'IT Admin': [
    { action: 'Install any approved software', allowed: true },
    { action: 'Manage user accounts & roles', allowed: true },
    { action: 'Run full system diagnostics', allowed: true },
    { action: 'View all audit logs', allowed: true },
    { action: 'Approve/reject software requests', allowed: true },
    { action: 'Deploy enterprise packages', allowed: true },
    { action: 'Modify software catalog', allowed: true },
    { action: 'Access restricted software', allowed: true },
  ],
  'Manager': [
    { action: 'Install any approved software', allowed: false },
    { action: 'Manage user accounts & roles', allowed: false },
    { action: 'Run full system diagnostics', allowed: false },
    { action: 'View all audit logs', allowed: false },
    { action: 'Approve/reject software requests', allowed: true },
    { action: 'Deploy enterprise packages', allowed: false },
    { action: 'View team usage reports', allowed: true },
    { action: 'Access restricted software', allowed: false },
  ],
  'Standard User': [
    { action: 'Install any approved software', allowed: false },
    { action: 'Manage user accounts & roles', allowed: false },
    { action: 'Run full system diagnostics', allowed: false },
    { action: 'View all audit logs', allowed: false },
    { action: 'Request new software', allowed: true },
    { action: 'Self-service approved installs', allowed: true },
    { action: 'Run basic diagnostics', allowed: true },
    { action: 'View own activity logs', allowed: true },
  ],
};

// ─── Badge helpers ────────────────────────────────────────────────────────────

function statusColor(s: Status) {
  if (s === 'Approved')   return 'bg-emerald-100 text-emerald-800';
  if (s === 'Pending')    return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-700';
}

function categoryColor(c: Category) {
  const map: Record<Category, string> = {
    Productivity:  'bg-blue-100 text-blue-800',
    Security:      'bg-red-100 text-red-800',
    Development:   'bg-purple-100 text-purple-800',
    Communication: 'bg-sky-100 text-sky-800',
    ERP:           'bg-orange-100 text-orange-800',
    Design:        'bg-pink-100 text-pink-800',
  };
  return map[c];
}

function licenseColor(l: License) {
  if (l === 'Enterprise') return 'bg-indigo-100 text-indigo-800';
  if (l === 'Free')       return 'bg-green-100 text-green-800';
  return 'bg-yellow-100 text-yellow-800';
}

// ─── Page Component ───────────────────────────────────────────────────────────

const CATEGORIES: ('All' | Category)[] = ['All', 'Productivity', 'Security', 'Development', 'Communication', 'ERP', 'Design'];
const STATUSES: ('All' | Status)[] = ['All', 'Approved', 'Pending', 'Restricted'];

export default function SoftwareCatalogPage() {
  // ── State ──
  const [search, setSearch]           = useState('');
  const [catFilter, setCatFilter]     = useState<'All' | Category>('All');
  const [statusFilter, setStatus]     = useState<'All' | Status>('All');
  const [currentRole, setCurrentRole] = useState<UserRole>('Standard User');
  const [modalOpen, setModalOpen]     = useState(false);
  const [requestForm, setRequestForm] = useState({ name: '', version: '', justification: '' });
  const [submitted, setSubmitted]     = useState(false);

  // ── Filtered list ──
  const filtered = useMemo(() => {
    return softwareCatalog.filter((sw) => {
      const q = search.toLowerCase();
      const matchSearch = sw.name.toLowerCase().includes(q) || sw.category.toLowerCase().includes(q) || sw.description.toLowerCase().includes(q);
      const matchCat    = catFilter === 'All' || sw.category === catFilter;
      const matchStatus = statusFilter === 'All' || sw.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, catFilter, statusFilter]);

  // ── Modal submit ──
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setRequestForm({ name: '', version: '', justification: '' });
    }, 2000);
  }

  const roleBadge: Record<UserRole, string> = {
    'IT Admin':      'bg-indigo-100 text-indigo-800',
    'Manager':       'bg-amber-100 text-amber-800',
    'Standard User': 'bg-emerald-100 text-emerald-800',
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>

      {/* ── Hero ── */}
      <section className="py-12 px-6 text-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 100%)' }}>
        <h1 className="text-4xl font-bold text-white mb-3">Software Catalog</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Browse approved enterprise software, manage your role permissions, and request new applications.
        </p>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">

        {/* ── Role Selector + Request Button row ── */}
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600">Viewing as:</span>
            {(['IT Admin', 'Manager', 'Standard User'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setCurrentRole(r)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  currentRole === r
                    ? 'border-[#d4a843] text-[#0a1628] bg-[#d4a843]'
                    : 'border-gray-300 text-gray-600 bg-white hover:border-[#d4a843] hover:text-[#0a1628]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#d4a843', color: '#0a1628' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Request Software
          </button>
        </div>

        {/* ── Main grid: Catalog + Role Panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─ Left: Software Catalog ─ */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              {/* Table header bar */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: '#0a1628' }}>
                <h2 className="text-base font-bold text-white">Enterprise Software Catalog</h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(212,168,67,0.2)', color: '#d4a843' }}>
                  {filtered.length} of {softwareCatalog.length} items
                </span>
              </div>

              {/* Search + Filters */}
              <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap gap-3 items-center bg-gray-50">
                <div className="relative flex-1 min-w-[180px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search software..."
                    className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40"
                  />
                </div>
                <select
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value as 'All' | Category)}
                  className="rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatus(e.target.value as 'All' | Status)}
                  className="rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500 tracking-wide">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Version</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">License</th>
                      <th className="px-4 py-3">Installed By</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-gray-400">No software matched your filters.</td>
                      </tr>
                    ) : filtered.map((sw) => (
                      <tr key={sw.id} className="hover:bg-amber-50/40 transition-colors group">
                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-900 group-hover:text-[#0a1628]">{sw.name}</span>
                          <p className="text-xs text-gray-400 mt-0.5 max-w-[220px] truncate">{sw.description}</p>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{sw.version}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${categoryColor(sw.category)}`}>{sw.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${licenseColor(sw.license)}`}>{sw.license}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{sw.installedBy}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor(sw.status)}`}>{sw.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ─ Right: Role Assignment Panel ─ */}
          <div className="space-y-5">
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
              {/* Panel header */}
              <div className="px-5 py-4 border-b border-gray-100" style={{ backgroundColor: '#0a1628' }}>
                <h2 className="text-base font-bold text-white">Role & Permissions</h2>
                <p className="text-xs text-gray-400 mt-0.5">Current user access level</p>
              </div>

              <div className="p-5 space-y-4">
                {/* Current role badge */}
                <div className="flex items-center gap-3 rounded-lg p-3 border border-gray-100 bg-gray-50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#d4a843', color: '#0a1628' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Logged in role</p>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${roleBadge[currentRole]}`}>
                      {currentRole}
                    </span>
                  </div>
                </div>

                {/* Permissions table */}
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide mb-2">Permissions</p>
                  <ul className="space-y-1.5">
                    {rolePermissions[currentRole].map((perm) => (
                      <li key={perm.action} className="flex items-center gap-2.5 text-xs text-gray-700">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${perm.allowed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                          {perm.allowed
                            ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          }
                        </span>
                        {perm.action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                  {[
                    { label: 'Approved', count: softwareCatalog.filter(s => s.status === 'Approved').length, color: 'text-emerald-700' },
                    { label: 'Pending',  count: softwareCatalog.filter(s => s.status === 'Pending').length,  color: 'text-amber-600' },
                    { label: 'Restricted', count: softwareCatalog.filter(s => s.status === 'Restricted').length, color: 'text-red-600' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-gray-50 p-2 text-center">
                      <p className={`text-lg font-bold ${stat.color}`}>{stat.count}</p>
                      <p className="text-[10px] text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5 space-y-3">
              <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Legend</p>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-gray-500 uppercase">Status</p>
                {(['Approved', 'Pending', 'Restricted'] as Status[]).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor(s)}`}>{s}</span>
                  </div>
                ))}
                <p className="text-[11px] font-semibold text-gray-500 uppercase pt-1">License</p>
                {(['Enterprise', 'Per-User', 'Free'] as License[]).map((l) => (
                  <div key={l} className="flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${licenseColor(l)}`}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Software Request Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#0a1628', border: '1px solid rgba(212,168,67,0.3)' }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(212,168,67,0.2)' }}>
              <h3 className="text-lg font-bold text-white">Request New Software</h3>
              <button onClick={() => setModalOpen(false)} className="rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-emerald-500/20 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-7 w-7 text-emerald-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">Request Submitted!</p>
                <p className="text-gray-400 text-sm mt-1">Your request will be reviewed by IT Admin within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Software Name <span className="text-red-400">*</span></label>
                  <input
                    required
                    type="text"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    placeholder="e.g. Adobe Photoshop"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50"
                    style={{ backgroundColor: '#0f2040', borderColor: 'rgba(255,255,255,0.15)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Version / Edition</label>
                  <input
                    type="text"
                    value={requestForm.version}
                    onChange={(e) => setRequestForm({ ...requestForm, version: e.target.value })}
                    placeholder="e.g. 2024 (latest)"
                    className="w-full rounded-lg border px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50"
                    style={{ backgroundColor: '#0f2040', borderColor: 'rgba(255,255,255,0.15)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Business Justification <span className="text-red-400">*</span></label>
                  <textarea
                    required
                    rows={4}
                    value={requestForm.justification}
                    onChange={(e) => setRequestForm({ ...requestForm, justification: e.target.value })}
                    placeholder="Explain why this software is needed for your role or project..."
                    className="w-full rounded-lg border px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50 resize-none"
                    style={{ backgroundColor: '#0f2040', borderColor: 'rgba(255,255,255,0.15)' }}
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 rounded-lg py-2.5 text-sm font-semibold border text-gray-300 hover:bg-white/10 transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors"
                    style={{ backgroundColor: '#d4a843', color: '#0a1628' }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
