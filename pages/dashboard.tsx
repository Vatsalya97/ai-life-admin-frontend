import { useEffect, useMemo, useRef, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/common/Button';
import ErrorBanner from '../components/common/ErrorBanner';
import StatusTabs from '../components/dashboard/StatusTabs';
import TaskList from '../components/dashboard/TaskList';
import SourcePreview from '../components/dashboard/SourcePreview';
import EditTaskModal from '../components/modals/EditTaskModal';
import { ExtractedTask, ItemStatus, SourceItem } from '../types';
import {
  fetchItems,
  fetchSourceById,
  syncGmail,
  uploadPdf,
  approveItem,
  dismissItem
} from '../lib/api';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<ExtractedTask[]>([]);
  const [activeTab, setActiveTab] = useState<ItemStatus>('needs_review');
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<SourceItem | undefined>(undefined);
  const [editingTask, setEditingTask] = useState<ExtractedTask | null>(null);
  const [error, setError] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setError('');
        setLoading(true);
        const items = await fetchItems();
        setTasks(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function loadSource() {
      if (!selectedSourceId) {
        setSelectedSource(undefined);
        return;
      }

      try {
        const source = await fetchSourceById(selectedSourceId);
        setSelectedSource(source);
      } catch {
        setSelectedSource(undefined);
      }
    }

    loadSource();
  }, [selectedSourceId]);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === activeTab),
    [tasks, activeTab]
  );

  const handleApprove = async (id: string) => {
    try {
      setError('');
      await approveItem(id);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, status: 'approved', updatedAt: new Date().toISOString() }
            : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Approve failed');
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      setError('');
      await dismissItem(id);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, status: 'dismissed', updatedAt: new Date().toISOString() }
            : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dismiss failed');
    }
  };

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
      setSyncMessage('');
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
      setUploadMessage('');
      const result = await uploadPdf(file);
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

      {loading ? (
        <div style={{ marginTop: 20 }}>Loading tasks...</div>
      ) : (
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
      )}

      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEdit}
      />
    </AppLayout>
  );
}