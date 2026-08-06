import { useState } from 'react';

export default function Challenge03() {
  const [logs, setLogs] = useState<string[]>([]);

  const runChallenge = () => {
    const newLogs: string[] = [];

    // 🐛 VẤN ĐỀ 1: Biến x (var) bị rò rỉ ra ngoài ngoặc {}, còn let_x và const_x thì không.
    // 🎯 MỤC TIÊU: Chứng minh let và const tuân thủ Block Scope {}, còn var chỉ có Function Scope.
    if (true) {
      var var_x = 'Tôi là var (Function Scope - Lọt ra ngoài ngoặc {})';
      let let_x = 'Tôi là let (Block Scope - Bị nhốt trong ngoặc {})';
      const const_x = 'Tôi là const (Block Scope - Bị nhốt trong ngoặc {})';
    }

    // 1. var_x chui ra ngoài thành công vì var bỏ qua Block Scope {}
    newLogs.push(`1. var ngoài ngoặc {}: "${var_x}"`);

    // 2. Thử đọc let_x ở ngoài ngoặc {} ➔ Bị ném lỗi ReferenceError!
    try {
      // @ts-ignore
      newLogs.push(`2. let ngoài ngoặc: ${let_x}`);
    } catch (e: any) {
      newLogs.push(`2. ✅ let bị nhốt trong Block Scope: ${e.message}`);
    }

    // 3. Thử đọc const_x ở ngoài ngoặc {} ➔ Cũng bị ném lỗi ReferenceError!
    try {
      // @ts-ignore
      newLogs.push(`3. const ngoài ngoặc: ${const_x}`);
    } catch (e: any) {
      newLogs.push(`3. ✅ const bị nhốt trong Block Scope: ${e.message}`);
    }


    // 🐛 VẤN ĐỀ 2: Vòng lặp for(var i...) bị lỗi in ra 3, 3, 3 do xài chung 1 ô nhớ i.
    // 🎯 MỤC TIÊU: Dùng let i để JS Engine tạo 1 ô nhớ i mới tinh cho từng lượt lặp (0, 1, 2).
    // 💡 LƯU Ý: Không dùng const i trong vòng lặp for(;;) vì i++ sẽ ném lỗi TypeError (gán lại hằng số).
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        newLogs.push(`4. Vòng lặp let i = ${i} (Mỗi lượt 1 ô nhớ riêng)`);
        setLogs([...newLogs]);
      }, 100);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #03: FIX LỖI VAR LEAK & LOOP SCOPE</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Bấm nút bên dưới để xem sự khác biệt giữa var (Function Scope) và let/const (Block Scope)!
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
              <li key={i} style={{ color: log.includes('✅') ? '#4ADE80' : '#FACC15' }}>
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
