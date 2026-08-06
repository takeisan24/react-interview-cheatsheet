import { useState } from 'react';

export default function Challenge03() {
  const [logs, setLogs] = useState<string[]>([]);

  const runChallenge = () => {
    const newLogs: string[] = [];

    // ==========================================
    // PHẦN 1: SCOPE (BLOCK SCOPE VS FUNCTION SCOPE)
    // ==========================================
    if (true) {
      var var_x = 'Tôi là var (Function Scope - Lọt ra ngoài ngoặc {})';
      // @ts-ignore
      let let_x = 'Tôi là let (Block Scope - Bị nhốt trong ngoặc {})';
      // @ts-ignore
      const const_x = 'Tôi là const (Block Scope - Bị nhốt trong ngoặc {})';
    }

    newLogs.push(`1. var ngoài ngoặc {}: "${var_x}"`);

    try {
      // @ts-ignore
      newLogs.push(`2. let ngoài ngoặc: ${let_x}`);
    } catch (e: any) {
      newLogs.push(`2. ✅ let bị nhốt trong Block Scope: ${e.message}`);
    }

    try {
      // @ts-ignore
      newLogs.push(`3. const ngoài ngoặc: ${const_x}`);
    } catch (e: any) {
      newLogs.push(`3. ✅ const bị nhốt trong Block Scope: ${e.message}`);
    }

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        newLogs.push(`4. Vòng lặp let i = ${i} (Mỗi lượt 1 ô nhớ riêng)`);
        setLogs([...newLogs]);
      }, 100);
    }

    // ==========================================
    // PHẦN 2: HOISTING & TEMPORAL DEAD ZONE (TDZ)
    // ==========================================
    // 🐛 VẤN ĐỀ: Thử gọi biến/hàm TRƯỚC KHI KHAI BÁO ở bên dưới.
    // 🎯 MỤC TIÊU: Quan sát sự khác biệt giữa var (undefined), let/const (TDZ ReferenceError) và Function Declaration (thành công).

    // 1. Gọi var hoisVar trước khai báo -> Ra undefined
    // @ts-ignore
    newLogs.push(`5. Gọi var trước khai báo: ${hoisVar}`);
    var hoisVar = 'Giá trị hoisVar';

    // 2. Thử gọi let hoisLet trong TDZ -> Ném lỗi ReferenceError!
    try {
      // @ts-ignore
      console.log(hoisLet);
      let hoisLet = 'Giá trị hoisLet';
    } catch (e: any) {
      newLogs.push(`6. ✅ let dính TDZ (Temporal Dead Zone): ${e.message}`);
    }

    // 3. Gọi Function Declaration trước khai báo -> Chạy thành công 100%!
    newLogs.push(`7. Gọi Function Declaration trước khai báo: ${hoistedFunc()}`);
    function hoistedFunc() {
      return 'Hàm function declaration được hoist cả tên lẫn thân hàm!';
    }

    // ==========================================
    // PHẦN 3: CONST MUTABILITY VS RE-ASSIGNMENT
    // ==========================================
    // 🐛 VẤN ĐỀ: const có làm cho Object hoàn toàn Immutable không?
    // 🎯 MỤC TIÊU: Phân biệt gán lại (Re-assign -> TypeError) vs Sửa thuộc tính (Mutation -> Cho phép).
    const myConfig = { theme: 'dark' };

    // Cho phép sửa thuộc tính bên trong Object!
    myConfig.theme = 'light';
    newLogs.push(`8. ✅ const Object sửa thuộc tính (Mutation): theme = "${myConfig.theme}"`);

    // Gán lại hằng số -> Bị ném lỗi TypeError!
    try {
      // @ts-ignore
      myConfig = { theme: 'blue' };
    } catch (e: any) {
      newLogs.push(`9. ✅ const bị cấm gán lại (Re-assign): ${e.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #03: ĐẦY ĐỦ SCOPE, HOISTING, TDZ & CONST</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Bấm nút bên dưới để thực thi trọn bộ 3 phần: Scope, Hoisting/TDZ và Mutability của const!
      </p>

      <button onClick={runChallenge} style={{ padding: '8px 14px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        ▶ Chạy thử nghiệm Scope & Hoisting & TDZ
      </button>

      <div style={{ marginTop: '16px', padding: '12px', background: '#1E293B', color: '#F8FAFC', borderRadius: '8px' }}>
        <h4 style={{ marginTop: 0, color: '#38BDF8' }}>Kết quả thực thi đầy đủ:</h4>
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
