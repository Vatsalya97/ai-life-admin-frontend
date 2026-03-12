import { useMemo, useRef, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/common/Button';
import ErrorBanner from '../components/common/ErrorBanner';
import StatusTabs from '../components/dashboard/StatusTabs';
import TaskList from '../components/dashboard/TaskList';
import SourcePreview from '../components/dashboard/SourcePreview';
import EditTaskModal from '../components/modals/EditTaskModal';
import { mockSources, mockTasks } from '../data/mock';
import { ExtractedTask, ItemStatus } from '../types';
import { syncGmail, uploadImage } from '../lib/api';

export default function DashboardPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState<ItemStatus>('needs_review');
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<ExtractedTask | null>(null);
  const [error, setError] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === activeTab),
    [tasks, activeTab]
  );

  const selectedSource = mockSources.find((source) => source.id === selectedSourceId);

  const updateTaskStatus = (id: string, status: ItemStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleApprove = (id: string) => updateTaskStatus(id, 'approved');
  const handleDismiss = (id: string) => updateTaskStatus(id, 'dismissed');

  const handleSaveEdit = (taskId: string, updates: Partial<ExtractedTask>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
    setEditingTask(null);
  };

  const handleSyncGmail = async () => {
    try {
      setError('');
      const result = await syncGmail();
      setSyncMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      const result = await uploadImage(file);
      setUploadMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <AppLayout>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ marginBottom: 8 }}>AI Life Admin Dashboard</h1>
        <p style={{ color: '#4b5563' }}>
          Review extracted tasks, deadlines, and events before taking action.
        </p>
      </div>

      {error && <ErrorBanner message={error} />}

      {(syncMessage || uploadMessage) && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: '#ecfeff',
            color: '#155e75',
            border: '1px solid #a5f3fc',
            borderRadius: 10
          }}
        >
          {syncMessage || uploadMessage}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <Button onClick={handleSyncGmail}>Sync Gmail</Button>
        <Button variant="secondary" onClick={handleUploadClick}>
          Upload PDF
        </Button>
        <Button variant="secondary" onClick={() => (window.location.href = '/digest')}>
          Preview Digest
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        style={{ display: 'none' }}
      />

      <StatusTabs activeTab={activeTab} onChange={setActiveTab} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 20,
          alignItems: 'start'
        }}
      >
        <div>
          <TaskList
            tasks={filteredTasks}
            onApprove={handleApprove}
            onDismiss={handleDismiss}
            onEdit={setEditingTask}
            onSelect={setSelectedSourceId}
          />
        </div>

        <SourcePreview source={selectedSource} />
      </div>

      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEdit}
      />
    </AppLayout>
  );
}