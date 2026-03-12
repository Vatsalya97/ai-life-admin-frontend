import { ExtractedTask, SourceItem } from '../types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://ldufhluy8b.execute-api.us-east-1.amazonaws.com/dev';

type BackendItem = {
  pk: string;
  sk: string;
  title: string;
  itemType: 'deadline' | 'event' | 'task';
  date?: string;
  details?: string;
  sourceFile?: string;
  createdAt?: string;
  confidence?: number;
};

type FetchItemsResponse = {
  items: BackendItem[];
  count: number;
};

function mapBackendItemToTask(item: BackendItem): ExtractedTask {
  const timestamp = item.createdAt || new Date().toISOString();

  return {
    id: item.sk,
    title: item.title,
    description: item.details || '',
    type: item.itemType,
    dueDate: item.date || undefined,
    startTime: undefined,
    endTime: undefined,
    confidence: item.confidence ?? 1,
    evidence: item.details || '',
    sourceId: item.sourceFile || '',
    status: 'needs_review',
    actionType: 'none',
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

export async function fetchItems(): Promise<ExtractedTask[]> {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured');
  }

  const response = await fetch(`${API_BASE_URL}/items`);

  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  const data: FetchItemsResponse = await response.json();
  return data.items.map(mapBackendItemToTask);
}

export async function approveItem(id: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/items/${encodeURIComponent(id)}/approve`,
    {
      method: 'POST'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to approve item');
  }
}

export async function dismissItem(id: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/items/${encodeURIComponent(id)}/dismiss`,
    {
      method: 'POST'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to dismiss item');
  }
}

export async function syncGmail(): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/sync-gmail`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error('Failed to start Gmail sync');
  }

  return response.json();
}

export async function uploadPdf(_file: File): Promise<{ success: boolean; message: string }> {
  return {
    success: false,
    message: 'PDF upload from frontend is not implemented in the backend yet.'
  };
}

export async function fetchSourceById(_id: string): Promise<SourceItem | undefined> {
  return undefined;
}