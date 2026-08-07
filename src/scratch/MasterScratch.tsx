import { useState, useEffect } from 'react';

// 🎯 MASTER INTEGRATED SCRATCH: TỔNG HỢP KIẾN THỨC TỪ SESSION 01 ĐẾN 05 TRONG 1 FILE DUY NHẤT
// 📝 Ý TƯỞNG: Xây dựng 1 Ứng dụng Quản lý Công việc & Nhật ký (Mini Dashboard) tích hợp trọn bộ 5 bài học.

interface Task {
  id: string;
  text: string;
}

export default function MasterScratch() {
  // ==========================================
  // 🟢 SESSION 01: STALE CLOSURE & EFFECT (Bộ đếm thời gian phiên làm việc)
  // ==========================================
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1); // Functional Update thoát khỏi Stale Closure
    }, 1000);

    return () => clearInterval(timer); // Cleanup dọn dẹp RAM
  }, []);

  // ==========================================
  // 🔵 SESSION 02: EVENT LOOP & ASYNC QUEUE (Nhật ký sự kiện hệ thống)
  // ==========================================
  const [eventLogs, setEventLogs] = useState<string[]>([]);

  const runEventLoopCheck = () => {
    const temp: string[] = [];
    temp.push('1. Call Stack Sync: Kích hoạt kiểm tra');

    setTimeout(() => {
      temp.push('4. Macrotask: setTimeout 0ms');
      setEventLogs([...temp]);
    }, 0);

    Promise.resolve().then(() => {
      temp.push('3. Microtask: Promise.then()');
      setEventLogs([...temp]);
    });

    temp.push('2. Call Stack Sync: Kết thúc kiểm tra');
    setEventLogs([...temp]);
  };

  // ==========================================
  // 🟢 SESSION 03: SCOPE & HOISTING (Quản lý biến và loop ô nhớ riêng)
  // ==========================================
  const [scopeLogs, setScopeLogs] = useState<string[]>([]);

  const runScopeCheck = () => {
    const logs: string[] = [];

    // Block Scope test
    if (true) {
      var xVar = 'var lọt Scope';
      let xLet = 'let bị nhốt trong Scope';
      logs.push(`Biến var ngoài ngoặc: "${xVar}"`);
    }

    // Loop Scope test
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        logs.push(`Loop let i = ${i} (Ô nhớ riêng)`);
        setScopeLogs([...logs]);
      }, 100);
    }
  };

  // ==========================================
  // 🟡 SESSION 04: VDOM & RECONCILIATION KEY (Danh sách Task với key={task.id})
  // ==========================================
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'task-1', text: '1. Ôn tập Stale Closure & Event Loop' },
    { id: 'task-2', text: '2. Luyện tập Scope & Key Trap' },
    { id: 'task-3', text: '3. Phỏng vấn Technical Senior' }
  ]);

  const deleteFirstTask = () => {
    setTasks(prev => prev.slice(1));
  };

  // ==========================================
  // 🔴 SESSION 05: STATE QUEUE & BATCHING (Tăng điểm thưởng tích lũy)
  // ==========================================
  const [score, setScore] = useState(0);

  const handleBonusScore = () => {
    setScore(s => s + 1);
    setScore(s => s + 1); // State Queue gom 2 Updater Functions -> cộng +2 điểm
  };

  return (
    <div style={{ maxWidth: '750px', margin: '20px auto', padding: '24px', border: '2px solid #10B981', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#10B981', marginTop: 0 }}>🏆 MASTER INTEGRATED SCRATCH (TỔNG HỢP 5 LESSONS IN 1)</h2>
      <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
        Ứng dụng tích hợp trọn bộ kiến thức từ Session 01 đến 05 trong 1 Component duy nhất!
      </p>

      {/* SESSION 01 */}
      <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10B981', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#059669' }}>🟢 Session 01: Stale Closure Timer</h4>
        <p style={{ margin: 0 }}>Thời gian phiên hoạt động: <strong>{seconds}</strong> giây</p>
      </div>

      {/* SESSION 05 */}
      <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid #F59E0B', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#D97706' }}>🔴 Session 05: State Queue & Batching</h4>
        <p style={{ margin: '0 0 8px 0' }}>Điểm thưởng tích lũy: <strong>{score}</strong> điểm</p>
        <button onClick={handleBonusScore} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          +2 Điểm thưởng (State Queue)
        </button>
      </div>

      {/* SESSION 04 */}
      <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid #EF4444', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#DC2626' }}>🟡 Session 04: VDOM Key Trap List</h4>
        <button onClick={deleteFirstTask} style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '10px' }}>
          🗑️ Xóa Task đầu tiên
        </button>
        {tasks.map(task => (
          <div key={task.id} style={{ marginBottom: '6px' }}>
            <span>{task.text}: </span>
            <input type="text" placeholder="Gõ ghi chú vào đây..." />
          </div>
        ))}
      </div>

      {/* SESSION 02 */}
      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid #2563EB', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#2563EB' }}>🔵 Session 02: Event Loop Check</h4>
        <button onClick={runEventLoopCheck} style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '8px' }}>
          ▶ Kiểm tra thứ tự Event Loop
        </button>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
          {eventLogs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ol>
      </div>

      {/* SESSION 03 */}
      <div style={{ padding: '12px', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid #A855F7', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 6px 0', color: '#7E22CE' }}>🟣 Session 03: Scope & Loop Test</h4>
        <button onClick={runScopeCheck} style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '8px' }}>
          ▶ Kiểm tra Scope & Loop
        </button>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
          {scopeLogs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
