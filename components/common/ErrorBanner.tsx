interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div
      style={{
        background: '#fee2e2',
        color: '#991b1b',
        border: '1px solid #fecaca',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16
      }}
    >
      {message}
    </div>
  );
}