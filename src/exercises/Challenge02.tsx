import { useState } from 'react';

export default function Challenge02() {
  const [logs, setLogs] = useState<string[]>([]);

  const runChallenge = () => {
    const tempLogs: string[] = [];

    // TODO 1: Hãy đoán thứ tự hiển thị của 4 dòng dưới đây (Dòng nào ra 1st, 2nd, 3rd, 4th?)
    // Điền dự đoán của bạn vào đây: [Dòng ..., Dòng ..., Dòng ..., Dòng ...]
    tempLogs.push('🔹 Dòng A: Code đồng bộ (Start)');

    setTimeout(() => {
      tempLogs.push('🔸 Dòng B: Macrotask (setTimeout 0ms)');
      setLogs([...tempLogs]);
    }, 0);

    Promise.resolve().then(() => {
      tempLogs.push('⭐ Dòng C: Microtask (Promise.then)');
      setLogs([...tempLogs]);
    });

    tempLogs.push('🔹 Dòng D: Code đồng bộ (End)');
    setLogs([...tempLogs]);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #02: DỰ ĐOÁN THỨ TỰ EVENT LOOP</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Mở file <code>src/exercises/Challenge02.tsx</code> trên VS Code để đọc code và điền thứ tự dự đoán vào comment TODO 1!
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
              <li key={i} style={{ color: log.includes('Microtask') ? '#4ADE80' : log.includes('Macrotask') ? '#F87171' : '#FACC15' }}>
                {log}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
