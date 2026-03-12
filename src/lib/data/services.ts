export interface Service {
  slug: string;
  name: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: "enterprise-print",
    name: "Enterprise Print",
    description:
      "Managed enterprise printing solutions including setup, maintenance, and support for all office printers, scanners, and multi-function devices across the organization.",
  },
  {
    slug: "remote-vpn",
    name: "Remote VPN",
    description:
      "Secure Virtual Private Network access enabling employees to connect to corporate resources safely from any remote location using encrypted tunnels.",
  },
  {
    slug: "rightfax",
    name: "RightFax",
    description:
      "Enterprise fax server solution that allows users to send and receive faxes directly from their desktops without the need for physical fax machines.",
  },
  {
    slug: "remote-support",
    name: "Remote Support",
    description:
      "IT helpdesk remote assistance service allowing support technicians to troubleshoot and resolve issues on user devices without requiring physical presence.",
  },
  {
    slug: "sharepoint",
    name: "SharePoint",
    description:
      "Microsoft SharePoint collaboration platform for document management, team sites, intranet portals, and workflow automation across the enterprise.",
  },
  {
    slug: "desk-phone",
    name: "Desk Phone",
    description:
      "Corporate desk phone provisioning and support including setup, configuration, voicemail, and troubleshooting for all wired and IP desk phones.",
  },
  {
    slug: "user-provisioning",
    name: "User Provisioning",
    description:
      "Automated user account creation and access provisioning for new employees including email, system access, and application licenses.",
  },
  {
    slug: "biometric",
    name: "Biometric",
    description:
      "Biometric authentication systems including fingerprint scanners and facial recognition for secure facility access and device login.",
  },
  {
    slug: "citrix",
    name: "Citrix",
    description:
      "Citrix virtual desktop and application delivery infrastructure enabling secure remote access to corporate applications from any device.",
  },
  {
    slug: "irm",
    name: "IRM",
    description:
      "Information Rights Management solution for protecting sensitive documents and emails by controlling access, printing, forwarding, and editing permissions.",
  },
  {
    slug: "wannoc",
    name: "WANNOC",
    description:
      "Wide Area Network Network Operations Center monitoring and management service ensuring uptime and performance of WAN connectivity across all sites.",
  },
  {
    slug: "idc-cloud",
    name: "IDC Cloud",
    description:
      "Internal Data Center cloud infrastructure services providing scalable compute, storage, and networking resources for enterprise workloads.",
  },
  {
    slug: "idc-pim",
    name: "IDC PIM",
    description:
      "Internal Data Center Privileged Identity Management for controlling, monitoring, and auditing privileged access to critical infrastructure systems.",
  },
  {
    slug: "idc-system-admin",
    name: "IDC System Admin",
    description:
      "System administration services for the Internal Data Center including server management, patching, configuration, and performance optimization.",
  },
  {
    slug: "user-de-provisioning",
    name: "User De-Provisioning",
    description:
      "Automated offboarding process to revoke system access, disable accounts, and recover assets when employees leave the organization.",
  },
  {
    slug: "services-management",
    name: "Services Management",
    description:
      "IT Service Management platform for handling service requests, incidents, problems, and changes in alignment with ITIL best practices.",
  },
  {
    slug: "avamar-backup",
    name: "Avamar Backup",
    description:
      "Dell EMC Avamar backup and recovery solution providing deduplication-based data protection for virtual, physical, and cloud environments.",
  },
  {
    slug: "external-ftp",
    name: "External FTP",
    description:
      "Secure external FTP/SFTP file transfer service for exchanging large files with external partners, vendors, and clients outside the corporate network.",
  },
  {
    slug: "o3sd",
    name: "O3SD",
    description:
      "O3SD enterprise service delivery platform for managing and automating IT operations, service workflows, and end-to-end service delivery.",
  },
  {
    slug: "it-asset-management",
    name: "IT Asset Management",
    description:
      "Comprehensive IT asset lifecycle management including procurement, tracking, maintenance, and disposal of all hardware and software assets.",
  },
  {
    slug: "skype-audio",
    name: "Skype Audio",
    description:
      "Skype for Business audio conferencing and telephony integration services for internal and external voice communications and meetings.",
  },
  {
    slug: "wpf-field-support",
    name: "WPF Field Support",
    description:
      "Workplace Field Support services providing on-site technical assistance for hardware setup, repairs, and troubleshooting at office locations.",
  },
  {
    slug: "active-directory",
    name: "Active Directory",
    description:
      "Microsoft Active Directory domain services for centralized user authentication, group policies, and access control across the enterprise network.",
  },
  {
    slug: "antivirus",
    name: "Antivirus",
    description:
      "Enterprise antivirus and endpoint protection solution providing real-time threat detection, malware removal, and security policy enforcement.",
  },
  {
    slug: "email-messaging",
    name: "Email Messaging",
    description:
      "Corporate email and messaging services including mailbox provisioning, distribution lists, calendar sharing, and email security management.",
  },
  {
    slug: "mdm",
    name: "MDM",
    description:
      "Mobile Device Management solution for enrolling, configuring, securing, and managing corporate and BYOD mobile devices and tablets.",
  },
  {
    slug: "file-server",
    name: "File Server",
    description:
      "Centralized file server storage services providing shared network drives, access control, and data management for team collaboration.",
  },
  {
    slug: "idc-monitoring",
    name: "IDC Monitoring",
    description:
      "Internal Data Center infrastructure monitoring providing real-time visibility into server health, network performance, and application availability.",
  },
  {
    slug: "idc-provisioning",
    name: "IDC Provisioning",
    description:
      "Internal Data Center resource provisioning services for rapidly deploying servers, storage, and network resources to support business needs.",
  },
  {
    slug: "idc-network-security",
    name: "IDC Network Security",
    description:
      "Internal Data Center network security services including firewall management, intrusion detection, and network access control.",
  },
  {
    slug: "idc-data-management",
    name: "IDC Data Management",
    description:
      "Internal Data Center data management services covering data governance, lifecycle management, archiving, and compliance for enterprise data.",
  },
  {
    slug: "idc-data-protection",
    name: "IDC Data Protection",
    description:
      "Internal Data Center data protection services including encryption, backup, disaster recovery, and business continuity planning.",
  },
  {
    slug: "internet-service",
    name: "Internet Service",
    description:
      "Corporate internet connectivity services including bandwidth management, web filtering, DNS services, and internet access provisioning.",
  },
  {
    slug: "skype-online",
    name: "Skype Online",
    description:
      "Skype for Business Online cloud-based unified communications providing instant messaging, audio/video calling, and online meetings.",
  },
  {
    slug: "enterprise-lan-wifi",
    name: "Enterprise LAN WiFi",
    description:
      "Enterprise wired and wireless network infrastructure services including LAN provisioning, Wi-Fi access point management, and network troubleshooting.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
