import { useState, useEffect } from 'react';

export default function Challenge01() {
  // ==========================================
  // PHẦN 1: STALE CLOSURE & FUNCTIONAL UPDATE
  // ==========================================
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 🎯 Dùng Functional Update (prev => prev + 1) để thoát khỏi Stale Closure
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // PHẦN 2: DEPENDENCY ARRAY & CLEANUP FUNCTION
  // ==========================================
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Effect A: [] (Mount)
  useEffect(() => {
    setLogs(prev => [...prev, '🟢 Effect A (deps=[]): Chạy 1 lần duy nhất khi Mount']);
    return () => console.log('Cleanup Effect A');
  }, []);

  // Effect B: [count] (Mount + mỗi khi count thay đổi)
  useEffect(() => {
    if (count > 0) {
      setLogs(prev => [...prev, `🟡 Effect B (deps=[count]): Chạy do count thay đổi = ${count}`]);
    }
    return () => {
      if (count > 0) {
        setLogs(prev => [...prev, `🧹 Cleanup Function Effect B (Chạy trước khi count mới = ${count + 1})`]);
      }
    };
  }, [count]);

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #01: STALE CLOSURE & DEPENDENCY ARRAY</h2>

      {/* PART 1 */}
      <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#EF4444', marginTop: 0 }}>1. Stale Closure Timer (Functional Update)</h4>
        <p>Số giây hiện tại: <strong style={{ fontSize: '18px' }}>{seconds}</strong></p>
      </div>

      {/* PART 2 */}
      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px' }}>
        <h4 style={{ color: '#2563EB', marginTop: 0 }}>2. Dependency Array [] vs [count] & Cleanup Log</h4>
        <p>Giá trị count: <strong>{count}</strong></p>
        <button onClick={() => setCount(prev => prev + 1)} style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '8px' }}>
          Tăng count (+1)
        </button>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
          {logs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
