import { ExtractedTask } from '../../types';
import ConfidenceBadge from './ConfidenceBadge';
import { formatDate, formatDateTime } from '../../lib/helpers';
import Button from '../common/Button';

interface TaskCardProps {
  task: ExtractedTask;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
  onEdit: (task: ExtractedTask) => void;
  onSelect: (sourceId: string) => void;
}

export default function TaskCard({
  task,
  onApprove,
  onDismiss,
  onEdit,
  onSelect
}: TaskCardProps) {
  const dateLabel =
    task.type === 'deadline'
      ? formatDate(task.dueDate)
      : task.startTime
        ? formatDateTime(task.startTime)
        : 'Not available';

  const hasSource = Boolean(task.sourceId && task.sourceId.trim());

  return (
    <div
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        background: '#ffffff'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          alignItems: 'flex-start'
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>{task.title}</h3>
          <p style={{ margin: '6px 0', color: '#4b5563' }}>
            Type: {task.type}
          </p>
          <p style={{ margin: '6px 0', color: '#4b5563' }}>
            Due/Start: {dateLabel}
          </p>
          {task.description && (
            <p style={{ margin: '6px 0', color: '#4b5563' }}>
              {task.description}
            </p>
          )}
        </div>
        <ConfidenceBadge confidence={task.confidence} />
      </div>

      <p style={{ marginTop: 12 }}>
        <strong>Evidence:</strong> {task.evidence}
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
        <Button
          variant="secondary"
          onClick={() => {
            if (hasSource) onSelect(task.sourceId);
          }}
          disabled={!hasSource}
        >
          View Source
        </Button>

        <Button variant="secondary" onClick={() => onEdit(task)}>
          Edit
        </Button>

        {task.status === 'needs_review' && (
          <>
            <Button onClick={() => onApprove(task.id)}>Approve</Button>
            <Button variant="danger" onClick={() => onDismiss(task.id)}>
              Dismiss
            </Button>
          </>
        )}
      </div>
    </div>
  );
}