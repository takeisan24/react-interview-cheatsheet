import { useState } from 'react';

export default function ScopeHoistingDemo() {
    const [logs, setLogs] = useState<string[]>([]);

    const runHoistingTest = () => {
        const newLogs: string[] = [];

        // 1. Demo Hoisting với var (Cố tình truy cập trước khai báo -> undefined)
        // @ts-ignore
        newLogs.push(`1. var a trước khi khai báo: ${typeof a !== 'undefined' ? a : 'undefined'}`);
        var a = 10;
        newLogs.push(`2. var a sau khi khai báo = 10: ${a}`);

        // 2. Demo Temporal Dead Zone (TDZ) với let (Bị bẫy ReferenceError)
        try {
            // @ts-ignore
            console.log(b); // Truy cập b khi chưa đến dòng let b
            let b = 20;
        } catch (err: any) {
            newLogs.push(`3. ❌ TDZ với let b (Bắt lỗi): ${err.message}`);
        }

        let b = 20;
        newLogs.push(`4. let b sau khi khai báo = 20: ${b}`);

        setLogs(newLogs);
    };

    const runLoopScopeTest = () => {
        const newLogs: string[] = [];
        setLogs(['Đang đợi 100ms để setTimeout nổ...']);

        // Vòng lặp 1: var
        for (var i = 0; i < 3; i++) {
            setTimeout(() => {
                newLogs.push(`🔴 var i: ${i}`);
                setLogs([...newLogs]);
            }, 100);
        }

        // Vòng lặp 2: let
        for (let j = 0; j < 3; j++) {
            setTimeout(() => {
                newLogs.push(`🟢 let j: ${j}`);
                setLogs([...newLogs]);
            }, 100);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>03. Scope, Hoisting & Temporal Dead Zone (TDZ)</h2>

            <div style={{ marginBottom: '16px' }}>
                <button onClick={runHoistingTest} style={{ padding: '8px 12px', marginRight: '8px', cursor: 'pointer' }}>
                    ▶ Test Hoisting (var vs let)
                </button>
                <button onClick={runLoopScopeTest} style={{ padding: '8px 12px', cursor: 'pointer' }}>
                    ▶ Test Loop Scope (var i vs let j)
                </button>
            </div>

            <div style={{ padding: '16px', background: '#1E293B', color: '#F8FAFC', borderRadius: '8px' }}>
                <h4 style={{ marginTop: 0, color: '#38BDF8' }}>Kết quả thực thi:</h4>
                {logs.length === 0 ? (
                    <p style={{ color: '#94A3B8' }}>Bấm nút trên để chạy thử nghiệm...</p>
                ) : (
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        {logs.map((log, index) => (
                            <li key={index} style={{ color: log.includes('var i') ? '#F87171' : log.includes('let j') ? '#4ADE80' : '#FACC15' }}>
                                {log}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
