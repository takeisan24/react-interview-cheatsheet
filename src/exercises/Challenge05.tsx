import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function Challenge05() {
  // ==========================================
  // PHẦN 1: STATE QUEUE UPDATER FUNCTION
  // ==========================================
  const [score, setScore] = useState(0);

  const handleMultipleUpdates = () => {
    // 🎯 Truyền Updater Function (s => s + 1) để tích lũy trong State Queue
    setScore(s => s + 1);
    setScore(s => s + 1);
  };

  // ==========================================
  // PHẦN 2: REACT 18 AUTOMATIC BATCHING VS FLUSHSYNC
  // ==========================================
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);

  // 1. Automatic Batching trong Async/setTimeout (React 18 gom thành 1 re-render)
  const handleAsyncBatching = () => {
    setTimeout(() => {
      setCount(c => c + 1);
      setRenderCount(r => r + 1);
      setLogs(prev => [...prev, '⚡ React 18 Automatic Batching trong setTimeout: Chỉ Re-render 1 lần!']);
    }, 0);
  };

  // 2. Tắt Batching bằng flushSync (Ép re-render ngay lập tức)
  const handleFlushSync = () => {
    flushSync(() => {
      setCount(c => c + 1);
    });
    flushSync(() => {
      setRenderCount(r => r + 1);
    });
    setLogs(prev => [...prev, '🔥 Ép Re-render bằng flushSync: Re-render 2 lần tách biệt!']);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #05: AUTOMATIC BATCHING & FLUSHSYNC</h2>

      {/* PART 1 */}
      <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#F59E0B', marginTop: 0 }}>1. React State Queue (Functional Updates)</h4>
        <p>Điểm số hiện tại: <strong style={{ fontSize: '18px' }}>{score}</strong></p>
        <button onClick={handleMultipleUpdates} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          +2 Điểm (Dùng Queue Updater Function)
        </button>
      </div>

      {/* PART 2 */}
      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px' }}>
        <h4 style={{ color: '#2563EB', marginTop: 0 }}>2. Automatic Batching (React 18) vs flushSync()</h4>
        <p>Số Count: <strong style={{ fontSize: '18px', color: '#2563EB' }}>{count}</strong></p>
        <p>Số lần Re-render: <strong style={{ fontSize: '18px', color: '#EF4444' }}>{renderCount}</strong></p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button onClick={handleAsyncBatching} style={{ padding: '6px 12px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            ⚡ Thử React 18 Batching (setTimeout)
          </button>
          <button onClick={handleFlushSync} style={{ padding: '6px 12px', backgroundColor: '#F59E0B', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            🔥 Thử flushSync (Tắt Batching)
          </button>
        </div>

        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
          {logs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
