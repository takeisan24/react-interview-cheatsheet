import { useState } from 'react';

interface Item {
    id: string;
    name: string;
}

export default function ReconciliationDemo() {
    const [items, setItems] = useState<Item[]>([
        { id: 'id-1', name: 'Item A (Nhập thử chữ vào ô dưới)' },
        { id: 'id-2', name: 'Item B' },
        { id: 'id-3', name: 'Item C' },
    ]);

    // Xóa phần tử đầu tiên của mảng
    const removeFirstItem = () => {
        setItems(items.slice(1));
    };

    return (
        <div style={{ maxWidth: '650px', margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>04. Virtual DOM, Reconciliation & Key Attribute Trap</h2>
            <p style={{ color: '#666' }}>
                👉 **Hướng dẫn thử nghiệm:** Hãy gõ chữ <code>"Hello A"</code> vào ô Input của Item A. Sau đó bấm nút
                <strong> "Xóa Item A đầu mảng"</strong> bên dưới để xem sự khác biệt giữa 2 bảng!
            </p>

            <button
                onClick={removeFirstItem}
                style={{ padding: '8px 16px', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '16px' }}
            >
                🗑️ Xóa Item A ở đầu mảng
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* ❌ BAD PRACTICE: key={index} */}
                <div style={{ border: '2px solid #EF4444', padding: '12px', borderRadius: '8px' }}>
                    <h4 style={{ color: '#EF4444', marginTop: 0 }}>❌ Bad Practice (key=index)</h4>
                    {items.map((item, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <div><small>{item.name}</small></div>
                            <input type="text" placeholder="Nhập dữ liệu..." style={{ width: '90%' }} />
                        </div>
                    ))}
                    <p style={{ fontSize: '12px', color: '#888' }}>
                        🐛 <strong>Lỗi:</strong> Chữ bạn gõ ở ô Item A bị dính lại cho Item B sau khi xóa!
                    </p>
                </div>

                {/* ✅ BEST PRACTICE: key={item.id} */}
                <div style={{ border: '2px solid #10B981', padding: '12px', borderRadius: '8px' }}>
                    <h4 style={{ color: '#10B981', marginTop: 0 }}>✅ Best Practice (key=item.id)</h4>
                    {items.map((item) => (
                        <div key={item.id} style={{ marginBottom: '8px' }}>
                            <div><small>{item.name}</small></div>
                            <input type="text" placeholder="Nhập dữ liệu..." style={{ width: '90%' }} />
                        </div>
                    ))}
                    <p style={{ fontSize: '12px', color: '#888' }}>
                        ✨ <strong>Đúng:</strong> Item A mất cùng dữ liệu ô input của nó, Item B giữ nguyên.
                    </p>
                </div>
            </div>
        </div>
    );
}
