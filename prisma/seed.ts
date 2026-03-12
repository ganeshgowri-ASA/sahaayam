import { PrismaClient, Role, RequestType, RequestStatus, RequestPriority, AnnouncementType } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Users ───────────────────────────────────────────────────────────────

  const passwordHash = await bcrypt.hash("Password@123", 10);
  const adminPasswordHash = await bcrypt.hash("Admin@123", 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { employeeId: "EMP001" },
      update: {},
      create: {
        employeeId: "EMP001",
        name: "Ravi Kumar",
        email: "ravi.kumar@company.com",
        password: passwordHash,
        role: Role.EMPLOYEE,
        department: "Finance",
        state: "Maharashtra",
        city: "Mumbai",
        hostname: "WS-MUM-001",
        ipAddress: "10.0.1.101",
      },
    }),
    prisma.user.upsert({
      where: { employeeId: "EMP002" },
      update: {},
      create: {
        employeeId: "EMP002",
        name: "Priya Sharma",
        email: "priya.sharma@company.com",
        password: adminPasswordHash,
        role: Role.IT_ADMIN,
        department: "IT",
        state: "Karnataka",
        city: "Bengaluru",
        hostname: "WS-BLR-002",
        ipAddress: "10.0.2.102",
      },
    }),
    prisma.user.upsert({
      where: { employeeId: "EMP003" },
      update: {},
      create: {
        employeeId: "EMP003",
        name: "Anand Krishnan",
        email: "anand.krishnan@company.com",
        password: adminPasswordHash,
        role: Role.SUPER_ADMIN,
        department: "IT",
        state: "Tamil Nadu",
        city: "Chennai",
        hostname: "WS-CHE-003",
        ipAddress: "10.0.3.103",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // ─── IT Services (34) ────────────────────────────────────────────────────

  const servicesData = [
    { name: "Password Reset", slug: "password-reset", category: "Account Management", isTop: true, sortOrder: 1, externalUrl: "https://selfservice.company.com/password-reset", description: "Reset your Active Directory password securely." },
    { name: "New User Account", slug: "new-user-account", category: "Account Management", isTop: true, sortOrder: 2, externalUrl: "https://selfservice.company.com/new-account", description: "Request a new user account for a new employee." },
    { name: "Software Installation", slug: "software-installation", category: "Software", isTop: true, sortOrder: 3, externalUrl: "https://selfservice.company.com/software", description: "Request installation of approved software." },
    { name: "VPN Access", slug: "vpn-access", category: "Network & Connectivity", isTop: true, sortOrder: 4, externalUrl: "https://vpn.company.com", description: "Request or troubleshoot VPN access." },
    { name: "Email Setup", slug: "email-setup", category: "Communication", isTop: true, sortOrder: 5, externalUrl: "https://outlook.company.com", description: "Configure your company email on devices." },
    { name: "Laptop Request", slug: "laptop-request", category: "Hardware", isTop: false, sortOrder: 6, externalUrl: "https://selfservice.company.com/hardware", description: "Request a new laptop or replacement." },
    { name: "Desktop Request", slug: "desktop-request", category: "Hardware", isTop: false, sortOrder: 7, externalUrl: "https://selfservice.company.com/hardware", description: "Request a desktop computer." },
    { name: "Printer Setup", slug: "printer-setup", category: "Hardware", isTop: false, sortOrder: 8, externalUrl: "https://selfservice.company.com/printer", description: "Setup or troubleshoot printer access." },
    { name: "SAP Access", slug: "sap-access", category: "ERP", isTop: true, sortOrder: 9, externalUrl: "https://sap.company.com", description: "Request access to SAP modules." },
    { name: "SAP Password Reset", slug: "sap-password-reset", category: "ERP", isTop: false, sortOrder: 10, externalUrl: "https://sap.company.com/password", description: "Reset your SAP system password." },
    { name: "Internet Access", slug: "internet-access", category: "Network & Connectivity", isTop: false, sortOrder: 11, externalUrl: "https://selfservice.company.com/internet", description: "Request internet access or whitelist URLs." },
    { name: "Shared Drive Access", slug: "shared-drive-access", category: "Storage", isTop: false, sortOrder: 12, externalUrl: "https://selfservice.company.com/drives", description: "Request access to shared network drives." },
    { name: "Mobile Device Management", slug: "mobile-device-management", category: "Mobile", isTop: false, sortOrder: 13, externalUrl: "https://mdm.company.com", description: "Enroll or manage mobile devices." },
    { name: "Data Backup & Recovery", slug: "data-backup-recovery", category: "Storage", isTop: false, sortOrder: 14, externalUrl: "https://selfservice.company.com/backup", description: "Request data backup or file recovery." },
    { name: "Video Conferencing Setup", slug: "video-conferencing-setup", category: "Communication", isTop: false, sortOrder: 15, externalUrl: "https://teams.microsoft.com", description: "Setup Microsoft Teams or Zoom." },
    { name: "IT Asset Return", slug: "it-asset-return", category: "Hardware", isTop: false, sortOrder: 16, externalUrl: "https://selfservice.company.com/asset-return", description: "Return IT assets when leaving or upgrading." },
    { name: "Access Card Request", slug: "access-card-request", category: "Security", isTop: false, sortOrder: 17, externalUrl: "https://selfservice.company.com/access-card", description: "Request physical access card for premises." },
    { name: "Firewall Rule Request", slug: "firewall-rule-request", category: "Network & Connectivity", isTop: false, sortOrder: 18, externalUrl: "https://selfservice.company.com/firewall", description: "Request new firewall rules or port openings." },
    { name: "SSL Certificate Request", slug: "ssl-certificate-request", category: "Security", isTop: false, sortOrder: 19, externalUrl: "https://selfservice.company.com/ssl", description: "Request SSL/TLS certificates for applications." },
    { name: "Database Access", slug: "database-access", category: "Database", isTop: false, sortOrder: 20, externalUrl: "https://selfservice.company.com/database", description: "Request access to company databases." },
    { name: "Application Deployment", slug: "application-deployment", category: "Software", isTop: false, sortOrder: 21, externalUrl: "https://selfservice.company.com/deploy", description: "Request deployment of applications." },
    { name: "Cloud Storage Request", slug: "cloud-storage-request", category: "Storage", isTop: false, sortOrder: 22, externalUrl: "https://onedrive.company.com", description: "Request cloud storage allocation." },
    { name: "IT Training Request", slug: "it-training-request", category: "Training", isTop: false, sortOrder: 23, externalUrl: "https://selfservice.company.com/training", description: "Request IT training sessions." },
    { name: "Antivirus Update", slug: "antivirus-update", category: "Security", isTop: false, sortOrder: 24, externalUrl: "https://selfservice.company.com/antivirus", description: "Update or troubleshoot antivirus software." },
    { name: "Network Drive Mapping", slug: "network-drive-mapping", category: "Network & Connectivity", isTop: false, sortOrder: 25, externalUrl: "https://selfservice.company.com/drives", description: "Map network drives to your workstation." },
    { name: "Telephony Request", slug: "telephony-request", category: "Communication", isTop: false, sortOrder: 26, externalUrl: "https://selfservice.company.com/telephony", description: "Request telephone extensions or IP phones." },
    { name: "Software License Request", slug: "software-license-request", category: "Software", isTop: false, sortOrder: 27, externalUrl: "https://selfservice.company.com/licenses", description: "Request additional software licenses." },
    { name: "Workstation Rebuild", slug: "workstation-rebuild", category: "Hardware", isTop: false, sortOrder: 28, externalUrl: "https://selfservice.company.com/rebuild", description: "Request OS rebuild or reimaging." },
    { name: "Remote Desktop Access", slug: "remote-desktop-access", category: "Network & Connectivity", isTop: false, sortOrder: 29, externalUrl: "https://selfservice.company.com/remote", description: "Request remote desktop access." },
    { name: "IT Audit Support", slug: "it-audit-support", category: "Compliance", isTop: false, sortOrder: 30, externalUrl: "https://selfservice.company.com/audit", description: "Request IT support for audit activities." },
    { name: "User Account Deactivation", slug: "user-account-deactivation", category: "Account Management", isTop: false, sortOrder: 31, externalUrl: "https://selfservice.company.com/deactivate", description: "Deactivate user accounts for exits." },
    { name: "Group Policy Exception", slug: "group-policy-exception", category: "Account Management", isTop: false, sortOrder: 32, externalUrl: "https://selfservice.company.com/gpo", description: "Request exceptions to group policies." },
    { name: "IT Procurement Request", slug: "it-procurement-request", category: "Hardware", isTop: false, sortOrder: 33, externalUrl: "https://selfservice.company.com/procurement", description: "Initiate IT hardware procurement." },
    { name: "System Performance Issue", slug: "system-performance-issue", category: "Incident", isTop: false, sortOrder: 34, externalUrl: "https://selfservice.company.com/incident", description: "Report system performance or slowness issues." },
  ];

  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: servicesData });
  console.log(`✅ Created ${servicesData.length} services`);

  // ─── SOP Documents (40+) ─────────────────────────────────────────────────

  const sopData = [
    { title: "How to Reset AD Password", slug: "how-to-reset-ad-password", fileUrl: "/sops/reset-ad-password.pdf", fileType: "pdf", category: "Account Management", sortOrder: 1 },
    { title: "VPN Setup Guide - Windows", slug: "vpn-setup-windows", fileUrl: "/sops/vpn-setup-windows.pdf", fileType: "pdf", category: "Network & Connectivity", sortOrder: 2 },
    { title: "VPN Setup Guide - Mac", slug: "vpn-setup-mac", fileUrl: "/sops/vpn-setup-mac.pdf", fileType: "pdf", category: "Network & Connectivity", sortOrder: 3 },
    { title: "SAP Logon Configuration", slug: "sap-logon-configuration", fileUrl: "/sops/sap-logon-config.pdf", fileType: "pdf", category: "ERP", sortOrder: 4 },
    { title: "SAP Password Reset Procedure", slug: "sap-password-reset-procedure", fileUrl: "/sops/sap-password-reset.pdf", fileType: "pdf", category: "ERP", sortOrder: 5 },
    { title: "Microsoft Teams Setup Guide", slug: "teams-setup-guide", fileUrl: "/sops/teams-setup.pdf", fileType: "pdf", category: "Communication", sortOrder: 6 },
    { title: "Outlook Email Configuration", slug: "outlook-email-configuration", fileUrl: "/sops/outlook-config.pdf", fileType: "pdf", category: "Communication", sortOrder: 7 },
    { title: "New Employee IT Onboarding", slug: "new-employee-it-onboarding", fileUrl: "/sops/it-onboarding.pdf", fileType: "pdf", category: "Onboarding", sortOrder: 8 },
    { title: "Laptop Handover Process", slug: "laptop-handover-process", fileUrl: "/sops/laptop-handover.pdf", fileType: "pdf", category: "Hardware", sortOrder: 9 },
    { title: "Data Backup SOP", slug: "data-backup-sop", fileUrl: "/sops/data-backup.pdf", fileType: "pdf", category: "Storage", sortOrder: 10 },
    { title: "Antivirus Installation Guide", slug: "antivirus-installation-guide", fileUrl: "/sops/antivirus-install.pdf", fileType: "pdf", category: "Security", sortOrder: 11 },
    { title: "Software Request Process", slug: "software-request-process", fileUrl: "/sops/software-request.pdf", fileType: "pdf", category: "Software", sortOrder: 12 },
    { title: "Printer Installation Guide", slug: "printer-installation-guide", fileUrl: "/sops/printer-install.pdf", fileType: "pdf", category: "Hardware", sortOrder: 13 },
    { title: "Network Drive Mapping Guide", slug: "network-drive-mapping-guide", fileUrl: "/sops/network-drive.pdf", fileType: "pdf", category: "Network & Connectivity", sortOrder: 14 },
    { title: "Mobile Device Enrollment", slug: "mobile-device-enrollment", fileUrl: "/sops/mdm-enrollment.pdf", fileType: "pdf", category: "Mobile", sortOrder: 15 },
    { title: "Remote Desktop Access Setup", slug: "remote-desktop-access-setup", fileUrl: "/sops/remote-desktop.pdf", fileType: "pdf", category: "Network & Connectivity", sortOrder: 16 },
    { title: "IT Asset Return Process", slug: "it-asset-return-process", fileUrl: "/sops/asset-return.pdf", fileType: "pdf", category: "Hardware", sortOrder: 17 },
    { title: "Cloud Storage - OneDrive Guide", slug: "onedrive-guide", fileUrl: "/sops/onedrive.pdf", fileType: "pdf", category: "Storage", sortOrder: 18 },
    { title: "SSL Certificate Request Process", slug: "ssl-certificate-request-process", fileUrl: "/sops/ssl-cert.pdf", fileType: "pdf", category: "Security", sortOrder: 19 },
    { title: "Firewall Rule Request Guide", slug: "firewall-rule-request-guide", fileUrl: "/sops/firewall-rule.pdf", fileType: "pdf", category: "Network & Connectivity", sortOrder: 20 },
    { title: "User Account Deactivation SOP", slug: "user-account-deactivation-sop", fileUrl: "/sops/account-deactivation.pdf", fileType: "pdf", category: "Account Management", sortOrder: 21 },
    { title: "IT Security Policy", slug: "it-security-policy", fileUrl: "/sops/security-policy.pdf", fileType: "pdf", category: "Compliance", sortOrder: 22 },
    { title: "Password Policy Guidelines", slug: "password-policy-guidelines", fileUrl: "/sops/password-policy.pdf", fileType: "pdf", category: "Security", sortOrder: 23 },
    { title: "Acceptable Use Policy", slug: "acceptable-use-policy", fileUrl: "/sops/acceptable-use.pdf", fileType: "pdf", category: "Compliance", sortOrder: 24 },
    { title: "Incident Reporting Procedure", slug: "incident-reporting-procedure", fileUrl: "/sops/incident-reporting.pdf", fileType: "pdf", category: "Incident Management", sortOrder: 25 },
    { title: "Database Access Request SOP", slug: "database-access-request-sop", fileUrl: "/sops/db-access.pdf", fileType: "pdf", category: "Database", sortOrder: 26 },
    { title: "Workstation Rebuild Guide", slug: "workstation-rebuild-guide", fileUrl: "/sops/workstation-rebuild.pdf", fileType: "pdf", category: "Hardware", sortOrder: 27 },
    { title: "Group Policy Exception Process", slug: "group-policy-exception-process", fileUrl: "/sops/gpo-exception.pdf", fileType: "pdf", category: "Account Management", sortOrder: 28 },
    { title: "IT Procurement Guidelines", slug: "it-procurement-guidelines", fileUrl: "/sops/it-procurement.pdf", fileType: "pdf", category: "Hardware", sortOrder: 29 },
    { title: "Telephony Setup Guide", slug: "telephony-setup-guide", fileUrl: "/sops/telephony-setup.pdf", fileType: "pdf", category: "Communication", sortOrder: 30 },
    { title: "Video Conferencing Best Practices", slug: "video-conferencing-best-practices", fileUrl: "/sops/vc-best-practices.pdf", fileType: "pdf", category: "Communication", sortOrder: 31 },
    { title: "SAP MM Module User Guide", slug: "sap-mm-module-user-guide", fileUrl: "/sops/sap-mm.pdf", fileType: "pdf", category: "ERP", sortOrder: 32 },
    { title: "SAP FI Module User Guide", slug: "sap-fi-module-user-guide", fileUrl: "/sops/sap-fi.pdf", fileType: "pdf", category: "ERP", sortOrder: 33 },
    { title: "SAP HR Module User Guide", slug: "sap-hr-module-user-guide", fileUrl: "/sops/sap-hr.pdf", fileType: "pdf", category: "ERP", sortOrder: 34 },
    { title: "Internet Proxy Settings", slug: "internet-proxy-settings", fileUrl: "/sops/proxy-settings.pdf", fileType: "pdf", category: "Network & Connectivity", sortOrder: 35 },
    { title: "IT Exit Process Guide", slug: "it-exit-process-guide", fileUrl: "/sops/it-exit-process.pdf", fileType: "pdf", category: "Onboarding", sortOrder: 36 },
    { title: "Multi-Factor Authentication Setup", slug: "mfa-setup", fileUrl: "/sops/mfa-setup.pdf", fileType: "pdf", category: "Security", sortOrder: 37 },
    { title: "IT Helpdesk Ticket Guide", slug: "it-helpdesk-ticket-guide", fileUrl: "/sops/helpdesk-ticket.pdf", fileType: "pdf", category: "Incident Management", sortOrder: 38 },
    { title: "SharePoint Access Guide", slug: "sharepoint-access-guide", fileUrl: "/sops/sharepoint.pdf", fileType: "pdf", category: "Storage", sortOrder: 39 },
    { title: "BYOD Policy & Setup", slug: "byod-policy-setup", fileUrl: "/sops/byod.pdf", fileType: "pdf", category: "Mobile", sortOrder: 40 },
    { title: "IT Disaster Recovery Plan", slug: "it-disaster-recovery-plan", fileUrl: "/sops/dr-plan.pdf", fileType: "pdf", category: "Compliance", sortOrder: 41 },
  ];

  await prisma.sopDocument.deleteMany();
  await prisma.sopDocument.createMany({ data: sopData });
  console.log(`✅ Created ${sopData.length} SOP documents`);

  // ─── Useful Links (48+) ──────────────────────────────────────────────────

  const usefulLinksData = [
    { title: "SAP Portal", slug: "sap-portal", externalUrl: "https://sap.company.com", category: "ERP", isTop: true, sortOrder: 1, description: "Access SAP enterprise applications." },
    { title: "Self-Service Portal", slug: "self-service-portal", externalUrl: "https://selfservice.company.com", category: "IT Services", isTop: true, sortOrder: 2, description: "Raise IT requests and track status." },
    { title: "Microsoft Teams", slug: "microsoft-teams", externalUrl: "https://teams.microsoft.com", category: "Communication", isTop: true, sortOrder: 3, description: "Company collaboration and video calling." },
    { title: "Outlook Web Mail", slug: "outlook-web-mail", externalUrl: "https://outlook.company.com", category: "Communication", isTop: true, sortOrder: 4, description: "Access company email via browser." },
    { title: "OneDrive", slug: "onedrive", externalUrl: "https://onedrive.company.com", category: "Storage", isTop: true, sortOrder: 5, description: "Personal cloud storage." },
    { title: "SharePoint Intranet", slug: "sharepoint-intranet", externalUrl: "https://intranet.company.com", category: "Intranet", isTop: true, sortOrder: 6, description: "Company intranet and knowledge base." },
    { title: "HR Portal", slug: "hr-portal", externalUrl: "https://hr.company.com", category: "HR", isTop: true, sortOrder: 7, description: "Leave management, payslips, HR requests." },
    { title: "IT Helpdesk", slug: "it-helpdesk", externalUrl: "https://helpdesk.company.com", category: "IT Services", isTop: true, sortOrder: 8, description: "Log and track IT support tickets." },
    { title: "VPN Client", slug: "vpn-client", externalUrl: "https://vpn.company.com", category: "Network & Connectivity", isTop: false, sortOrder: 9, description: "Secure remote access to company network." },
    { title: "Password Manager", slug: "password-manager", externalUrl: "https://pwd.company.com", category: "Security", isTop: false, sortOrder: 10, description: "Enterprise password management." },
    { title: "Zoom", slug: "zoom", externalUrl: "https://zoom.us", category: "Communication", isTop: false, sortOrder: 11, description: "Video conferencing platform." },
    { title: "GitHub Enterprise", slug: "github-enterprise", externalUrl: "https://github.company.com", category: "Development", isTop: false, sortOrder: 12, description: "Code repository and version control." },
    { title: "JIRA", slug: "jira", externalUrl: "https://jira.company.com", category: "Development", isTop: false, sortOrder: 13, description: "Project and issue tracking." },
    { title: "Confluence", slug: "confluence", externalUrl: "https://confluence.company.com", category: "Documentation", isTop: false, sortOrder: 14, description: "Team documentation and wikis." },
    { title: "ServiceNow", slug: "servicenow", externalUrl: "https://servicenow.company.com", category: "IT Services", isTop: false, sortOrder: 15, description: "ITSM and service management platform." },
    { title: "AWS Console", slug: "aws-console", externalUrl: "https://console.aws.amazon.com", category: "Cloud", isTop: false, sortOrder: 16, description: "Amazon Web Services management console." },
    { title: "Azure Portal", slug: "azure-portal", externalUrl: "https://portal.azure.com", category: "Cloud", isTop: false, sortOrder: 17, description: "Microsoft Azure management portal." },
    { title: "Power BI", slug: "power-bi", externalUrl: "https://powerbi.company.com", category: "Analytics", isTop: false, sortOrder: 18, description: "Business intelligence and reporting." },
    { title: "Tableau", slug: "tableau", externalUrl: "https://tableau.company.com", category: "Analytics", isTop: false, sortOrder: 19, description: "Data visualization and analytics." },
    { title: "IT Policies & Guidelines", slug: "it-policies", externalUrl: "https://intranet.company.com/it-policies", category: "Compliance", isTop: false, sortOrder: 20, description: "Company IT policies documentation." },
    { title: "Benefits Portal", slug: "benefits-portal", externalUrl: "https://benefits.company.com", category: "HR", isTop: false, sortOrder: 21, description: "Employee benefits management." },
    { title: "Learning Management System", slug: "lms", externalUrl: "https://lms.company.com", category: "Training", isTop: false, sortOrder: 22, description: "Online training and courses." },
    { title: "Payroll Portal", slug: "payroll-portal", externalUrl: "https://payroll.company.com", category: "HR", isTop: false, sortOrder: 23, description: "Payslips and payroll information." },
    { title: "Travel & Expense", slug: "travel-expense", externalUrl: "https://travel.company.com", category: "Finance", isTop: false, sortOrder: 24, description: "Travel booking and expense claims." },
    { title: "Procurement Portal", slug: "procurement-portal", externalUrl: "https://procurement.company.com", category: "Finance", isTop: false, sortOrder: 25, description: "Vendor and purchase management." },
    { title: "Asset Management", slug: "asset-management", externalUrl: "https://assets.company.com", category: "IT Services", isTop: false, sortOrder: 26, description: "IT asset tracking and management." },
    { title: "SSL Certificate Authority", slug: "ssl-ca", externalUrl: "https://ca.company.com", category: "Security", isTop: false, sortOrder: 27, description: "Internal certificate authority." },
    { title: "Network Monitoring", slug: "network-monitoring", externalUrl: "https://netmon.company.com", category: "Network & Connectivity", isTop: false, sortOrder: 28, description: "Network performance monitoring." },
    { title: "Log Management (Splunk)", slug: "splunk", externalUrl: "https://splunk.company.com", category: "Security", isTop: false, sortOrder: 29, description: "Log aggregation and security analytics." },
    { title: "Vulnerability Scanner", slug: "vulnerability-scanner", externalUrl: "https://vuln.company.com", category: "Security", isTop: false, sortOrder: 30, description: "Security vulnerability scanning." },
    { title: "Company Org Chart", slug: "org-chart", externalUrl: "https://intranet.company.com/org-chart", category: "Intranet", isTop: false, sortOrder: 31, description: "Company organizational structure." },
    { title: "IT Roadmap", slug: "it-roadmap", externalUrl: "https://intranet.company.com/it-roadmap", category: "IT Services", isTop: false, sortOrder: 32, description: "IT department roadmap and projects." },
    { title: "Backup & Recovery Portal", slug: "backup-recovery", externalUrl: "https://backup.company.com", category: "Storage", isTop: false, sortOrder: 33, description: "Data backup status and recovery." },
    { title: "DevOps Portal", slug: "devops-portal", externalUrl: "https://devops.company.com", category: "Development", isTop: false, sortOrder: 34, description: "CI/CD pipelines and deployments." },
    { title: "SAP Solution Manager", slug: "sap-solution-manager", externalUrl: "https://solman.company.com", category: "ERP", isTop: false, sortOrder: 35, description: "SAP support and change management." },
    { title: "Change Management Portal", slug: "change-management", externalUrl: "https://change.company.com", category: "IT Services", isTop: false, sortOrder: 36, description: "IT change request management." },
    { title: "Intranet News", slug: "intranet-news", externalUrl: "https://news.company.com", category: "Intranet", isTop: false, sortOrder: 37, description: "Company news and announcements." },
    { title: "Meeting Room Booking", slug: "meeting-room-booking", externalUrl: "https://rooms.company.com", category: "Facilities", isTop: false, sortOrder: 38, description: "Book conference and meeting rooms." },
    { title: "Visitor Management", slug: "visitor-management", externalUrl: "https://visitor.company.com", category: "Facilities", isTop: false, sortOrder: 39, description: "Register and manage visitors." },
    { title: "Print Management", slug: "print-management", externalUrl: "https://print.company.com", category: "Hardware", isTop: false, sortOrder: 40, description: "Manage and track printing." },
    { title: "IT Newsletter", slug: "it-newsletter", externalUrl: "https://newsletter.company.com/it", category: "Intranet", isTop: false, sortOrder: 41, description: "Monthly IT newsletter." },
    { title: "Vendor Portal", slug: "vendor-portal", externalUrl: "https://vendor.company.com", category: "Finance", isTop: false, sortOrder: 42, description: "Vendor onboarding and management." },
    { title: "Employee Directory", slug: "employee-directory", externalUrl: "https://directory.company.com", category: "Intranet", isTop: false, sortOrder: 43, description: "Search and find employees." },
    { title: "IT Status Page", slug: "it-status-page", externalUrl: "https://status.company.com", category: "IT Services", isTop: false, sortOrder: 44, description: "Current IT systems status." },
    { title: "Cybersecurity Portal", slug: "cybersecurity-portal", externalUrl: "https://security.company.com", category: "Security", isTop: false, sortOrder: 45, description: "Security awareness and reporting." },
    { title: "Data Classification Guide", slug: "data-classification", externalUrl: "https://intranet.company.com/data-classification", category: "Compliance", isTop: false, sortOrder: 46, description: "Data sensitivity and handling." },
    { title: "SAP Fiori Launchpad", slug: "sap-fiori-launchpad", externalUrl: "https://fiori.company.com", category: "ERP", isTop: false, sortOrder: 47, description: "SAP Fiori modern UI portal." },
    { title: "Business Intelligence Hub", slug: "bi-hub", externalUrl: "https://bi.company.com", category: "Analytics", isTop: false, sortOrder: 48, description: "Centralized analytics and reports hub." },
  ];

  await prisma.usefulLink.deleteMany();
  await prisma.usefulLink.createMany({ data: usefulLinksData });
  console.log(`✅ Created ${usefulLinksData.length} useful links`);

  // ─── Quick Actions (12) ───────────────────────────────────────────────────

  const quickActionsData = [
    { title: "Reset Password", icon: "KeyRound", actionUrl: "/services/password-reset", color: "#3B82F6", sortOrder: 1 },
    { title: "Raise IT Ticket", icon: "TicketPlus", actionUrl: "/requests/new", color: "#10B981", sortOrder: 2 },
    { title: "SAP Access", icon: "Database", actionUrl: "/services/sap-access", color: "#8B5CF6", sortOrder: 3 },
    { title: "VPN Help", icon: "ShieldCheck", actionUrl: "/services/vpn-access", color: "#F59E0B", sortOrder: 4 },
    { title: "Software Request", icon: "PackagePlus", actionUrl: "/services/software-installation", color: "#EF4444", sortOrder: 5 },
    { title: "Contact IT", icon: "Phone", actionUrl: "/escalation", color: "#6366F1", sortOrder: 6 },
    { title: "View SOPs", icon: "BookOpen", actionUrl: "/sops", color: "#14B8A6", sortOrder: 7 },
    { title: "Useful Links", icon: "Link", actionUrl: "/links", color: "#F97316", sortOrder: 8 },
    { title: "Hardware Request", icon: "Monitor", actionUrl: "/services/laptop-request", color: "#84CC16", sortOrder: 9 },
    { title: "My Requests", icon: "ClipboardList", actionUrl: "/requests", color: "#EC4899", sortOrder: 10 },
    { title: "IT Announcements", icon: "Bell", actionUrl: "/announcements", color: "#0EA5E9", sortOrder: 11 },
    { title: "Email Support", icon: "Mail", actionUrl: "mailto:itsupport@company.com", color: "#A855F7", sortOrder: 12 },
  ];

  await prisma.quickAction.deleteMany();
  await prisma.quickAction.createMany({ data: quickActionsData });
  console.log(`✅ Created ${quickActionsData.length} quick actions`);

  // ─── SAP Logon Files (11) ─────────────────────────────────────────────────

  const sapLogonData = [
    { title: "SAP Logon 750 - Production", version: "7.50", fileUrl: "/sap/saplogon-750-prod.zip", sortOrder: 1 },
    { title: "SAP Logon 750 - Quality", version: "7.50", fileUrl: "/sap/saplogon-750-qa.zip", sortOrder: 2 },
    { title: "SAP Logon 750 - Development", version: "7.50", fileUrl: "/sap/saplogon-750-dev.zip", sortOrder: 3 },
    { title: "SAP Logon 770 - Production", version: "7.70", fileUrl: "/sap/saplogon-770-prod.zip", sortOrder: 4 },
    { title: "SAP Logon 770 - Quality", version: "7.70", fileUrl: "/sap/saplogon-770-qa.zip", sortOrder: 5 },
    { title: "SAP GUI Patch 7.50 PL4", version: "7.50 PL4", fileUrl: "/sap/sapgui-750-pl4.exe", sortOrder: 6 },
    { title: "SAP GUI Patch 7.70 PL2", version: "7.70 PL2", fileUrl: "/sap/sapgui-770-pl2.exe", sortOrder: 7 },
    { title: "SAP Logon Config - Mumbai DC", version: "7.50", fileUrl: "/sap/saplogon-mumbai.ini", sortOrder: 8 },
    { title: "SAP Logon Config - Chennai DC", version: "7.50", fileUrl: "/sap/saplogon-chennai.ini", sortOrder: 9 },
    { title: "SAP Business Client 6.5", version: "6.5", fileUrl: "/sap/sapclient-6.5.exe", sortOrder: 10 },
    { title: "SAP Fiori Client Mobile App Guide", version: "1.0", fileUrl: "/sap/fiori-mobile-guide.pdf", sortOrder: 11 },
  ];

  await prisma.sapLogonFile.deleteMany();
  await prisma.sapLogonFile.createMany({ data: sapLogonData });
  console.log(`✅ Created ${sapLogonData.length} SAP logon files`);

  // ─── Announcements (3) ────────────────────────────────────────────────────

  const now = new Date();

  await prisma.announcement.deleteMany();
  await prisma.announcement.createMany({
    data: [
      {
        title: "Scheduled Maintenance - SAP Systems",
        content: "SAP production systems will undergo scheduled maintenance on Sunday, 15th March 2026 from 12:00 AM to 6:00 AM IST. Please plan your work accordingly. For urgent issues during this window, contact the SAP emergency helpdesk at +91-22-6600-9999.",
        type: AnnouncementType.BANNER,
        isActive: true,
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      },
      {
        title: "New IT Self-Service Portal Launch",
        content: "We are excited to announce the launch of our new IT Self-Service Portal - Sahaayam! You can now raise IT requests, view SOPs, find escalation contacts, and access all IT resources from a single platform. Explore the portal and provide your feedback to itfeedback@company.com.",
        type: AnnouncementType.POPUP,
        isActive: true,
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        endDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
      },
      {
        title: "Security Alert: Phishing Campaign Detected",
        content: "Our security team has detected an active phishing campaign targeting company employees. Do NOT click on links in emails asking for your password or personal information. Report suspicious emails to security@company.com immediately.",
        type: AnnouncementType.TICKER,
        isActive: true,
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      },
    ],
  });
  console.log(`✅ Created 3 announcements`);

  // ─── Escalation Teams (38+) with 3-level contacts ─────────────────────────

  const escalationTeamsData = [
    {
      teamName: "IT Service Desk - Mumbai",
      slug: "it-service-desk-mumbai",
      isTop: true,
      sortOrder: 1,
      contacts: [
        { level: 1, name: "Rajesh Nair", landline: "+91-22-6600-1001", mobile: "+91-9820001001", email: "rajesh.nair@company.com" },
        { level: 2, name: "Meera Pillai", landline: "+91-22-6600-1002", mobile: "+91-9820001002", email: "meera.pillai@company.com" },
        { level: 3, name: "Suresh Menon", landline: "+91-22-6600-1003", mobile: "+91-9820001003", email: "suresh.menon@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Bengaluru",
      slug: "it-service-desk-bengaluru",
      isTop: true,
      sortOrder: 2,
      contacts: [
        { level: 1, name: "Karthik Rao", landline: "+91-80-6600-2001", mobile: "+91-9980002001", email: "karthik.rao@company.com" },
        { level: 2, name: "Sowmya Kumar", landline: "+91-80-6600-2002", mobile: "+91-9980002002", email: "sowmya.kumar@company.com" },
        { level: 3, name: "Venkat Reddy", landline: "+91-80-6600-2003", mobile: "+91-9980002003", email: "venkat.reddy@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Chennai",
      slug: "it-service-desk-chennai",
      isTop: true,
      sortOrder: 3,
      contacts: [
        { level: 1, name: "Senthil Kumar", landline: "+91-44-6600-3001", mobile: "+91-9444003001", email: "senthil.kumar@company.com" },
        { level: 2, name: "Lakshmi Narayan", landline: "+91-44-6600-3002", mobile: "+91-9444003002", email: "lakshmi.narayan@company.com" },
        { level: 3, name: "Arjun Krishnan", landline: "+91-44-6600-3003", mobile: "+91-9444003003", email: "arjun.krishnan@company.com" },
      ],
    },
    {
      teamName: "SAP Basis Team",
      slug: "sap-basis-team",
      isTop: true,
      sortOrder: 4,
      contacts: [
        { level: 1, name: "Praveen Shetty", landline: "+91-22-6600-4001", mobile: "+91-9820004001", email: "praveen.shetty@company.com" },
        { level: 2, name: "Anita Desai", landline: "+91-22-6600-4002", mobile: "+91-9820004002", email: "anita.desai@company.com" },
        { level: 3, name: "Rakesh Joshi", landline: "+91-22-6600-4003", mobile: "+91-9820004003", email: "rakesh.joshi@company.com" },
      ],
    },
    {
      teamName: "Network Operations Center",
      slug: "network-operations-center",
      isTop: true,
      sortOrder: 5,
      contacts: [
        { level: 1, name: "Dinesh Patel", landline: "+91-22-6600-5001", mobile: "+91-9820005001", email: "dinesh.patel@company.com" },
        { level: 2, name: "Rohit Sharma", landline: "+91-22-6600-5002", mobile: "+91-9820005002", email: "rohit.sharma@company.com" },
        { level: 3, name: "Amit Singh", landline: "+91-22-6600-5003", mobile: "+91-9820005003", email: "amit.singh@company.com" },
      ],
    },
    {
      teamName: "Cybersecurity Team",
      slug: "cybersecurity-team",
      isTop: true,
      sortOrder: 6,
      contacts: [
        { level: 1, name: "Vikram Mehta", landline: "+91-22-6600-6001", mobile: "+91-9820006001", email: "vikram.mehta@company.com" },
        { level: 2, name: "Neha Gupta", landline: "+91-22-6600-6002", mobile: "+91-9820006002", email: "neha.gupta@company.com" },
        { level: 3, name: "Sanjay Kapoor", landline: "+91-22-6600-6003", mobile: "+91-9820006003", email: "sanjay.kapoor@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Delhi",
      slug: "it-service-desk-delhi",
      isTop: false,
      sortOrder: 7,
      contacts: [
        { level: 1, name: "Ramesh Chauhan", landline: "+91-11-6600-7001", mobile: "+91-9810007001", email: "ramesh.chauhan@company.com" },
        { level: 2, name: "Sunita Verma", landline: "+91-11-6600-7002", mobile: "+91-9810007002", email: "sunita.verma@company.com" },
        { level: 3, name: "Manoj Kumar", landline: "+91-11-6600-7003", mobile: "+91-9810007003", email: "manoj.kumar@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Hyderabad",
      slug: "it-service-desk-hyderabad",
      isTop: false,
      sortOrder: 8,
      contacts: [
        { level: 1, name: "Ravi Shankar", landline: "+91-40-6600-8001", mobile: "+91-9040008001", email: "ravi.shankar@company.com" },
        { level: 2, name: "Kavitha Reddy", landline: "+91-40-6600-8002", mobile: "+91-9040008002", email: "kavitha.reddy@company.com" },
        { level: 3, name: "Naresh Yadav", landline: "+91-40-6600-8003", mobile: "+91-9040008003", email: "naresh.yadav@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Pune",
      slug: "it-service-desk-pune",
      isTop: false,
      sortOrder: 9,
      contacts: [
        { level: 1, name: "Pradeep Jain", landline: "+91-20-6600-9001", mobile: "+91-9820009001", email: "pradeep.jain@company.com" },
        { level: 2, name: "Smita Deshmukh", landline: "+91-20-6600-9002", mobile: "+91-9820009002", email: "smita.deshmukh@company.com" },
        { level: 3, name: "Ashok Patil", landline: "+91-20-6600-9003", mobile: "+91-9820009003", email: "ashok.patil@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Kolkata",
      slug: "it-service-desk-kolkata",
      isTop: false,
      sortOrder: 10,
      contacts: [
        { level: 1, name: "Suman Chatterjee", landline: "+91-33-6600-0001", mobile: "+91-9830010001", email: "suman.chatterjee@company.com" },
        { level: 2, name: "Ananya Bose", landline: "+91-33-6600-0002", mobile: "+91-9830010002", email: "ananya.bose@company.com" },
        { level: 3, name: "Debashish Sen", landline: "+91-33-6600-0003", mobile: "+91-9830010003", email: "debashish.sen@company.com" },
      ],
    },
    {
      teamName: "SAP Application Support",
      slug: "sap-application-support",
      isTop: false,
      sortOrder: 11,
      contacts: [
        { level: 1, name: "Girish Kulkarni", landline: "+91-22-6600-1101", mobile: "+91-9820011001", email: "girish.kulkarni@company.com" },
        { level: 2, name: "Priya Nambiar", landline: "+91-22-6600-1102", mobile: "+91-9820011002", email: "priya.nambiar@company.com" },
        { level: 3, name: "Ajay Mathur", landline: "+91-22-6600-1103", mobile: "+91-9820011003", email: "ajay.mathur@company.com" },
      ],
    },
    {
      teamName: "Infrastructure Team",
      slug: "infrastructure-team",
      isTop: false,
      sortOrder: 12,
      contacts: [
        { level: 1, name: "Harish Nair", landline: "+91-22-6600-1201", mobile: "+91-9820012001", email: "harish.nair@company.com" },
        { level: 2, name: "Pooja Iyer", landline: "+91-22-6600-1202", mobile: "+91-9820012002", email: "pooja.iyer@company.com" },
        { level: 3, name: "Sunil Pandey", landline: "+91-22-6600-1203", mobile: "+91-9820012003", email: "sunil.pandey@company.com" },
      ],
    },
    {
      teamName: "Cloud & DevOps Team",
      slug: "cloud-devops-team",
      isTop: false,
      sortOrder: 13,
      contacts: [
        { level: 1, name: "Arun Krishnamurthy", landline: "+91-22-6600-1301", mobile: "+91-9820013001", email: "arun.krishnamurthy@company.com" },
        { level: 2, name: "Deepa Venkat", landline: "+91-22-6600-1302", mobile: "+91-9820013002", email: "deepa.venkat@company.com" },
        { level: 3, name: "Nikhil Bhatia", landline: "+91-22-6600-1303", mobile: "+91-9820013003", email: "nikhil.bhatia@company.com" },
      ],
    },
    {
      teamName: "Data Center Operations",
      slug: "data-center-operations",
      isTop: false,
      sortOrder: 14,
      contacts: [
        { level: 1, name: "Satish Hegde", landline: "+91-22-6600-1401", mobile: "+91-9820014001", email: "satish.hegde@company.com" },
        { level: 2, name: "Rekha Pillai", landline: "+91-22-6600-1402", mobile: "+91-9820014002", email: "rekha.pillai@company.com" },
        { level: 3, name: "Vijay Menon", landline: "+91-22-6600-1403", mobile: "+91-9820014003", email: "vijay.menon@company.com" },
      ],
    },
    {
      teamName: "IT Vendor Management",
      slug: "it-vendor-management",
      isTop: false,
      sortOrder: 15,
      contacts: [
        { level: 1, name: "Leela Krishnan", landline: "+91-22-6600-1501", mobile: "+91-9820015001", email: "leela.krishnan@company.com" },
        { level: 2, name: "Ganesh Iyer", landline: "+91-22-6600-1502", mobile: "+91-9820015002", email: "ganesh.iyer@company.com" },
        { level: 3, name: "Chandra Shekhar", landline: "+91-22-6600-1503", mobile: "+91-9820015003", email: "chandra.shekhar@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Ahmedabad",
      slug: "it-service-desk-ahmedabad",
      isTop: false,
      sortOrder: 16,
      contacts: [
        { level: 1, name: "Bhavesh Shah", landline: "+91-79-6600-1601", mobile: "+91-9824016001", email: "bhavesh.shah@company.com" },
        { level: 2, name: "Heena Patel", landline: "+91-79-6600-1602", mobile: "+91-9824016002", email: "heena.patel@company.com" },
        { level: 3, name: "Nilesh Mehta", landline: "+91-79-6600-1603", mobile: "+91-9824016003", email: "nilesh.mehta@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Jaipur",
      slug: "it-service-desk-jaipur",
      isTop: false,
      sortOrder: 17,
      contacts: [
        { level: 1, name: "Kuldeep Sharma", landline: "+91-141-6600-1701", mobile: "+91-9829017001", email: "kuldeep.sharma@company.com" },
        { level: 2, name: "Aarti Gupta", landline: "+91-141-6600-1702", mobile: "+91-9829017002", email: "aarti.gupta@company.com" },
        { level: 3, name: "Vineet Singh", landline: "+91-141-6600-1703", mobile: "+91-9829017003", email: "vineet.singh@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Lucknow",
      slug: "it-service-desk-lucknow",
      isTop: false,
      sortOrder: 18,
      contacts: [
        { level: 1, name: "Mohd. Irfan", landline: "+91-522-6600-1801", mobile: "+91-9415018001", email: "mohd.irfan@company.com" },
        { level: 2, name: "Anjali Srivastava", landline: "+91-522-6600-1802", mobile: "+91-9415018002", email: "anjali.srivastava@company.com" },
        { level: 3, name: "Sanjeev Tiwari", landline: "+91-522-6600-1803", mobile: "+91-9415018003", email: "sanjeev.tiwari@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Chandigarh",
      slug: "it-service-desk-chandigarh",
      isTop: false,
      sortOrder: 19,
      contacts: [
        { level: 1, name: "Gurpreet Singh", landline: "+91-172-6600-1901", mobile: "+91-9815019001", email: "gurpreet.singh@company.com" },
        { level: 2, name: "Harpreet Kaur", landline: "+91-172-6600-1902", mobile: "+91-9815019002", email: "harpreet.kaur@company.com" },
        { level: 3, name: "Amarjit Bhatia", landline: "+91-172-6600-1903", mobile: "+91-9815019003", email: "amarjit.bhatia@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Bhopal",
      slug: "it-service-desk-bhopal",
      isTop: false,
      sortOrder: 20,
      contacts: [
        { level: 1, name: "Vivek Shukla", landline: "+91-755-6600-2001", mobile: "+91-9425020001", email: "vivek.shukla@company.com" },
        { level: 2, name: "Kavita Mishra", landline: "+91-755-6600-2002", mobile: "+91-9425020002", email: "kavita.mishra@company.com" },
        { level: 3, name: "Rajendra Yadav", landline: "+91-755-6600-2003", mobile: "+91-9425020003", email: "rajendra.yadav@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Bhubaneswar",
      slug: "it-service-desk-bhubaneswar",
      isTop: false,
      sortOrder: 21,
      contacts: [
        { level: 1, name: "Bibhuti Mohanty", landline: "+91-674-6600-2101", mobile: "+91-9439021001", email: "bibhuti.mohanty@company.com" },
        { level: 2, name: "Sujata Mishra", landline: "+91-674-6600-2102", mobile: "+91-9439021002", email: "sujata.mishra@company.com" },
        { level: 3, name: "Pradipta Sahoo", landline: "+91-674-6600-2103", mobile: "+91-9439021003", email: "pradipta.sahoo@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Nagpur",
      slug: "it-service-desk-nagpur",
      isTop: false,
      sortOrder: 22,
      contacts: [
        { level: 1, name: "Sachin Borkar", landline: "+91-712-6600-2201", mobile: "+91-9420022001", email: "sachin.borkar@company.com" },
        { level: 2, name: "Vaishali Dethe", landline: "+91-712-6600-2202", mobile: "+91-9420022002", email: "vaishali.dethe@company.com" },
        { level: 3, name: "Ravi Wankhede", landline: "+91-712-6600-2203", mobile: "+91-9420022003", email: "ravi.wankhede@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Coimbatore",
      slug: "it-service-desk-coimbatore",
      isTop: false,
      sortOrder: 23,
      contacts: [
        { level: 1, name: "Balasubramanian K", landline: "+91-422-6600-2301", mobile: "+91-9443023001", email: "balasub.k@company.com" },
        { level: 2, name: "Meenakshi Sundaram", landline: "+91-422-6600-2302", mobile: "+91-9443023002", email: "meenakshi.s@company.com" },
        { level: 3, name: "Murugesan P", landline: "+91-422-6600-2303", mobile: "+91-9443023003", email: "murugesan.p@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Kochi",
      slug: "it-service-desk-kochi",
      isTop: false,
      sortOrder: 24,
      contacts: [
        { level: 1, name: "Jose Mathew", landline: "+91-484-6600-2401", mobile: "+91-9447024001", email: "jose.mathew@company.com" },
        { level: 2, name: "Shyni Thomas", landline: "+91-484-6600-2402", mobile: "+91-9447024002", email: "shyni.thomas@company.com" },
        { level: 3, name: "Bijo Abraham", landline: "+91-484-6600-2403", mobile: "+91-9447024003", email: "bijo.abraham@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Visakhapatnam",
      slug: "it-service-desk-visakhapatnam",
      isTop: false,
      sortOrder: 25,
      contacts: [
        { level: 1, name: "Subrahmanyam Rao", landline: "+91-891-6600-2501", mobile: "+91-9440025001", email: "subrahm.rao@company.com" },
        { level: 2, name: "Padmavathi Devi", landline: "+91-891-6600-2502", mobile: "+91-9440025002", email: "padma.devi@company.com" },
        { level: 3, name: "Venkata Ramana", landline: "+91-891-6600-2503", mobile: "+91-9440025003", email: "venkata.ramana@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Indore",
      slug: "it-service-desk-indore",
      isTop: false,
      sortOrder: 26,
      contacts: [
        { level: 1, name: "Deepak Pawar", landline: "+91-731-6600-2601", mobile: "+91-9826026001", email: "deepak.pawar@company.com" },
        { level: 2, name: "Mamta Tripathi", landline: "+91-731-6600-2602", mobile: "+91-9826026002", email: "mamta.tripathi@company.com" },
        { level: 3, name: "Rahul Rathore", landline: "+91-731-6600-2603", mobile: "+91-9826026003", email: "rahul.rathore@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Vadodara",
      slug: "it-service-desk-vadodara",
      isTop: false,
      sortOrder: 27,
      contacts: [
        { level: 1, name: "Rakesh Patel", landline: "+91-265-6600-2701", mobile: "+91-9824027001", email: "rakesh.patel@company.com" },
        { level: 2, name: "Jyotsna Rao", landline: "+91-265-6600-2702", mobile: "+91-9824027002", email: "jyotsna.rao@company.com" },
        { level: 3, name: "Kiran Mehta", landline: "+91-265-6600-2703", mobile: "+91-9824027003", email: "kiran.mehta@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Surat",
      slug: "it-service-desk-surat",
      isTop: false,
      sortOrder: 28,
      contacts: [
        { level: 1, name: "Dhruv Shah", landline: "+91-261-6600-2801", mobile: "+91-9824028001", email: "dhruv.shah@company.com" },
        { level: 2, name: "Foram Desai", landline: "+91-261-6600-2802", mobile: "+91-9824028002", email: "foram.desai@company.com" },
        { level: 3, name: "Paresh Vora", landline: "+91-261-6600-2803", mobile: "+91-9824028003", email: "paresh.vora@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Patna",
      slug: "it-service-desk-patna",
      isTop: false,
      sortOrder: 29,
      contacts: [
        { level: 1, name: "Rajan Kumar", landline: "+91-612-6600-2901", mobile: "+91-9431029001", email: "rajan.kumar@company.com" },
        { level: 2, name: "Seema Devi", landline: "+91-612-6600-2902", mobile: "+91-9431029002", email: "seema.devi@company.com" },
        { level: 3, name: "Navin Prasad", landline: "+91-612-6600-2903", mobile: "+91-9431029003", email: "navin.prasad@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Ranchi",
      slug: "it-service-desk-ranchi",
      isTop: false,
      sortOrder: 30,
      contacts: [
        { level: 1, name: "Umesh Oraon", landline: "+91-651-6600-3001", mobile: "+91-9431030001", email: "umesh.oraon@company.com" },
        { level: 2, name: "Vandana Singh", landline: "+91-651-6600-3002", mobile: "+91-9431030002", email: "vandana.singh@company.com" },
        { level: 3, name: "Santosh Mahto", landline: "+91-651-6600-3003", mobile: "+91-9431030003", email: "santosh.mahto@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Guwahati",
      slug: "it-service-desk-guwahati",
      isTop: false,
      sortOrder: 31,
      contacts: [
        { level: 1, name: "Bhaskar Baruah", landline: "+91-361-6600-3101", mobile: "+91-9435031001", email: "bhaskar.baruah@company.com" },
        { level: 2, name: "Pranjal Saikia", landline: "+91-361-6600-3102", mobile: "+91-9435031002", email: "pranjal.saikia@company.com" },
        { level: 3, name: "Ranjit Das", landline: "+91-361-6600-3103", mobile: "+91-9435031003", email: "ranjit.das@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Thiruvananthapuram",
      slug: "it-service-desk-thiruvananthapuram",
      isTop: false,
      sortOrder: 32,
      contacts: [
        { level: 1, name: "Anilkumar V", landline: "+91-471-6600-3201", mobile: "+91-9447032001", email: "anilkumar.v@company.com" },
        { level: 2, name: "Sindhu Nair", landline: "+91-471-6600-3202", mobile: "+91-9447032002", email: "sindhu.nair@company.com" },
        { level: 3, name: "Rajesh Kumar P", landline: "+91-471-6600-3203", mobile: "+91-9447032003", email: "rajesh.kumar.p@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Mangaluru",
      slug: "it-service-desk-mangaluru",
      isTop: false,
      sortOrder: 33,
      contacts: [
        { level: 1, name: "Shridhara Kamath", landline: "+91-824-6600-3301", mobile: "+91-9448033001", email: "shridhara.kamath@company.com" },
        { level: 2, name: "Usha Shetty", landline: "+91-824-6600-3302", mobile: "+91-9448033002", email: "usha.shetty@company.com" },
        { level: 3, name: "Prashanth Alva", landline: "+91-824-6600-3303", mobile: "+91-9448033003", email: "prashanth.alva@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Mysuru",
      slug: "it-service-desk-mysuru",
      isTop: false,
      sortOrder: 34,
      contacts: [
        { level: 1, name: "Manjunath Gowda", landline: "+91-821-6600-3401", mobile: "+91-9448034001", email: "manjunath.gowda@company.com" },
        { level: 2, name: "Pushpalatha B", landline: "+91-821-6600-3402", mobile: "+91-9448034002", email: "pushpalatha.b@company.com" },
        { level: 3, name: "Ravindra Nayak", landline: "+91-821-6600-3403", mobile: "+91-9448034003", email: "ravindra.nayak@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Nashik",
      slug: "it-service-desk-nashik",
      isTop: false,
      sortOrder: 35,
      contacts: [
        { level: 1, name: "Shailesh Thakur", landline: "+91-253-6600-3501", mobile: "+91-9421035001", email: "shailesh.thakur@company.com" },
        { level: 2, name: "Nilima Kulkarni", landline: "+91-253-6600-3502", mobile: "+91-9421035002", email: "nilima.kulkarni@company.com" },
        { level: 3, name: "Anil Jadhav", landline: "+91-253-6600-3503", mobile: "+91-9421035003", email: "anil.jadhav@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Aurangabad",
      slug: "it-service-desk-aurangabad",
      isTop: false,
      sortOrder: 36,
      contacts: [
        { level: 1, name: "Pramod Chaudhari", landline: "+91-240-6600-3601", mobile: "+91-9422036001", email: "pramod.chaudhari@company.com" },
        { level: 2, name: "Sunanda Shinde", landline: "+91-240-6600-3602", mobile: "+91-9422036002", email: "sunanda.shinde@company.com" },
        { level: 3, name: "Milind Gaikwad", landline: "+91-240-6600-3603", mobile: "+91-9422036003", email: "milind.gaikwad@company.com" },
      ],
    },
    {
      teamName: "IT Service Desk - Madurai",
      slug: "it-service-desk-madurai",
      isTop: false,
      sortOrder: 37,
      contacts: [
        { level: 1, name: "Sivakumar R", landline: "+91-452-6600-3701", mobile: "+91-9443037001", email: "sivakumar.r@company.com" },
        { level: 2, name: "Muthulakshmi D", landline: "+91-452-6600-3702", mobile: "+91-9443037002", email: "muthulakshmi.d@company.com" },
        { level: 3, name: "Velmurugan S", landline: "+91-452-6600-3703", mobile: "+91-9443037003", email: "velmurugan.s@company.com" },
      ],
    },
    {
      teamName: "IT Governance & Compliance",
      slug: "it-governance-compliance",
      isTop: false,
      sortOrder: 38,
      contacts: [
        { level: 1, name: "Seema Agarwal", landline: "+91-22-6600-3801", mobile: "+91-9820038001", email: "seema.agarwal@company.com" },
        { level: 2, name: "Ritu Varma", landline: "+91-22-6600-3802", mobile: "+91-9820038002", email: "ritu.varma@company.com" },
        { level: 3, name: "Praful Desai", landline: "+91-22-6600-3803", mobile: "+91-9820038003", email: "praful.desai@company.com" },
      ],
    },
  ];

  await prisma.escalationContact.deleteMany();
  await prisma.escalationTeam.deleteMany();

  for (const team of escalationTeamsData) {
    const { contacts, ...teamData } = team;
    const createdTeam = await prisma.escalationTeam.create({ data: teamData });
    await prisma.escalationContact.createMany({
      data: contacts.map((c) => ({ ...c, teamId: createdTeam.id })),
    });
  }
  console.log(`✅ Created ${escalationTeamsData.length} escalation teams with contacts`);

  // ─── Local IT Offices (16 states) ─────────────────────────────────────────

  const localItOfficesData = [
    { state: "Maharashtra", city: "Mumbai", locationName: "BKC Office", adOuName: "OU=Mumbai,OU=Maharashtra,DC=company,DC=com", level: 1, name: "Rajesh Nair", landline: "+91-22-6600-1001", mobile: "+91-9820001001", email: "itoffice.mumbai@company.com" },
    { state: "Maharashtra", city: "Pune", locationName: "Hinjewadi Office", adOuName: "OU=Pune,OU=Maharashtra,DC=company,DC=com", level: 1, name: "Pradeep Jain", landline: "+91-20-6600-9001", mobile: "+91-9820009001", email: "itoffice.pune@company.com" },
    { state: "Karnataka", city: "Bengaluru", locationName: "Whitefield Office", adOuName: "OU=Bengaluru,OU=Karnataka,DC=company,DC=com", level: 1, name: "Karthik Rao", landline: "+91-80-6600-2001", mobile: "+91-9980002001", email: "itoffice.bengaluru@company.com" },
    { state: "Tamil Nadu", city: "Chennai", locationName: "Guindy Office", adOuName: "OU=Chennai,OU=TamilNadu,DC=company,DC=com", level: 1, name: "Senthil Kumar", landline: "+91-44-6600-3001", mobile: "+91-9444003001", email: "itoffice.chennai@company.com" },
    { state: "Tamil Nadu", city: "Coimbatore", locationName: "RS Puram Office", adOuName: "OU=Coimbatore,OU=TamilNadu,DC=company,DC=com", level: 2, name: "Balasubramanian K", landline: "+91-422-6600-2301", mobile: "+91-9443023001", email: "itoffice.coimbatore@company.com" },
    { state: "Delhi", city: "New Delhi", locationName: "Connaught Place Office", adOuName: "OU=Delhi,DC=company,DC=com", level: 1, name: "Ramesh Chauhan", landline: "+91-11-6600-7001", mobile: "+91-9810007001", email: "itoffice.delhi@company.com" },
    { state: "Telangana", city: "Hyderabad", locationName: "HITEC City Office", adOuName: "OU=Hyderabad,OU=Telangana,DC=company,DC=com", level: 1, name: "Ravi Shankar", landline: "+91-40-6600-8001", mobile: "+91-9040008001", email: "itoffice.hyderabad@company.com" },
    { state: "West Bengal", city: "Kolkata", locationName: "Salt Lake Office", adOuName: "OU=Kolkata,OU=WestBengal,DC=company,DC=com", level: 1, name: "Suman Chatterjee", landline: "+91-33-6600-0001", mobile: "+91-9830010001", email: "itoffice.kolkata@company.com" },
    { state: "Gujarat", city: "Ahmedabad", locationName: "SG Highway Office", adOuName: "OU=Ahmedabad,OU=Gujarat,DC=company,DC=com", level: 1, name: "Bhavesh Shah", landline: "+91-79-6600-1601", mobile: "+91-9824016001", email: "itoffice.ahmedabad@company.com" },
    { state: "Gujarat", city: "Surat", locationName: "Ring Road Office", adOuName: "OU=Surat,OU=Gujarat,DC=company,DC=com", level: 2, name: "Dhruv Shah", landline: "+91-261-6600-2801", mobile: "+91-9824028001", email: "itoffice.surat@company.com" },
    { state: "Rajasthan", city: "Jaipur", locationName: "Malviya Nagar Office", adOuName: "OU=Jaipur,OU=Rajasthan,DC=company,DC=com", level: 1, name: "Kuldeep Sharma", landline: "+91-141-6600-1701", mobile: "+91-9829017001", email: "itoffice.jaipur@company.com" },
    { state: "Uttar Pradesh", city: "Lucknow", locationName: "Gomti Nagar Office", adOuName: "OU=Lucknow,OU=UttarPradesh,DC=company,DC=com", level: 1, name: "Mohd. Irfan", landline: "+91-522-6600-1801", mobile: "+91-9415018001", email: "itoffice.lucknow@company.com" },
    { state: "Madhya Pradesh", city: "Bhopal", locationName: "MP Nagar Office", adOuName: "OU=Bhopal,OU=MadhyaPradesh,DC=company,DC=com", level: 1, name: "Vivek Shukla", landline: "+91-755-6600-2001", mobile: "+91-9425020001", email: "itoffice.bhopal@company.com" },
    { state: "Kerala", city: "Kochi", locationName: "Infopark Office", adOuName: "OU=Kochi,OU=Kerala,DC=company,DC=com", level: 1, name: "Jose Mathew", landline: "+91-484-6600-2401", mobile: "+91-9447024001", email: "itoffice.kochi@company.com" },
    { state: "Punjab", city: "Chandigarh", locationName: "Industrial Area Office", adOuName: "OU=Chandigarh,OU=Punjab,DC=company,DC=com", level: 1, name: "Gurpreet Singh", landline: "+91-172-6600-1901", mobile: "+91-9815019001", email: "itoffice.chandigarh@company.com" },
    { state: "Odisha", city: "Bhubaneswar", locationName: "Infocity Office", adOuName: "OU=Bhubaneswar,OU=Odisha,DC=company,DC=com", level: 1, name: "Bibhuti Mohanty", landline: "+91-674-6600-2101", mobile: "+91-9439021001", email: "itoffice.bhubaneswar@company.com" },
  ];

  await prisma.localItOffice.deleteMany();
  await prisma.localItOffice.createMany({ data: localItOfficesData });
  console.log(`✅ Created ${localItOfficesData.length} local IT offices`);

  // ─── Service Requests (sample) ────────────────────────────────────────────

  const [emp1, emp2] = users;

  await prisma.serviceRequest.deleteMany();
  await prisma.serviceRequest.createMany({
    data: [
      {
        userId: emp1.id,
        type: RequestType.SERVICE,
        title: "Request VPN Access",
        description: "Need VPN access to connect to company network while working from home.",
        status: RequestStatus.OPEN,
        priority: RequestPriority.MEDIUM,
      },
      {
        userId: emp1.id,
        type: RequestType.INCIDENT,
        title: "Laptop is very slow",
        description: "My laptop has been very slow for the past 2 days. It takes 10 minutes to boot up.",
        status: RequestStatus.IN_PROGRESS,
        priority: RequestPriority.HIGH,
      },
      {
        userId: emp2.id,
        type: RequestType.SERVICE,
        title: "Software Installation - Adobe Acrobat",
        description: "Please install Adobe Acrobat Pro on my workstation for document editing.",
        status: RequestStatus.RESOLVED,
        priority: RequestPriority.LOW,
      },
    ],
  });
  console.log("✅ Created sample service requests");

  // ─── Search Logs (sample) ─────────────────────────────────────────────────

  await prisma.searchLog.deleteMany();
  await prisma.searchLog.createMany({
    data: [
      { userId: emp1.id, query: "password reset", page: "home" },
      { userId: emp1.id, query: "vpn", page: "services" },
      { userId: emp2.id, query: "sap access", page: "home" },
      { userId: null, query: "printer setup", page: "sops" },
    ],
  });
  console.log("✅ Created sample search logs");

  console.log("\n🎉 Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
