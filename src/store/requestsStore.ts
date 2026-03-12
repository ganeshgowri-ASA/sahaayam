'use client';

import { create } from 'zustand';
import {
  ServiceRequest,
  RequestStatus,
  RequestPriority,
  RequestType,
  mockRequests,
} from '@/lib/data/requests';

let counter = mockRequests.length + 1;

interface RequestsStore {
  requests: ServiceRequest[];
  addRequest: (data: {
    type: RequestType;
    title: string;
    description: string;
    priority: RequestPriority;
  }) => ServiceRequest;
}

export const useRequestsStore = create<RequestsStore>((set, get) => ({
  requests: [...mockRequests],
  addRequest: (data) => {
    const id = `REQ-${String(counter++).padStart(3, '0')}`;
    const newRequest: ServiceRequest = {
      id,
      ...data,
      status: 'OPEN' as RequestStatus,
      createdAt: new Date().toISOString(),
    };
    set({ requests: [...get().requests, newRequest] });
    return newRequest;
  },
}));
