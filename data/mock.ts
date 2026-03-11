import { SourceItem, ExtractedTask, UserPreferences } from '../types';

export const mockSources: SourceItem[] = [
  {
    id: '1',
    sourceType: 'email',
    sender: 'professor@university.edu',
    subject: 'Submit financial aid form',
    extractedText:
      'Hello, please submit the financial aid verification form by March 14. Late submissions will not be accepted.',
    createdAt: '2026-03-11T08:00:00Z'
  },
  {
    id: '2',
    sourceType: 'pdf',
    uploadName: 'EventSchedule.pdf',
    extractedText:
      'Orientation starts on March 20 at 10:00 AM in the Student Center auditorium.',
    createdAt: '2026-03-11T08:05:00Z'
  },
  {
    id: '3',
    sourceType: 'email',
    sender: 'hr@company.com',
    subject: 'Complete onboarding steps',
    extractedText:
      'Please complete your onboarding checklist this week and upload signed documents.',
    createdAt: '2026-03-11T09:00:00Z'
  }
];

export const mockTasks: ExtractedTask[] = [
  {
    id: 'task1',
    title: 'Submit financial aid form',
    description: 'Financial aid verification form submission',
    type: 'deadline',
    dueDate: '2026-03-14',
    confidence: 0.91,
    evidence: 'Please submit the financial aid verification form by March 14.',
    sourceId: '1',
    status: 'needs_review',
    actionType: 'reminder',
    createdAt: '2026-03-11T08:10:00Z',
    updatedAt: '2026-03-11T08:10:00Z'
  },
  {
    id: 'task2',
    title: 'Attend orientation',
    description: 'University orientation event',
    type: 'event',
    startTime: '2026-03-20T10:00:00Z',
    endTime: '2026-03-20T12:00:00Z',
    confidence: 0.95,
    evidence: 'Orientation starts on March 20 at 10:00 AM.',
    sourceId: '2',
    status: 'needs_review',
    actionType: 'calendar',
    createdAt: '2026-03-11T08:12:00Z',
    updatedAt: '2026-03-11T08:12:00Z'
  },
  {
    id: 'task3',
    title: 'Complete onboarding checklist',
    description: 'Upload signed onboarding documents',
    type: 'task',
    confidence: 0.72,
    evidence: 'Please complete your onboarding checklist this week.',
    sourceId: '3',
    status: 'approved',
    actionType: 'none',
    createdAt: '2026-03-11T09:10:00Z',
    updatedAt: '2026-03-11T09:15:00Z'
  },
  {
    id: 'task4',
    title: 'Upload signed documents',
    description: 'HR follow-up upload request',
    type: 'task',
    confidence: 0.58,
    evidence: 'Upload signed documents.',
    sourceId: '3',
    status: 'dismissed',
    actionType: 'none',
    createdAt: '2026-03-11T09:20:00Z',
    updatedAt: '2026-03-11T09:25:00Z'
  }
];

export const mockPreferences: UserPreferences = {
  connectedGoogle: true,
  digestEnabled: true,
  digestTime: '08:00',
  timezone: 'America/New_York'
};