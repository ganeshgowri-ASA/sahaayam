export interface Service {
  id: string;
  title: string;
  description: string;
  category: "Service";
  url: string;
}

export interface SOP {
  id: string;
  title: string;
  description: string;
  category: "SOP";
  url: string;
}

export interface UsefulLink {
  id: string;
  title: string;
  description: string;
  category: "Useful Link";
  url: string;
}

export interface EscalationTeam {
  id: string;
  title: string;
  description: string;
  category: "Escalation Team";
  url: string;
  email?: string;
}

export const services: Service[] = [
  {
    id: "svc-1",
    title: "Account Unlock",
    description: "Unlock your Active Directory or application account",
    category: "Service",
    url: "/services/account-unlock",
  },
  {
    id: "svc-2",
    title: "Password Reset",
    description: "Reset your network or application password",
    category: "Service",
    url: "/services/password-reset",
  },
  {
    id: "svc-3",
    title: "Software Installation",
    description: "Request installation of approved software",
    category: "Service",
    url: "/services/software-installation",
  },
  {
    id: "svc-4",
    title: "VPN Access",
    description: "Request or troubleshoot VPN access",
    category: "Service",
    url: "/services/vpn-access",
  },
  {
    id: "svc-5",
    title: "New Hardware Request",
    description: "Request laptop, monitor, or peripherals",
    category: "Service",
    url: "/services/hardware-request",
  },
  {
    id: "svc-6",
    title: "Email Configuration",
    description: "Setup or troubleshoot email client",
    category: "Service",
    url: "/services/email-config",
  },
];

export const sops: SOP[] = [
  {
    id: "sop-1",
    title: "Account Unlock SOP",
    description: "Step-by-step guide for unlocking user accounts",
    category: "SOP",
    url: "/sops/account-unlock",
  },
  {
    id: "sop-2",
    title: "Onboarding Checklist",
    description: "IT onboarding steps for new employees",
    category: "SOP",
    url: "/sops/onboarding",
  },
  {
    id: "sop-3",
    title: "Offboarding Procedure",
    description: "IT offboarding and access revocation steps",
    category: "SOP",
    url: "/sops/offboarding",
  },
  {
    id: "sop-4",
    title: "Incident Response SOP",
    description: "Standard procedure for handling IT incidents",
    category: "SOP",
    url: "/sops/incident-response",
  },
  {
    id: "sop-5",
    title: "Data Backup SOP",
    description: "Procedures for data backup and recovery",
    category: "SOP",
    url: "/sops/data-backup",
  },
  {
    id: "sop-6",
    title: "Patch Management SOP",
    description: "Guidelines for applying security patches",
    category: "SOP",
    url: "/sops/patch-management",
  },
];

export const usefulLinks: UsefulLink[] = [
  {
    id: "link-1",
    title: "IT Service Portal",
    description: "Main portal for all IT service requests",
    category: "Useful Link",
    url: "https://itsm.example.com",
  },
  {
    id: "link-2",
    title: "Knowledge Base",
    description: "Self-service articles and FAQs",
    category: "Useful Link",
    url: "https://kb.example.com",
  },
  {
    id: "link-3",
    title: "Asset Inventory",
    description: "View and manage IT assets",
    category: "Useful Link",
    url: "https://assets.example.com",
  },
  {
    id: "link-4",
    title: "Security Policy",
    description: "Company IT security policies and guidelines",
    category: "Useful Link",
    url: "https://policy.example.com/security",
  },
  {
    id: "link-5",
    title: "Approved Software List",
    description: "List of software approved for company use",
    category: "Useful Link",
    url: "https://software.example.com/approved",
  },
];

export const escalationTeams: EscalationTeam[] = [
  {
    id: "team-1",
    title: "L1 Help Desk",
    description: "First-level IT support for basic issues",
    category: "Escalation Team",
    url: "/escalation/l1-helpdesk",
    email: "helpdesk@example.com",
  },
  {
    id: "team-2",
    title: "L2 Network Support",
    description: "Network infrastructure and connectivity issues",
    category: "Escalation Team",
    url: "/escalation/l2-network",
    email: "network-support@example.com",
  },
  {
    id: "team-3",
    title: "L2 Server Team",
    description: "Server administration and virtualization",
    category: "Escalation Team",
    url: "/escalation/l2-server",
    email: "server-team@example.com",
  },
  {
    id: "team-4",
    title: "Security Operations",
    description: "Cybersecurity incidents and compliance",
    category: "Escalation Team",
    url: "/escalation/security-ops",
    email: "secops@example.com",
  },
  {
    id: "team-5",
    title: "Application Support",
    description: "Business application issues and integrations",
    category: "Escalation Team",
    url: "/escalation/app-support",
    email: "app-support@example.com",
  },
];
