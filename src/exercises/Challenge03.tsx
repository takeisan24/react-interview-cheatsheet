import { useState } from 'react';

export default function Challenge03() {
  const [logs, setLogs] = useState<string[]>([]);

  const runChallenge = () => {
    const newLogs: string[] = [];

    // TODO 1: Hãy sửa từ khóa 'var' bên dưới thành 'let' hoặc 'const' để biến x không bị lọt ra ngoài khối if!
    if (true) {
      var x = 'Tôi là var (Lọt ra ngoài ngoặc {})';
    }

    try {
      // @ts-ignore
      newLogs.push(`1. Biến x ngoài ngoặc: ${x}`);
    } catch (e: any) {
      newLogs.push(`1. ✅ Đã nhốt x trong Block Scope: ${e.message}`);
    }

    // TODO 2: Hãy sửa từ khóa 'var i' trong vòng lặp for bên dưới thành 'let i' để in ra 0, 1, 2 thay vì 3, 3, 3!
    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        newLogs.push(`2. Kết quả vòng lặp i = ${i}`);
        setLogs([...newLogs]);
      }, 100);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #03: FIX LỖI VAR LEAK & LOOP SCOPE</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Mở file <code>src/exercises/Challenge03.tsx</code> trên VS Code để sửa lỗi var leak trong khối if và vòng lặp for!
      </p>

      <button onClick={runChallenge} style={{ padding: '8px 14px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        ▶ Chạy thử nghiệm Scope
      </button>

      <div style={{ marginTop: '16px', padding: '12px', background: '#1E293B', color: '#F8FAFC', borderRadius: '8px' }}>
        <h4 style={{ marginTop: 0, color: '#38BDF8' }}>Kết quả thực thi:</h4>
        {logs.length === 0 ? (
          <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0 }}>Bấm nút trên để kiểm tra...</p>
        ) : (
          <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
            {logs.map((log, i) => (
              <li key={i} style={{ color: log.includes('lọt') || log.includes('3') ? '#F87171' : '#4ADE80' }}>
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
