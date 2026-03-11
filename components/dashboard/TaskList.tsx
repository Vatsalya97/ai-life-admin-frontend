import { ExtractedTask } from '../../types';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

interface TaskListProps {
  tasks: ExtractedTask[];
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
  onEdit: (task: ExtractedTask) => void;
  onSelect: (sourceId: string) => void;
}

export default function TaskList({
  tasks,
  onApprove,
  onDismiss,
  onEdit,
  onSelect
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState message="No items in this tab." />;
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onApprove={onApprove}
          onDismiss={onDismiss}
          onEdit={onEdit}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}