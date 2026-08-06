import { useState } from 'react';

export default function Challenge02() {
  const [logs, setLogs] = useState<string[]>([]);

  const runChallenge = () => {
    const tempLogs: string[] = [];

    // 🎯 DỰ ĐOÁN THỨ TỰ THỰC THI (Call Stack Sync -> Microtask -> Macrotask)
    tempLogs.push('🔹 Dòng A: Code đồng bộ (Start)');

    setTimeout(() => {
      tempLogs.push('🔸 Dòng B: Macrotask (setTimeout 0ms)');
      setLogs([...tempLogs]);
    }, 0);

    new Promise<void>((resolve) => {
      // 💡 BẪY PHỎNG VẤN: Thân của new Promise() chạy ĐỒNG BỘ trên Call Stack ngay lập tức!
      tempLogs.push('⚡ Dòng C: Thân new Promise() (Chạy ĐỒNG BỘ trên Call Stack!)');
      resolve();
    }).then(() => {
      tempLogs.push('⭐ Dòng D: Microtask (.then() của Promise)');
      setLogs([...tempLogs]);
    });

    tempLogs.push('🔹 Dòng E: Code đồng bộ (End)');
    setLogs([...tempLogs]);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #02: DỰ ĐOÁN THỨ TỰ EVENT LOOP</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Bấm nút bên dưới để thực thi và quan sát thứ tự Call Stack, Promise Body (Sync), Microtask và Macrotask!
      </p>

      <button onClick={runChallenge} style={{ padding: '8px 14px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        ▶ Chạy thử nghiệm Event Loop
      </button>

      <div style={{ marginTop: '16px', padding: '12px', background: '#1E293B', color: '#F8FAFC', borderRadius: '8px' }}>
        <h4 style={{ marginTop: 0, color: '#38BDF8' }}>Kết quả thực thi thực tế:</h4>
        {logs.length === 0 ? (
          <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0 }}>Bấm nút trên để xem kết quả...</p>
        ) : (
          <ol style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
            {logs.map((log, i) => (
              <li key={i} style={{ color: log.includes('Microtask') ? '#4ADE80' : log.includes('Macrotask') ? '#F87171' : log.includes('thân new Promise') ? '#FACC15' : '#60A5FA' }}>
                {log}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
