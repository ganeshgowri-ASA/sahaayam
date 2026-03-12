'use client';

import { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const threatAlerts = [
  {
    severity: 'critical',
    title: 'Critical: New phishing campaign targeting employees via fake HR emails',
    detail:
      'A large-scale phishing campaign is impersonating the HR department. Emails request employees to click a link and update personal banking details for payroll. Do NOT click any links – report immediately.',
    time: '2 hours ago',
  },
  {
    severity: 'high',
    title: 'High: Trojan malware detected in unauthorized software downloads',
    detail:
      'Security systems have detected Trojan.GenericKD embedded in pirated software circulating internally. Any device that installed unapproved software in the last 7 days should be reported to the IT Security team.',
    time: '6 hours ago',
  },
  {
    severity: 'medium',
    title: 'Medium: Suspicious login attempts detected from unknown IPs',
    detail:
      'Multiple failed login attempts originating from Eastern European IP ranges have been detected on corporate VPN and email portals. MFA is blocking most attempts – ensure your MFA token is up to date.',
    time: '1 day ago',
  },
];

const phishingExamples = [
  {
    subject: 'ACTION REQUIRED: Reset Your IT Password Immediately',
    sender: 'it-support@c0mpany-helpdesk.net (spoofed)',
    body: 'Your password has expired. Click here to reset it within 2 hours to avoid account lockout.',
    redFlags: [
      'Urgent deadline pressure ("within 2 hours")',
      'Sender domain "c0mpany-helpdesk.net" uses zero instead of letter o',
      'Link points to external domain, not corporate SSO',
      'Poor grammar and generic salutation "Dear User"',
    ],
    type: 'Fake IT Password Reset',
  },
  {
    subject: 'Urgent – Confidential Wire Transfer Required Today',
    sender: 'ceo.office@company-group.co (spoofed CEO)',
    body: 'I need you to process an urgent wire transfer of $48,500 to a new vendor. Keep this confidential until the deal closes.',
    redFlags: [
      'CEO bypassing normal finance channels',
      'Requests secrecy – a classic social engineering tactic',
      'Sender domain slightly differs from official domain',
      'No reference number, PO, or vendor details provided',
    ],
    type: 'CEO Wire Transfer Fraud (BEC)',
  },
  {
    subject: 'Important: Update Your Benefits Before Enrollment Closes',
    sender: 'hr-benefits@company-hr-portal.com (spoofed HR)',
    body: 'Open enrollment closes in 24 hours. Log in to update your medical and dental benefits to avoid losing coverage.',
    redFlags: [
      'Artificial time pressure to act without thinking',
      'Link leads to lookalike HR portal harvesting credentials',
      'Sent outside of official open enrollment period',
      'Hover over link reveals mismatched URL',
    ],
    type: 'HR Benefits Update Scam',
  },
  {
    subject: 'Your Microsoft 365 License Will Expire in 48 Hours',
    sender: 'noreply@microsoft-365-license.info (spoofed Microsoft)',
    body: 'Your Office 365 subscription is about to expire. Click here to renew your license and avoid service interruption.',
    redFlags: [
      'Microsoft never contacts users directly for license renewals',
      'Domain "microsoft-365-license.info" is not a Microsoft domain',
      'Request for credit card details via unsecured form',
      'Certificate warning if you visit the linked page',
    ],
    type: 'Microsoft 365 License Expiry',
  },
  {
    subject: 'Your DHL Parcel Could Not Be Delivered – Action Required',
    sender: 'tracking@dhl-express-delivery.net (spoofed DHL)',
    body: 'We attempted to deliver your package but were unable to. Download the attached shipping label to reschedule delivery.',
    redFlags: [
      'Unexpected attachment (ZIP or PDF with embedded macro)',
      'You are not expecting any delivery',
      'Domain is not dhl.com – contains extra words',
      'Attachment named "invoice.exe" or "label.pdf.zip"',
    ],
    type: 'Delivery Notification Malware',
  },
];

const bestPractices = [
  {
    title: 'How to Identify Phishing Emails',
    content: [
      'Check the sender\'s actual email address carefully – hover over the name to reveal the real address.',
      'Look for urgency, threats, or unusually high-value offers – legitimate systems do not pressure you to act immediately.',
      'Never click links in suspicious emails; navigate directly to websites by typing the URL in your browser.',
      'Inspect URLs before clicking – hover to preview the destination and look for misspellings.',
      'Be wary of attachments from unknown senders, especially .exe, .zip, .docm, or .xlsm files.',
      'When in doubt, call the alleged sender on a known number to verify the request.',
    ],
  },
  {
    title: 'Safe Password Practices',
    content: [
      'Use passphrases of at least 14 characters combining words, numbers, and symbols.',
      'Never reuse passwords across different systems or accounts.',
      'Use the corporate-approved password manager – do not store passwords in browsers on shared devices.',
      'Enable Multi-Factor Authentication (MFA) on every account that supports it.',
      'Change your password immediately if you suspect it has been compromised.',
      'Never share your password with anyone – including IT support staff.',
    ],
  },
  {
    title: 'VPN Usage Policy',
    content: [
      'Always connect to the corporate VPN (Cisco AnyConnect) before accessing internal applications remotely.',
      'Do not use personal or public VPN services on corporate devices.',
      'Disconnect from VPN when not actively using internal resources to preserve bandwidth.',
      'Report VPN connection issues to the Help Desk – do not install unofficial VPN clients.',
      'Never split-tunnel VPN to bypass security controls.',
    ],
  },
  {
    title: 'Reporting Suspicious Activity',
    content: [
      'Forward suspicious emails as an attachment to security@company.com.',
      'Use the "Report Phishing" button in Outlook to alert the security team instantly.',
      'Call the Security Hotline at ext. 9911 for urgent threats.',
      'If you clicked a suspicious link, immediately disconnect from the network and call IT Security.',
      'Do not delete suspicious emails until instructed – they serve as evidence for investigation.',
    ],
  },
  {
    title: 'USB & Removable Media Policy',
    content: [
      'Only use company-approved, encrypted USB drives issued by the IT department.',
      'Never plug personal or found USB drives into corporate devices – this is a common attack vector.',
      'USB ports may be disabled by policy – request an exception via the IT portal if needed.',
      'Data should be transferred via SharePoint, OneDrive, or secure file-share services.',
      'Properly dispose of removable media using the IT-approved destruction process.',
    ],
  },
  {
    title: 'Social Engineering Awareness',
    content: [
      'Be cautious of unsolicited phone calls claiming to be from IT, HR, or your bank.',
      'Verify the identity of anyone requesting access to systems, even if they seem authoritative.',
      'Do not allow tailgating into secure areas – everyone must badge in individually.',
      'Be mindful of what you discuss in public areas – conversations can be overheard.',
      'Attackers may impersonate delivery personnel, contractors, or executives – always verify.',
    ],
  },
  {
    title: 'Data Classification Guidelines',
    content: [
      'Public: Information approved for external distribution (e.g., marketing materials).',
      'Internal: General business information not for public release (e.g., process documents).',
      'Confidential: Sensitive information requiring access controls (e.g., HR records, financials).',
      'Restricted: Highly sensitive data with strict controls (e.g., PII, passwords, trade secrets).',
      'Always label documents with the correct classification before sharing.',
      'Never transmit Restricted data via unencrypted email – use the secure file transfer portal.',
    ],
  },
];

const malwareThreats = [
  {
    name: 'Emotet',
    category: 'Banking Trojan / Malware Dropper',
    description:
      'Originally a banking trojan, Emotet has evolved into a sophisticated malware dropper that delivers other payloads including TrickBot and Ryuk ransomware. It spreads through malicious email attachments and infected Word/Excel macros.',
    prevention: [
      'Never enable macros in Office documents received via email',
      'Keep Windows and Office fully patched',
      'Block executable attachments at the email gateway',
    ],
  },
  {
    name: 'TrickBot',
    category: 'Banking Trojan / Credential Stealer',
    description:
      'TrickBot steals banking credentials, browser data, and network information. It is modular and can deploy additional modules for lateral movement across corporate networks, often leading to ransomware deployment.',
    prevention: [
      'Enable Windows Defender Credential Guard',
      'Monitor for unusual lateral movement in network logs',
      'Disable unnecessary administrative shares (IPC$)',
    ],
  },
  {
    name: 'WannaCry Ransomware',
    category: 'Ransomware (Worm)',
    description:
      'WannaCry exploited the EternalBlue vulnerability in Windows SMBv1 to spread across networks automatically. It encrypted files and demanded Bitcoin ransoms. The 2017 outbreak affected 230,000+ computers in 150 countries.',
    prevention: [
      'Apply MS17-010 patch immediately on all Windows systems',
      'Disable SMBv1 protocol across the network',
      'Maintain offline, air-gapped backups of critical data',
    ],
  },
  {
    name: 'LockBit Ransomware',
    category: 'Ransomware-as-a-Service (RaaS)',
    description:
      'LockBit is a highly automated ransomware that targets enterprises. It self-propagates through the network, encrypts files rapidly, and exfiltrates data before encryption for double-extortion. Active since 2019 and still evolving.',
    prevention: [
      'Implement network segmentation to limit blast radius',
      'Enforce least-privilege access controls',
      'Enable ransomware protection in Windows Security Center',
    ],
  },
  {
    name: 'Keyloggers',
    category: 'Spyware / Credential Harvester',
    description:
      'Keyloggers silently record every keystroke, capturing passwords, credit card numbers, and sensitive communications. They may arrive via phishing attachments, malicious downloads, or be physically installed on keyboards.',
    prevention: [
      'Use virtual keyboards when entering credentials on unknown machines',
      'Run regular antivirus/EDR scans on all endpoints',
      'Inspect devices for unknown USB hardware between keyboard and PC',
    ],
  },
];

const securityMetrics = [
  { label: 'Emails Blocked This Month', value: '12,450', icon: '🛡', color: '#16a34a' },
  { label: 'Phishing Attempts Caught', value: '342', icon: '🎣', color: '#d97706' },
  { label: 'Malware Blocked', value: '89', icon: '🦠', color: '#dc2626' },
  { label: 'Security Training Completion', value: '78%', icon: '🎓', color: '#2563eb' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  if (severity === 'critical') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold bg-red-600 text-white uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-white inline-block animate-pulse" />
        Critical
      </span>
    );
  }
  if (severity === 'high') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold bg-orange-500 text-white uppercase tracking-wide">
        High
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold bg-amber-400 text-gray-900 uppercase tracking-wide">
      Medium
    </span>
  );
}

function AccordionItem({ title, content }: { title: string; content: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#0f2040] hover:bg-[#162b50] transition-colors"
      >
        <span className="font-semibold text-white text-sm">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#d4a843"
          className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#0a1628] border-t border-gray-700">
          <ul className="space-y-2.5">
            {content.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                <span className="mt-0.5 text-[#d4a843] shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function PhishingCard({ example }: { example: typeof phishingExamples[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border border-red-800/40 bg-[#1a0a0a] overflow-hidden">
      <div className="px-5 py-3 bg-red-950/50 border-b border-red-800/30 flex items-center gap-2">
        <span className="text-red-400 text-xs font-bold uppercase tracking-wide">{example.type}</span>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Subject</p>
          <p className="text-sm font-semibold text-white">{example.subject}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">From</p>
          <p className="text-sm text-red-400 font-mono">{example.sender}</p>
        </div>
        <div className="rounded-lg bg-[#0f2040] border border-gray-700 px-4 py-3">
          <p className="text-xs text-gray-400 italic">&ldquo;{example.body}&rdquo;</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1"
        >
          {expanded ? 'Hide' : 'Show'} Red Flags
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {expanded && (
          <ul className="space-y-1.5">
            {example.redFlags.map((flag, i) => (
              <li key={i} className="flex gap-2 text-xs text-red-300 leading-relaxed">
                <span className="text-red-500 shrink-0 font-bold">!</span>
                {flag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ subject: '', sender: '', description: '' });

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#22c55e" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Report Submitted</h3>
        <p className="text-gray-400 text-sm mb-6">Our security team has been notified and will investigate within 1 business hour.</p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setForm({ subject: '', sender: '', description: '' }); }}
          className="rounded-full px-6 py-2 text-sm font-semibold border border-gray-600 text-gray-300 hover:bg-white/10 transition-colors"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
            Email Subject *
          </label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="e.g. IT Password Reset Required"
            className="w-full rounded-lg bg-[#0a1628] border border-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
            Sender Email *
          </label>
          <input
            type="text"
            required
            value={form.sender}
            onChange={(e) => setForm({ ...form, sender: e.target.value })}
            placeholder="e.g. support@fake-domain.com"
            className="w-full rounded-lg bg-[#0a1628] border border-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe why this email looks suspicious, any links or attachments included, and any actions you may have taken..."
          className="w-full rounded-lg bg-[#0a1628] border border-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
          Screenshot (optional)
        </label>
        <div className="rounded-lg border-2 border-dashed border-gray-700 px-4 py-6 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6b7280" className="h-8 w-8 mx-auto mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-xs text-gray-500">Drag & drop or click to upload PNG, JPG, or PDF</p>
          <input type="file" accept="image/*,.pdf" className="sr-only" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-full py-3 text-sm font-bold transition-colors"
        style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
      >
        Report Suspicious Email
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#060e1a' }}>

      {/* ── Hero ── */}
      <section
        className="py-14 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0505 0%, #1a0a0a 50%, #0a1628 100%)' }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(220,38,38,0.3) 40px,rgba(220,38,38,0.3) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(220,38,38,0.3) 40px,rgba(220,38,38,0.3) 41px)' }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-600/40 px-4 py-1.5 text-xs font-bold text-red-400 uppercase tracking-widest mb-5">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Live Threat Monitoring Active
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cybersecurity Alerts &amp;{' '}
            <span style={{ color: '#dc2626' }}>Awareness</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stay informed about active threats, phishing campaigns, and security best practices.
            Your vigilance is our strongest defence.
          </p>
        </div>
      </section>

      {/* ── Security Metrics Dashboard ── */}
      <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {securityMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl bg-[#0f2040] border border-gray-700/50 p-5 text-center"
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-400 leading-tight">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Threat Alert Banners ── */}
      <section className="mx-auto max-w-screen-xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Active Threat Alerts
        </h2>
        <div className="space-y-4">
          {threatAlerts.map((alert, i) => {
            const borderColor = alert.severity === 'critical' ? '#dc2626' : alert.severity === 'high' ? '#f97316' : '#f59e0b';
            const bgColor = alert.severity === 'critical' ? 'rgba(220,38,38,0.08)' : alert.severity === 'high' ? 'rgba(249,115,22,0.08)' : 'rgba(245,158,11,0.08)';
            return (
              <div
                key={i}
                className="rounded-xl p-5 border-l-4"
                style={{ borderLeftColor: borderColor, backgroundColor: bgColor, borderTop: `1px solid ${borderColor}30`, borderRight: `1px solid ${borderColor}30`, borderBottom: `1px solid ${borderColor}30` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <SeverityBadge severity={alert.severity} />
                    <span className="text-sm font-semibold text-white">{alert.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{alert.time}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{alert.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Phishing Email Examples ── */}
      <section className="mx-auto max-w-screen-xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#d4a843" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Phishing Email Examples
          </h2>
          <p className="text-gray-400 text-sm mt-1">Real-world examples of phishing tactics. Learn to spot the red flags.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {phishingExamples.map((example, i) => (
            <PhishingCard key={i} example={example} />
          ))}
        </div>
      </section>

      {/* ── Security Best Practices ── */}
      <section className="mx-auto max-w-screen-xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#d4a843" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Security Best Practices
          </h2>
          <p className="text-gray-400 text-sm mt-1">Expand each section to read detailed guidance.</p>
        </div>
        <div className="space-y-3">
          {bestPractices.map((item, i) => (
            <AccordionItem key={i} title={item.title} content={item.content} />
          ))}
        </div>
      </section>

      {/* ── Trojan & Malware Awareness ── */}
      <section className="mx-auto max-w-screen-xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
            </svg>
            Trojan &amp; Malware Awareness
          </h2>
          <p className="text-gray-400 text-sm mt-1">Common threats active in the wild and how to defend against them.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {malwareThreats.map((threat, i) => (
            <div key={i} className="rounded-xl bg-[#0f2040] border border-gray-700/50 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-white text-base">{threat.name}</h3>
                  <span className="text-xs text-red-400 font-medium">{threat.category}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{threat.description}</p>
              <div className="border-t border-gray-700/50 pt-3">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2">Prevention Steps</p>
                <ul className="space-y-1.5">
                  {threat.prevention.map((step, j) => (
                    <li key={j} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#22c55e" className="h-3.5 w-3.5 shrink-0 mt-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Incident Reporting Form ── */}
      <section className="mx-auto max-w-screen-xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-red-800/40" style={{ background: 'linear-gradient(135deg, #1a0505 0%, #0f2040 100%)' }}>
          <div className="px-6 py-5 border-b border-red-800/30 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Report Suspicious Email</h2>
              <p className="text-xs text-gray-400">Help protect your colleagues – report phishing and suspicious messages instantly.</p>
            </div>
          </div>
          <div className="p-6">
            <ReportForm />
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="mx-auto max-w-screen-xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#0a1628', border: '1px solid rgba(212,168,67,0.2)' }}>
          <h3 className="text-xl font-bold text-white mb-2">Security Hotline</h3>
          <p className="text-gray-400 mb-2 text-sm">For urgent security incidents, contact the Security Operations Centre immediately.</p>
          <p className="text-2xl font-bold mb-5" style={{ color: '#d4a843' }}>Ext. 9911 &nbsp;|&nbsp; security@company.com</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/tips" className="rounded-full px-6 py-2.5 text-sm font-semibold transition-colors" style={{ backgroundColor: '#d4a843', color: '#0a1628' }}>
              IT Tips &amp; Best Practices
            </a>
            <a href="/requests/new" className="rounded-full px-6 py-2.5 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              Raise IT Ticket
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
