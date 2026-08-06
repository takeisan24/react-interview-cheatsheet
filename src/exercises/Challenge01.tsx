import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
}

export default function Challenge01() {
  // 🐛 BUG 1: Stale Closure Timer
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // TODO 1: Hãy sửa dòng dưới đây để timer tăng đều 1, 2, 3... thay vì bị kẹt ở số 1!
      setSeconds(prevseconds => prevseconds + 1); // Thêm prev sẽ giúp cho setInterval luôn snapshot giá trị trước đó của state
    }, 1000); // Cái này gọi là Functional Update

    return () => clearInterval(timer);
  }, []);

  // 🐛 BUG 2: Multiple State Update (State Queue & Batching)
  const [score, setScore] = useState(0);

  const handleDoubleScore = () => {
    // TODO 2: Bấm nút này mong muốn cộng 2 điểm (+2), nhưng hiện tại chỉ tăng 1 điểm. Hãy sửa!
    setScore(score => score + 1);
    setScore(score => score + 1); // Mặc dù chỉ cần 1 dòng nhưng nếu như dùng React phiên bản mới thì điều đó không cần thiết phải xóa, để đó sẽ hơi trash code nên xóa hay không tùy vào dev
  };

  // 🐛 BUG 3: List Rendering Key Trap
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
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH THỰC HÀNH #01: TÌM & FIX 3 BUGS CODEBASE</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Hãy mở file <code>src/exercises/Challenge01.tsx</code> trên VS Code để sửa code và xem web tự cập nhật!
      </p>

      {/* BUG 1 */}
      <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#EF4444', marginTop: 0 }}>🐛 Lỗi 1: Timer bị kẹt ở số 1 (Stale Closure)</h4>
        <p>Số giây hiện tại: <strong style={{ fontSize: '18px' }}>{seconds}</strong></p>
      </div>

      {/* BUG 2 */}
      <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#F59E0B', marginTop: 0 }}>🐛 Lỗi 2: Muốn +2 điểm nhưng chỉ được +1 (State Queue)</h4>
        <p>Điểm số hiện tại: <strong style={{ fontSize: '18px' }}>{score}</strong></p>
        <button onClick={handleDoubleScore} style={{ padding: '6px 12px', cursor: 'pointer' }}>+2 Điểm</button>
      </div>

      {/* BUG 3 */}
      <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', borderRadius: '8px' }}>
        <h4 style={{ color: '#10B981', marginTop: 0 }}>🐛 Lỗi 3: Xóa Todo bị tráo ô Input (Key Trap)</h4>
        <button onClick={deleteFirstTodo} style={{ marginBottom: '12px', padding: '6px 12px', cursor: 'pointer' }}>
          🗑️ Xóa Todo đầu tiên
        </button>

        {todos.map((todo) => (
          // TODO 3: Hãy sửa thuộc tính key={index} ở dòng dưới thành key chuẩn để không bị tráo ô input!
          // Bắt buộc là khi render ra danh sách, phải dùng id của danh sách, không dùng index (chỉ mục) của danh sách
          <div key={todo.id} style={{ marginBottom: '8px' }}>
            <span>{todo.text}: </span>
            <input type="text" placeholder="Gõ ghi chú vào đây..." />
          </div>
        ))}
      </div>
    </div>
  );
}
