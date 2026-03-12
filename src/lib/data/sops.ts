export type FileType = 'pdf' | 'mp4' | 'external';

export interface SopItem {
  id: string;
  title: string;
  fileUrl: string;
  fileType: FileType;
  category?: string;
}

export const PHONE_MODELS: Record<string, string> = {
  'Avaya 2402': 'https://getit.usc.edu/files/guides/desk-phone-avaya-2402.pdf',
  'Avaya 2410': 'https://getit.usc.edu/files/guides/desk-phone-avaya-2410.pdf',
  'Avaya 9620': 'https://getit.usc.edu/files/guides/desk-phone-avaya-9620.pdf',
  'Avaya 9630': 'https://getit.usc.edu/files/guides/desk-phone-avaya-9630.pdf',
  'Cisco 6921': 'https://getit.usc.edu/files/guides/desk-phone-cisco-6921.pdf',
  'Cisco 6941': 'https://getit.usc.edu/files/guides/desk-phone-cisco-6941.pdf',
  'Cisco 7962': 'https://getit.usc.edu/files/guides/desk-phone-cisco-7962.pdf',
  'Cisco 7841': 'https://getit.usc.edu/files/guides/desk-phone-cisco-7841.pdf',
  'Cisco 8941': 'https://getit.usc.edu/files/guides/desk-phone-cisco-8941.pdf',
  'Cisco 8811': 'https://getit.usc.edu/files/guides/desk-phone-cisco-8811.pdf',
  'Cisco 8851': 'https://getit.usc.edu/files/guides/desk-phone-cisco-8851.pdf',
  'Cisco 7832': 'https://getit.usc.edu/files/guides/desk-phone-cisco-7832-conference.pdf',
};

export const SOPS: SopItem[] = [
  // Network & VPN
  {
    id: 'sop-001',
    title: 'Connect to USC VPN (Cisco AnyConnect)',
    fileUrl: 'https://getit.usc.edu/files/guides/vpn-anyconnect.pdf',
    fileType: 'pdf',
    category: 'Network & VPN',
  },
  {
    id: 'sop-002',
    title: 'VPN Setup Video Tutorial',
    fileUrl: 'https://getit.usc.edu/files/videos/vpn-setup.mp4',
    fileType: 'mp4',
    category: 'Network & VPN',
  },
  {
    id: 'sop-003',
    title: 'Connect to USC Wireless Network (USC Secure Wireless)',
    fileUrl: 'https://getit.usc.edu/files/guides/wireless-usc-secure.pdf',
    fileType: 'pdf',
    category: 'Network & VPN',
  },
  {
    id: 'sop-004',
    title: 'Troubleshoot Network Connectivity Issues',
    fileUrl: 'https://getit.usc.edu/services/network-connectivity',
    fileType: 'external',
    category: 'Network & VPN',
  },
  // Email & Calendar
  {
    id: 'sop-005',
    title: 'Set Up USC Email on Mobile Device (iOS)',
    fileUrl: 'https://getit.usc.edu/files/guides/email-mobile-ios.pdf',
    fileType: 'pdf',
    category: 'Email & Calendar',
  },
  {
    id: 'sop-006',
    title: 'Set Up USC Email on Mobile Device (Android)',
    fileUrl: 'https://getit.usc.edu/files/guides/email-mobile-android.pdf',
    fileType: 'pdf',
    category: 'Email & Calendar',
  },
  {
    id: 'sop-007',
    title: 'Configure Outlook for USC Exchange',
    fileUrl: 'https://getit.usc.edu/files/guides/outlook-exchange-setup.pdf',
    fileType: 'pdf',
    category: 'Email & Calendar',
  },
  {
    id: 'sop-008',
    title: 'Email Auto-Reply and Out-of-Office Setup',
    fileUrl: 'https://getit.usc.edu/files/guides/email-out-of-office.pdf',
    fileType: 'pdf',
    category: 'Email & Calendar',
  },
  // Phone & Voicemail
  {
    id: 'sop-009',
    title: 'Desk Phone Guide',
    fileUrl: '',
    fileType: 'pdf',
    category: 'Phone & Voicemail',
  },
  {
    id: 'sop-010',
    title: 'Set Up Voicemail on Desk Phone',
    fileUrl: 'https://getit.usc.edu/files/guides/voicemail-setup.pdf',
    fileType: 'pdf',
    category: 'Phone & Voicemail',
  },
  {
    id: 'sop-011',
    title: 'Voicemail Setup Video Tutorial',
    fileUrl: 'https://getit.usc.edu/files/videos/voicemail-setup.mp4',
    fileType: 'mp4',
    category: 'Phone & Voicemail',
  },
  {
    id: 'sop-012',
    title: 'Forward Desk Phone to Cell Phone',
    fileUrl: 'https://getit.usc.edu/files/guides/phone-forwarding.pdf',
    fileType: 'pdf',
    category: 'Phone & Voicemail',
  },
  {
    id: 'sop-013',
    title: 'Cisco Jabber Softphone Setup Guide',
    fileUrl: 'https://getit.usc.edu/files/guides/cisco-jabber-setup.pdf',
    fileType: 'pdf',
    category: 'Phone & Voicemail',
  },
  // Printing & Scanning
  {
    id: 'sop-014',
    title: 'Install Network Printer (Windows)',
    fileUrl: 'https://getit.usc.edu/files/guides/printer-windows.pdf',
    fileType: 'pdf',
    category: 'Printing & Scanning',
  },
  {
    id: 'sop-015',
    title: 'Install Network Printer (Mac)',
    fileUrl: 'https://getit.usc.edu/files/guides/printer-mac.pdf',
    fileType: 'pdf',
    category: 'Printing & Scanning',
  },
  {
    id: 'sop-016',
    title: 'Scan to Email Using Multifunction Printer',
    fileUrl: 'https://getit.usc.edu/files/guides/scan-to-email.pdf',
    fileType: 'pdf',
    category: 'Printing & Scanning',
  },
  {
    id: 'sop-017',
    title: 'Printer Setup Video Walkthrough',
    fileUrl: 'https://getit.usc.edu/files/videos/printer-setup.mp4',
    fileType: 'mp4',
    category: 'Printing & Scanning',
  },
  // Password & Account
  {
    id: 'sop-018',
    title: 'Reset USC NetID Password',
    fileUrl: 'https://netid.usc.edu/password-reset',
    fileType: 'external',
    category: 'Password & Account',
  },
  {
    id: 'sop-019',
    title: 'Enroll in Duo Two-Factor Authentication',
    fileUrl: 'https://getit.usc.edu/files/guides/duo-enrollment.pdf',
    fileType: 'pdf',
    category: 'Password & Account',
  },
  {
    id: 'sop-020',
    title: 'Add a New Duo Device',
    fileUrl: 'https://getit.usc.edu/files/guides/duo-add-device.pdf',
    fileType: 'pdf',
    category: 'Password & Account',
  },
  {
    id: 'sop-021',
    title: 'Unlock Locked USC Account',
    fileUrl: 'https://getit.usc.edu/services/account-unlock',
    fileType: 'external',
    category: 'Password & Account',
  },
  // Software & Licensing
  {
    id: 'sop-022',
    title: 'Install Microsoft Office 365 (Windows)',
    fileUrl: 'https://getit.usc.edu/files/guides/office365-install-windows.pdf',
    fileType: 'pdf',
    category: 'Software & Licensing',
  },
  {
    id: 'sop-023',
    title: 'Install Microsoft Office 365 (Mac)',
    fileUrl: 'https://getit.usc.edu/files/guides/office365-install-mac.pdf',
    fileType: 'pdf',
    category: 'Software & Licensing',
  },
  {
    id: 'sop-024',
    title: 'Access Adobe Creative Cloud via USC License',
    fileUrl: 'https://getit.usc.edu/files/guides/adobe-cc-usc.pdf',
    fileType: 'pdf',
    category: 'Software & Licensing',
  },
  {
    id: 'sop-025',
    title: 'Software Download Portal',
    fileUrl: 'https://software.usc.edu',
    fileType: 'external',
    category: 'Software & Licensing',
  },
  // Video Conferencing
  {
    id: 'sop-026',
    title: 'Install and Configure Zoom',
    fileUrl: 'https://getit.usc.edu/files/guides/zoom-install.pdf',
    fileType: 'pdf',
    category: 'Video Conferencing',
  },
  {
    id: 'sop-027',
    title: 'Schedule a Zoom Meeting via Outlook',
    fileUrl: 'https://getit.usc.edu/files/guides/zoom-outlook-integration.pdf',
    fileType: 'pdf',
    category: 'Video Conferencing',
  },
  {
    id: 'sop-028',
    title: 'Zoom Webinar Host Guide',
    fileUrl: 'https://getit.usc.edu/files/guides/zoom-webinar-host.pdf',
    fileType: 'pdf',
    category: 'Video Conferencing',
  },
  {
    id: 'sop-029',
    title: 'Microsoft Teams Setup and Usage',
    fileUrl: 'https://getit.usc.edu/files/guides/teams-setup.pdf',
    fileType: 'pdf',
    category: 'Video Conferencing',
  },
  // Storage & File Sharing
  {
    id: 'sop-030',
    title: 'Access and Use USC Google Drive',
    fileUrl: 'https://getit.usc.edu/files/guides/google-drive-usc.pdf',
    fileType: 'pdf',
    category: 'Storage & File Sharing',
  },
  {
    id: 'sop-031',
    title: 'Map Network Drive (Windows)',
    fileUrl: 'https://getit.usc.edu/files/guides/map-network-drive-windows.pdf',
    fileType: 'pdf',
    category: 'Storage & File Sharing',
  },
  {
    id: 'sop-032',
    title: 'Map Network Drive (Mac)',
    fileUrl: 'https://getit.usc.edu/files/guides/map-network-drive-mac.pdf',
    fileType: 'pdf',
    category: 'Storage & File Sharing',
  },
  {
    id: 'sop-033',
    title: 'OneDrive for Business Setup',
    fileUrl: 'https://getit.usc.edu/files/guides/onedrive-business.pdf',
    fileType: 'pdf',
    category: 'Storage & File Sharing',
  },
  // Security
  {
    id: 'sop-034',
    title: 'Encrypt Your Laptop (BitLocker - Windows)',
    fileUrl: 'https://getit.usc.edu/files/guides/bitlocker-encryption.pdf',
    fileType: 'pdf',
    category: 'Security',
  },
  {
    id: 'sop-035',
    title: 'Encrypt Your Laptop (FileVault - Mac)',
    fileUrl: 'https://getit.usc.edu/files/guides/filevault-encryption.pdf',
    fileType: 'pdf',
    category: 'Security',
  },
  {
    id: 'sop-036',
    title: 'Report a Phishing Email',
    fileUrl: 'https://getit.usc.edu/services/report-phishing',
    fileType: 'external',
    category: 'Security',
  },
  {
    id: 'sop-037',
    title: 'Install and Configure CrowdStrike Falcon (Endpoint Protection)',
    fileUrl: 'https://getit.usc.edu/files/guides/crowdstrike-install.pdf',
    fileType: 'pdf',
    category: 'Security',
  },
  // Hardware & Equipment
  {
    id: 'sop-038',
    title: 'Request a Loaner Laptop',
    fileUrl: 'https://getit.usc.edu/services/loaner-laptop',
    fileType: 'external',
    category: 'Hardware & Equipment',
  },
  {
    id: 'sop-039',
    title: 'Set Up Dual Monitors',
    fileUrl: 'https://getit.usc.edu/files/guides/dual-monitor-setup.pdf',
    fileType: 'pdf',
    category: 'Hardware & Equipment',
  },
  {
    id: 'sop-040',
    title: 'Projector and Display Setup in Conference Room',
    fileUrl: 'https://getit.usc.edu/files/guides/conference-room-display.pdf',
    fileType: 'pdf',
    category: 'Hardware & Equipment',
  },
  {
    id: 'sop-041',
    title: 'Conference Room AV Setup Video',
    fileUrl: 'https://getit.usc.edu/files/videos/conference-room-av.mp4',
    fileType: 'mp4',
    category: 'Hardware & Equipment',
  },
  // Remote Work
  {
    id: 'sop-042',
    title: 'Remote Desktop (RDP) Connection Guide',
    fileUrl: 'https://getit.usc.edu/files/guides/remote-desktop-rdp.pdf',
    fileType: 'pdf',
    category: 'Remote Work',
  },
  {
    id: 'sop-043',
    title: 'Work From Home IT Checklist',
    fileUrl: 'https://getit.usc.edu/files/guides/wfh-checklist.pdf',
    fileType: 'pdf',
    category: 'Remote Work',
  },
  // IT Support
  {
    id: 'sop-044',
    title: 'Submit a Help Desk Ticket',
    fileUrl: 'https://getit.usc.edu/help',
    fileType: 'external',
    category: 'IT Support',
  },
  {
    id: 'sop-045',
    title: 'Check IT Service Status and Outages',
    fileUrl: 'https://status.usc.edu',
    fileType: 'external',
    category: 'IT Support',
  },
];
