import { SourceItem } from '../../types';

interface SourcePreviewProps {
  source?: SourceItem;
}

export default function SourcePreview({ source }: SourcePreviewProps) {
  if (!source) {
    return (
      <div
        style={{
          border: '1px solid #d1d5db',
          borderRadius: 12,
          padding: 16,
          background: '#f9fafb'
        }}
      >
        Select an item to view its source.
      </div>
    );
  }

  return (
    <div
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 12,
        padding: 16,
        background: '#f9fafb'
      }}
    >
      <h3 style={{ marginTop: 0 }}>Source Preview</h3>
      <p><strong>Type:</strong> {source.sourceType}</p>
      {source.sender && <p><strong>Sender:</strong> {source.sender}</p>}
      {source.subject && <p><strong>Subject:</strong> {source.subject}</p>}
      {source.uploadName && <p><strong>File:</strong> {source.uploadName}</p>}
      <p><strong>Extracted Text:</strong></p>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          background: '#ffffff',
          padding: 12,
          borderRadius: 8,
          border: '1px solid #e5e7eb'
        }}
      >
        {source.extractedText}
      </div>
    </div>
  );
}