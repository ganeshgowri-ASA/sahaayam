export const metadata = {
  title: 'IT Tips | Sahaayam',
  description: 'Useful IT tips, tricks and best practices for Sahaayam users',
};

const tips = [
  {
    category: 'Password Security',
    items: [
      'Use a passphrase of at least 12 characters mixing upper/lowercase, numbers and symbols.',
      'Never share your domain password with colleagues or IT support staff.',
      'Enable multi-factor authentication (MFA) on all corporate accounts.',
      'Change your password before the 90-day expiry to avoid lockout.',
    ],
  },
  {
    category: 'VPN & Remote Work',
    items: [
      'Always connect to corporate VPN before accessing internal applications remotely.',
      'Disconnect VPN when not in use to conserve bandwidth.',
      'Use the Cisco AnyConnect client — do not install unofficial VPN software.',
      'If VPN fails, clear your browser cache and restart the AnyConnect service.',
    ],
  },
  {
    category: 'Email Best Practices',
    items: [
      'Never click links in unexpected emails — report phishing to security@company.com.',
      'Avoid sending sensitive data over email; use SharePoint or encrypted file shares.',
      'Set an Out-of-Office reply when you are away for more than one day.',
      'Archive emails older than 6 months to keep your mailbox under quota.',
    ],
  },
  {
    category: 'Device & Hardware',
    items: [
      'Restart your laptop at least once a week to apply pending OS updates.',
      'Lock your screen (Win + L) whenever you step away from your desk.',
      'Connect to a docking station for extended display support — avoid HDMI splitters.',
      'Report hardware issues via the IT portal; do not attempt self-repairs.',
    ],
  },
  {
    category: 'Printing & Scanning',
    items: [
      'Use the Follow-Me Print feature to release jobs securely at any printer.',
      'Check your monthly print quota on the IT portal under Print Usage.',
      'Scan documents to email directly from the MFD for a paper-free workflow.',
      'Contact the Help Desk if your printer shows an offline or error status.',
    ],
  },
  {
    category: 'SAP & Business Applications',
    items: [
      'Download the latest SAP Logon files from the SAP Logon page before connecting.',
      'Do not save SAP credentials in browser; use the SAP GUI secure store.',
      'Log off SAP sessions after use to free up licences for colleagues.',
      'For SAP Fiori access issues, raise a ticket with the ERP Support team.',
    ],
  },
];

export default function ITTipsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>
      {/* Hero */}
      <section className="py-12 px-6 text-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 100%)' }}>
        <h1 className="text-4xl font-bold text-white mb-3">IT Tips &amp; Best Practices</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Quick guidance to help you stay secure, productive and connected at work.
        </p>
      </section>

      {/* Tips grid */}
      <section className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((section) => (
            <div
              key={section.category}
              className="rounded-xl bg-white p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-base font-bold mb-4 pb-3 border-b border-gray-100" style={{ color: '#0a1628' }}>
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.items.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(212,168,67,0.15)', color: '#0a1628' }}>
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-xl p-8 text-center" style={{ backgroundColor: '#0a1628' }}>
          <h3 className="text-xl font-bold text-white mb-2">Need more help?</h3>
          <p className="text-gray-400 mb-5 text-sm">Browse the full knowledge base or raise an IT ticket for personalised support.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/sops" className="rounded-full px-6 py-2.5 text-sm font-semibold transition-colors" style={{ backgroundColor: '#d4a843', color: '#0a1628' }}>
              IT SOPs / DIY Guides
            </a>
            <a href="/requests/new" className="rounded-full px-6 py-2.5 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              Raise a Ticket
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
