import { useState } from 'react';

export default function EventLoopDemo() {
    const [logs, setLogs] = useState<string[]>([]);

    const runEventLoopTest = () => {
        setLogs([]); // Reset log cũ
        const newLogs: string[] = [];

        const addLog = (msg: string) => {
            newLogs.push(msg);
            setLogs([...newLogs]);
        };

        addLog('1. Synchronous: Start');

        setTimeout(() => {
            addLog('2. Macrotask (setTimeout): Executed!');
        }, 0);

        Promise.resolve()
            .then(() => {
                addLog('3. Microtask (Promise 1): Executed!');
            })
            .then(() => {
                addLog('4. Microtask (Promise 2): Executed!');
            });

        addLog('5. Synchronous: End');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>02. Event Loop: Call Stack, Microtask & Macrotask</h2>
            <button
                onClick={runEventLoopTest}
                style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px' }}
            >
                ▶ Chạy thử nghiệm Event Loop
            </button>

            <div style={{ marginTop: '20px', padding: '16px', background: '#1E293B', color: '#F8FAFC', borderRadius: '8px' }}>
                <h4 style={{ marginTop: 0, color: '#38BDF8' }}>Kết quả hiển thị trong Console/State:</h4>
                {logs.length === 0 ? (
                    <p style={{ color: '#94A3B8' }}>Bấm nút trên để thấy thứ tự thực thi...</p>
                ) : (
                    <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        {logs.map((log, index) => (
                            <li key={index} style={{ color: log.includes('Microtask') ? '#4ADE80' : log.includes('Macrotask') ? '#F87171' : '#FACC15' }}>
                                {log}
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
}
