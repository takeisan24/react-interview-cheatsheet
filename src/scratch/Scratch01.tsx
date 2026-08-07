// 🎯 THỬ THÁCH TỰ VIẾT TỪ TRANG TRẮNG #01 (SESSION 01: STALE CLOSURE & EFFECT)
// 📝 ĐỀ BÀI: 
// 1. Hãy tự viết 1 component đếm số giây (seconds) tự động tăng +1 mỗi 1 giây bằng setInterval trong useEffect.
// 2. Đảm bảo timer hoạt động chuẩn 1, 2, 3... mà KHÔNG BỊ KẸT ở số 1 (dùng đúng Functional Update).
// 3. Đảm bảo có cleanup function hủy setInterval khi unmount.

import { useEffect, useState } from "react";

export default function Scratch01() {
  const [seconds, setSeconds] = useState(0); // khởi tạo state

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1); // Functional Update
    }, 1000);
    
    return () => clearInterval(timer); // Bắt buộc phải có cleanup function để tránh rò rỉ RAM
  }, [seconds]);

  return (
    <div style={{ padding: '20px', border: '2px dashed #10B981', borderRadius: '8px', textAlign: 'left' }}>
      <h3 style={{ color: '#10B981', marginTop: 0 }}>✍️ Scratch 01: Stale Closure Timer</h3>
      <p style={{ color: '#64748B', fontSize: '13px' }}>Số giây hiện tại: <strong>{seconds}</strong> giây</p>
    </div>
  );
}
