interface ConfidenceBadgeProps {
  confidence: number;
}

export default function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const percent = Math.round(confidence * 100);

  let backgroundColor = '#e5e7eb';
  let color = '#111827';
  let label = 'Low';

  if (percent >= 85) {
    backgroundColor = '#dcfce7';
    color = '#166534';
    label = 'High';
  } else if (percent >= 65) {
    backgroundColor = '#fef3c7';
    color = '#92400e';
    label = 'Medium';
  }

  return (
    <span
      style={{
        backgroundColor,
        color,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700
      }}
    >
      {label} ({percent}%)
    </span>
  );
}