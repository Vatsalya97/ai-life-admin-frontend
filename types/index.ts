export type SourceType = 'email' | 'pdf';
export type ItemType = 'deadline' | 'event' | 'task';
export type ItemStatus = 'needs_review' | 'approved' | 'dismissed';
export type ActionType = 'calendar' | 'reminder' | 'none';

export interface SourceItem {
  id: string;
  sourceType: SourceType;
  sender?: string;
  subject?: string;
  uploadName?: string;
  extractedText: string;
  createdAt: string;
}

export interface ExtractedTask {
  id: string;
  title: string;
  description?: string;
  type: ItemType;
  dueDate?: string;
  startTime?: string;
  endTime?: string;
  confidence: number;
  evidence: string;
  sourceId: string;
  status: ItemStatus;
  actionType?: ActionType;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  connectedGoogle: boolean;
  digestEnabled: boolean;
  digestTime: string;
  timezone: string;
}