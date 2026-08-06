import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function BatchingDemo() {
    const [count, setCount] = useState(0);
    const [renderCount, setRenderCount] = useState(1);
    const [logs, setLogs] = useState<string[]>([]);

    // Tăng renderCount mỗi khi component re-render
    // (Mẹo đếm số lần Component bị Render lại)

    const addLog = (msg: string) => {
        setLogs(prevLogs => [...prevLogs, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    // 1. React 18 Automatic Batching (Sync)
    const handleSyncBatching = () => {
        addLog('⚡ Sync Batching: Gọi setCount x3 + setRenderCount x1');
        setCount(c => c + 1);
        setCount(c => c + 1);
        setCount(c => c + 1);
        setRenderCount(r => r + 1);
    };

    // 2. React 18 Automatic Batching (Inside setTimeout)
    const handleAsyncBatching = () => {
        addLog('⏳ Async Batching: Chờ 1s...');
        setTimeout(() => {
            addLog('⚡ Async Batching (sau 1s): Gọi setCount x3 + setRenderCount x1 trong setTimeout');
            setCount(c => c + 1);
            setCount(c => c + 1);
            setCount(c => c + 1);
            setRenderCount(r => r + 1);
        }, 1000);
    };

    // 3. Tắt Batching bằng flushSync
    const handleFlushSync = () => {
        addLog('🔥 flushSync 1: Ép Re-render ngay lần 1');
        flushSync(() => {
            setCount(c => c + 1);
            setRenderCount(r => r + 1);
        });

        addLog('🔥 flushSync 2: Ép Re-render ngay lần 2');
        flushSync(() => {
            setCount(c => c + 1);
            setRenderCount(r => r + 1);
        });
    };

    return (
        <div style={{ maxWidth: '650px', margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>05. Automatic Batching & State Queue (React 18)</h2>

            <div style={{ padding: '16px', background: '#F1F5F9', borderRadius: '8px', marginBottom: '16px' }}>
                <p>Số Count hiện tại: <strong style={{ fontSize: '18px', color: '#2563EB' }}>{count}</strong></p>
                <p>Số lần Component bị Re-render: <strong style={{ fontSize: '18px', color: '#EF4444' }}>{renderCount}</strong></p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                    onClick={handleSyncBatching}
                    style={{ padding: '8px 12px', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    1. Sync Batching (setCount x3)
                </button>

                <button
                    onClick={handleAsyncBatching}
                    style={{ padding: '8px 12px', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    2. Async Batching (setTimeout x3)
                </button>

                <button
                    onClick={handleFlushSync}
                    style={{ padding: '8px 12px', backgroundColor: '#F59E0B', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    3. Tắt Batching (flushSync x2)
                </button>
            </div>

            <p style={{ fontSize: '13px', color: '#666', marginTop: '12px' }}>
                👉 Bấm nút 1 & 2: Dù gọi <code>setCount</code> 3 lần, <strong>Số lần Re-render chỉ tăng 1</strong> (Nhờ Automatic Batching).<br />
                👉 Bấm nút 3: Số lần Re-render tăng nhảy vọt 2 lần lập tức do dùng <code>flushSync</code>.
            </p>

            {/* Hiển thị Nhật ký sự kiện trực tiếp trên UI */}
            <div style={{ marginTop: '16px', padding: '12px', background: '#1E293B', color: '#F8FAFC', borderRadius: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                <h4 style={{ marginTop: 0, marginBottom: '8px', color: '#38BDF8', fontSize: '14px' }}>📋 Nhật ký sự kiện (Event Logs):</h4>
                {logs.length === 0 ? (
                    <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0 }}>Chưa có sự kiện nào, hãy bấm nút ở trên...</p>
                ) : (
                    <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
                        {logs.map((log, i) => (
                            <li key={i} style={{ color: log.includes('flushSync') ? '#F87171' : log.includes('Async') ? '#4ADE80' : '#FACC15' }}>
                                {log}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
