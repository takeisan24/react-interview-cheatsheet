import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

// Component thử — KHÔNG phải bài tập.
// Bài tập là useDebounce.ts; file này chỉ để nhìn thấy nó chạy.
export default function DebounceDemo() {
    const [text, setText] = useState('');
    const debounced = useDebounce(text, 500);

    const [soLanGo, setSoLanGo] = useState(0);
    const [soLanNha, setSoLanNha] = useState(0);

    // Đếm số lần mỗi bên đổi. Lưu ý: gọi setState trong effect là mẫu KHÔNG nên
    // dùng trong code thật (dễ gây render dây chuyền) — ở đây chấp nhận vì mục đích
    // duy nhất là đo đạc cho thí nghiệm.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setSoLanGo((n) => n + 1); }, [text]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setSoLanNha((n) => n + 1); }, [debounced]);

    return (
        <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>Thử useDebounce</h2>
            <p style={{ fontSize: 13, color: '#666' }}>
                Gõ nhanh vào ô dưới. Cột trái đổi theo từng phím, cột phải chỉ đổi
                khi bạn <strong>ngừng gõ 500ms</strong>.
            </p>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="gõ nhanh vào đây..."
                style={{ width: '100%', padding: 10, fontSize: 16 }}
            />

            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                <div style={{ flex: 1, padding: 12, border: '2px solid #ef4444', borderRadius: 8 }}>
                    <div style={{ fontSize: 12, color: '#ef4444' }}>value gốc</div>
                    <div style={{ fontSize: 18, minHeight: 26 }}>{text || <em>(trống)</em>}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>đổi {soLanGo} lần</div>
                </div>

                <div style={{ flex: 1, padding: 12, border: '2px solid #10b981', borderRadius: 8 }}>
                    <div style={{ fontSize: 12, color: '#10b981' }}>useDebounce(value, 500)</div>
                    <div style={{ fontSize: 18, minHeight: 26 }}>{debounced || <em>(trống)</em>}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>đổi {soLanNha} lần</div>
                </div>
            </div>

            <p style={{ fontSize: 13, color: '#666', marginTop: 20 }}>
                ✅ Chạy đúng: gõ 10 phím → trái đổi ~10 lần, phải đổi ~1–2 lần.<br />
                ❌ Chưa đúng: hai cột đổi bằng nhau, hoặc cột phải không bao giờ đổi.
            </p>
        </div>
    );
}
