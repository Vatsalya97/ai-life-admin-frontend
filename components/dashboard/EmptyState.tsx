interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: 12,
        padding: 20
      }}
    >
      {message}
    </div>
  );
}