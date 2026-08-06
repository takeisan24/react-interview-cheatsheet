import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function Challenge05() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);

  // TODO 1: Hãy bọc các lệnh setCount bên dưới bằng hàm flushSync(() => { ... }) từ react-dom để ép React Re-render ngay lập tức 2 lần tách biệt!
  const handleForceRender = () => {
    // Sửa code ở đây: Bọc từng đợt update bằng flushSync(...)
    setCount(c => c + 1);
    setRenderCount(r => r + 1);

    setCount(c => c + 1);
    setRenderCount(r => r + 1);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #05: TẮT BATCHING BẰNG FLUSHSYNC</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Mở file <code>src/exercises/Challenge05.tsx</code> trên VS Code để bọc các lệnh update state bằng <code>flushSync()</code>!
      </p>

      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <p>Số Count: <strong style={{ fontSize: '18px', color: '#2563EB' }}>{count}</strong></p>
        <p>Số lần Re-render: <strong style={{ fontSize: '18px', color: '#EF4444' }}>{renderCount}</strong></p>
      </div>

      <button onClick={handleForceRender} style={{ padding: '8px 14px', backgroundColor: '#F59E0B', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        🔥 Ép Re-render ngay lập tức (flushSync)
      </button>
    </div>
  );
}
