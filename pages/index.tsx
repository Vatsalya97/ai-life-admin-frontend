import Link from 'next/link';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/common/Button';
import { mockPreferences } from '../data/mock';

export default function HomePage() {
  const handleConnectGoogle = () => {
    alert('Google account connected! (mock)');
  };

  return (
    <AppLayout>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: 16,
          padding: 24,
          maxWidth: 760
        }}
      >
        <h1 style={{ marginTop: 0 }}>AI Life Admin</h1>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
          Turn emails and PDFs into structured tasks, deadlines, and events.
          Review extracted items, approve what matters, and keep one clean daily plan.
        </p>

        <div style={{ margin: '20px 0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={handleConnectGoogle}>Connect Google</Button>
          <Button variant="secondary">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: '#f9fafb',
            borderRadius: 12,
            border: '1px solid #e5e7eb'
          }}
        >
          <h3 style={{ marginTop: 0 }}>Current Status</h3>
          <p>Google connected: {mockPreferences.connectedGoogle ? 'Yes' : 'No'}</p>
          <p>Daily digest enabled: {mockPreferences.digestEnabled ? 'Yes' : 'No'}</p>
          <p>Digest time: {mockPreferences.digestTime}</p>
          <p>Timezone: {mockPreferences.timezone}</p>
        </div>
      </div>
    </AppLayout>
  );
}