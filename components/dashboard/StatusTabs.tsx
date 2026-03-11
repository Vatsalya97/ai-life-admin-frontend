import { ItemStatus } from '../../types';

interface StatusTabsProps {
  activeTab: ItemStatus;
  onChange: (tab: ItemStatus) => void;
}

const tabs: ItemStatus[] = ['needs_review', 'approved', 'dismissed'];

export default function StatusTabs({ activeTab, onChange }: StatusTabsProps) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #d1d5db',
            background: activeTab === tab ? '#111827' : '#ffffff',
            color: activeTab === tab ? '#ffffff' : '#111827',
            cursor: 'pointer',
            textTransform: 'capitalize'
          }}
        >
          {tab.replace('_', ' ')}
        </button>
      ))}
    </div>
  );
}