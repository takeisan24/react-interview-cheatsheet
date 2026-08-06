import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
}

export default function Challenge01() {
  // ==========================================
  // PHẦN 1: STALE CLOSURE & FUNCTIONAL UPDATE
  // ==========================================
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 🎯 Dùng Functional Update (prevseconds => prevseconds + 1) để lấy state mới nhất trong Queue
      setSeconds(prevseconds => prevseconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // PHẦN 2: DEPENDENCY ARRAY & CLEANUP FUNCTION TEST
  // ==========================================
  const [depCount, setDepCount] = useState(0);
  const [effectLogs, setEffectLogs] = useState<string[]>([]);

  // Effect 1: Dependency Array [] (Chạy duy nhất 1 lần khi Mount)
  useEffect(() => {
    setEffectLogs(prev => [...prev, '🟢 Effect 1 (deps=[]): Chạy duy nhất 1 lần khi Mount']);
    return () => {
      console.log('Cleanup Effect 1');
    };
  }, []);

  // Effect 2: Dependency Array [depCount] (Chạy khi Mount VÀ mỗi khi depCount thay đổi)
  useEffect(() => {
    if (depCount > 0) {
      setEffectLogs(prev => [...prev, `🟡 Effect 2 (deps=[depCount]): Chạy do depCount thay đổi = ${depCount}`]);
    }
  }, [depCount]);

  // ==========================================
  // PHẦN 3: STATE QUEUE & BATCHING
  // ==========================================
  const [score, setScore] = useState(0);

  const handleDoubleScore = () => {
    setScore(score => score + 1);
    setScore(score => score + 1);
  };

  // ==========================================
  // PHẦN 4: LIST RENDERING KEY TRAP
  // ==========================================
  const [todos, setTodos] = useState<Todo[]>([
    { id: 't1', text: '1. Học React Core' },
    { id: 't2', text: '2. Luyện Event Loop' },
    { id: 't3', text: '3. Phỏng vấn Technical' },
  ]);

  const deleteFirstTodo = () => {
    setTodos(todos.slice(1));
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #01: STALE CLOSURE & DEPENDENCY ARRAY</h2>

      {/* BUG 1 */}
      <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#EF4444', marginTop: 0 }}>1. Stale Closure Timer (Functional Update)</h4>
        <p>Số giây hiện tại: <strong style={{ fontSize: '18px' }}>{seconds}</strong></p>
      </div>

      {/* DEPS TEST */}
      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#2563EB', marginTop: 0 }}>2. Dependency Array [] vs [depCount] Execution Log</h4>
        <p>depCount: <strong>{depCount}</strong></p>
        <button onClick={() => setDepCount(prev => prev + 1)} style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '8px' }}>
          Tăng depCount (+1)
        </button>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
          {effectLogs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </div>

      {/* BUG 2 */}
      <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#F59E0B', marginTop: 0 }}>3. State Queue & Multiple Updates</h4>
        <p>Điểm số hiện tại: <strong style={{ fontSize: '18px' }}>{score}</strong></p>
        <button onClick={handleDoubleScore} style={{ padding: '6px 12px', cursor: 'pointer' }}>+2 Điểm</button>
      </div>

      {/* BUG 3 */}
      <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
        <h4 style={{ color: '#10B981', marginTop: 0 }}>4. List Rendering Key Trap</h4>
        <button onClick={deleteFirstTodo} style={{ marginBottom: '12px', padding: '6px 12px', cursor: 'pointer' }}>
          🗑️ Xóa Todo đầu tiên
        </button>
        
        {todos.map((todo) => (
          <div key={todo.id} style={{ marginBottom: '8px' }}>
            <span>{todo.text}: </span>
            <input type="text" placeholder="Gõ ghi chú vào đây..." />
          </div>
        ))}
      </div>
    </div>
  );
}
