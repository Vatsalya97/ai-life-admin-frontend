import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Button from '../components/common/Button';
import { mockPreferences } from '../data/mock';

export default function SettingsPage() {
  const [digestEnabled, setDigestEnabled] = useState(mockPreferences.digestEnabled);
  const [digestTime, setDigestTime] = useState(mockPreferences.digestTime);
  const [timezone, setTimezone] = useState(mockPreferences.timezone);

  const handleSave = () => {
    alert(
      `Saved settings:\nDigest enabled: ${digestEnabled}\nDigest time: ${digestTime}\nTimezone: ${timezone}`
    );
  };

  return (
    <AppLayout>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: 16,
          padding: 24,
          maxWidth: 700
        }}
      >
        <h1 style={{ marginTop: 0 }}>Settings</h1>

        <div style={{ marginBottom: 16 }}>
          <strong>Google Connected:</strong>{' '}
          {mockPreferences.connectedGoogle ? 'Yes' : 'No'}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={digestEnabled}
              onChange={(e) => setDigestEnabled(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Enable daily digest
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Digest Time</label>
          <input
            value={digestTime}
            onChange={(e) => setDigestTime(e.target.value)}
            style={{ width: '100%', maxWidth: 240, padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Timezone</label>
          <input
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{ width: '100%', maxWidth: 320, padding: 10 }}
          />
        </div>

        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </AppLayout>
  );
}