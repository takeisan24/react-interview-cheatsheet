import { useState, useEffect } from 'react';

// ❌ BAD PRACTICE: Bị lỗi Stale Closure
function BadPracticeCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('🔴 Bad Practice Count (Closure cũ):', count);
            setCount(count + 1); // 🐛 Bug: Luôn đọc count = 0 từ closure ban đầu!
        }, 1000);

        return () => clearInterval(timer);
    }, []); // [] rỗng làm closure bị đóng đóng vĩnh viễn ở render đầu tiên

    return (
        <div style={{ border: '2px solid red', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <h3 style={{ color: 'red', marginTop: 0 }}>❌ Bad Practice (Stale Closure Bug)</h3>
            <p>Số count hiển thị trên màn hình: <strong>{count}</strong></p>
            <p style={{ fontSize: '13px', color: '#888' }}>
                👉 Mở F12 (Console): Bạn sẽ thấy log liên tục in ra 0, 0, 0... và màn hình bị kẹt ở số 1!
            </p>
        </div>
    );
}

// ✅ BEST PRACTICE: Sửa lỗi bằng Functional Update
function BestPracticeCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            // ✨ Fix: Truyền callback function để lấy giá trị state mới nhất từ React State Queue
            setCount((prevCount) => {
                console.log('🟢 Best Practice Count mới:', prevCount + 1);
                return prevCount + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ border: '2px solid #10B981', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ color: '#10B981', marginTop: 0 }}>✅ Best Practice (Functional State Update)</h3>
            <p>Số count hiển thị trên màn hình: <strong>{count}</strong></p>
            <p style={{ fontSize: '13px', color: '#888' }}>
                👉 Mở F12 (Console): Bạn sẽ thấy log tăng đều 1, 2, 3, 4... màn hình chạy mượt mà!
            </p>
        </div>
    );
}

export default function StaleClosureDemo() {
    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>01. Stale Closure trong useEffect</h2>
            <p>Hãy mở Tab <strong>F12 ~ Console</strong> để quan sát sự khác biệt khi chạy 2 Component:</p>
            <BadPracticeCounter />
            <BestPracticeCounter />
        </div>
    );
}
