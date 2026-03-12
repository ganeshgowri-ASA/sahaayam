export type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type RequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RequestType = 'Service Request' | 'Incident';

export interface ServiceRequest {
  id: string;
  type: RequestType;
  title: string;
  description: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
}

export const mockRequests: ServiceRequest[] = [
  {
    id: 'REQ-001',
    type: 'Service Request',
    title: 'Laptop replacement request',
    description: 'My laptop is running slow and needs to be replaced.',
    priority: 'MEDIUM',
    status: 'OPEN',
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'REQ-002',
    type: 'Incident',
    title: 'VPN connection failure',
    description: 'Unable to connect to VPN since this morning.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    createdAt: '2026-03-05T11:30:00Z',
  },
  {
    id: 'REQ-003',
    type: 'Service Request',
    title: 'Software license for Adobe Suite',
    description: 'Requesting an Adobe Creative Suite license for design work.',
    priority: 'LOW',
    status: 'RESOLVED',
    createdAt: '2026-03-07T14:00:00Z',
  },
  {
    id: 'REQ-004',
    type: 'Incident',
    title: 'Email server outage',
    description: 'Company email is down affecting all users in the APAC region.',
    priority: 'CRITICAL',
    status: 'CLOSED',
    createdAt: '2026-03-08T08:15:00Z',
  },
  {
    id: 'REQ-005',
    type: 'Service Request',
    title: 'New employee onboarding access',
    description: 'Setting up accounts and access for new hire joining on March 15.',
    priority: 'MEDIUM',
    status: 'OPEN',
    createdAt: '2026-03-10T10:00:00Z',
  },
];
