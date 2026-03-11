import { useEffect, useState } from 'react';
import { ExtractedTask } from '../../types';
import Button from '../common/Button';

interface EditTaskModalProps {
  task: ExtractedTask | null;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<ExtractedTask>) => void;
}

export default function EditTaskModal({
  task,
  onClose,
  onSave
}: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
      setStartTime(task.startTime || '');
    }
  }, [task]);

  if (!task) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 12,
          padding: 20,
          width: '100%',
          maxWidth: 520
        }}
      >
        <h2>Edit Item</h2>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: 10, minHeight: 100 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Due Date</label>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="YYYY-MM-DD"
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Start Time</label>
          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="YYYY-MM-DDTHH:mm:ssZ"
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave(task.id, {
                title,
                description,
                dueDate: dueDate || undefined,
                startTime: startTime || undefined
              })
            }
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}